import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendJobAlertEmail = async (email: string, jobTitle: string) => {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: `Νέα θέση εργασίας: ${jobTitle}`,
      html: `
        <h1>Νέα θέση εργασίας!</h1>
        <p>Μια νέα θέση που ταιριάζει στα φίλτρα σου μόλις δημοσιεύτηκε: <strong>${jobTitle}</strong></p>
        <a href="http://localhost:3000">Δες την αγγελία</a>
      `,
    });
  } catch (error) {
    console.error("Resend Error (sendJobAlertEmail):", error);
  }

  return { success: true };
};