import { Request, Response } from "express";
import { pool } from "../config/db";
import  {stripe} from "../config/stripe";
import { sendTestEmail } from "../services/email";


export const getAllPayments = async (req: Request, res: Response) => {

  try {
    const query = `
      SELECT
        id_payment,
        currency,
        amount,
        status,
        created_at,
        provider_payment_id,
        payment_method,
        purchase_id
      FROM payments
      ORDER BY id_payment ASC
    `;

    const result = await pool.query(query);

    return res.status(200).json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error("Erreur getAllPayments:", error);

    return res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération de paiement",
    });
  }
};

export const createStripeSession = async (req: Request, res: Response) => {
  try {
    const { amount, currency, purchaseId } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: currency || "eur",
            product_data: {
              name: `Purchase #${purchaseId}`,
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      success_url: "http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:5173/cancel",
      metadata: {
        purchaseId: purchaseId.toString(), 
      },
    })

    return res.json({ url: session.url });
  } catch (error) {
    console.error("Stripe session error:", error);
    return res.status(500).json({ error: "Stripe session failed" });
  }
};


export const stripeWebhook = async (req: Request, res: Response) => {

  try {
    const event = req.body;
   
    if (event?.type === "checkout.session.completed") {

      const session = event.data.object;
      const purchaseId = session?.metadata?.purchaseId;
  
      if (!purchaseId) {
        console.log("No purchaseId in metadata");
        return res.json({ received: true });
      }

      const result = await pool.query(
        `SELECT products.test_url, customers.email
         FROM purchases
         JOIN products ON products.id_product = purchases.product_id
         JOIN customers ON customers.id_customer = purchases.customer_id
         WHERE purchases.id_purchase = $1`,
        [purchaseId]
      );

      const testUrl = result.rows[0]?.test_url;
      const customerEmail = result.rows[0]?.email;

      console.log ("Stripe webhook received");
      console.log("Payment confirmed for purchase:", purchaseId);
      console.log("Sending test email...");
      await sendTestEmail(customerEmail, testUrl);
      console.log("Test email sent")
    }

    return res.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return res.status(400).send("Webhook Error");
  }
};

export const confirmPayment = async (req: Request, res: Response) => {
  try {

    const { sessionId } = req.body;

    if (!sessionId) {
      return res.status(400).json({ error: "sessionId required" });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    const purchaseId = session.metadata?.purchaseId;

    if (!purchaseId) {
      return res.status(400).json({ error: "purchaseId missing" });
    }

    const result = await pool.query(
      `SELECT products.test_url
       FROM purchases
       JOIN products ON products.id_product = purchases.product_id
       WHERE purchases.id_purchase = $1`,
      [purchaseId]
    );

    const testUrl = result.rows[0]?.test_url;

    return res.json({
      success: true,
      purchaseId,
      testUrl
    });

  } catch (error) {
    console.error("Confirm payment error:", error);
    return res.status(500).json({ error: "confirm failed" });
  }
};