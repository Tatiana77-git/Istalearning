
import { Resend } from "resend";

export const sendTestEmail = async (email: string, testUrl: string) => {
  
  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: "ISTA <onboarding@resend.dev>",
    to: email,
    subject: "Your language test",
    html: `<p>Your test:</p><a href="${testUrl}">${testUrl}</a>`
  });
};