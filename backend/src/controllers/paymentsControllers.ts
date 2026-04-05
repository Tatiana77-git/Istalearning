import { Request, Response } from "express";
import { stripe } from "../config/stripe";
import { getAllPaymentsModel } from "../models/paymentModel";
import { getPaymentDataForEmail } from "../models/paymentModel";
import { getPaymentConfirmationData } from "../models/paymentModel";
import { sendTestEmail } from "../services/email";


export const getAllPayments = async (req: Request, res: Response) => {
  try {
    const payments = await getAllPaymentsModel();

    return res.status(200).json({
      success: true,
      data: payments,
    });
  } catch {
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
        return res.json({ received: true });
      }

      const data = await getPaymentDataForEmail(Number(purchaseId));

      const testUrl = data?.test_url;
      const customerEmail = data?.email;

      await sendTestEmail(customerEmail, testUrl);
    }

    return res.json({ received: true });
  } catch {
    return res.status(400).send("Webhook Error");
  }
};


export const confirmPayment = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.body;

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    const purchaseId = session.metadata?.purchaseId;

    const data = await getPaymentConfirmationData(Number(purchaseId));

    return res.json({
      success: true,
      purchaseId,
      testUrl: data?.test_url,
    });
  } catch {
    return res.status(500).json({ error: "confirm failed" });
  }
};