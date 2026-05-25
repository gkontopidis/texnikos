import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const sendJobAlertEmail = async (email: string, jobTitle: string, subscriptionId: string) => {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: `Νέα θέση εργασίας: ${jobTitle}`,
      html: `
        <h1>Νέα θέση εργασίας!</h1>
        <p>Μια νέα θέση που ταιριάζει στα φίλτρα σου μόλις δημοσιεύτηκε: <strong>${jobTitle}</strong></p>
        <p><a href="${BASE_URL}">Δες την αγγελία</a></p>
        <hr>
        <p style="font-size: 12px; color: #666;">
          Αν δεν επιθυμείς να λαμβάνεις ειδοποιήσεις, κάνε κλικ εδώ: 
          <a href="${BASE_URL}/api/alerts/unsubscribe?id=${subscriptionId}">Διαγραφή από τα Alerts</a>
        </p>
      `,
    });
  } catch (error) {
    console.error("Resend Error (sendJobAlertEmail):", error);
  }

  return { success: true };
};