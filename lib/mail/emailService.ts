import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendApplicationNotificationEmail = async (employerEmail: string, applicantName: string, applicantPhone: string, jobTitle: string) => {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: employerEmail,
      subject: `Νέα αίτηση για την αγγελία: ${jobTitle}`,
      html: `
        <h1>Νέα αίτηση εργασίας!</h1>
        <p>Λάβατε μια νέα αίτηση για την αγγελία σας: <strong>${jobTitle}</strong></p>
        <p><strong>Υποψήφιος:</strong> ${applicantName}</p>
        <p><strong>Τηλέφωνο:</strong> ${applicantPhone}</p>
        <p>Παρακαλώ επικοινωνήστε απευθείας με τον υποψήφιο.</p>
      `,
    });
  } catch (error) {
    console.error("Resend Error (sendApplicationNotificationEmail):", error);
  }
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const sendJobPostedEmail = async (email: string, manageToken: string, jobTitle: string) => {
  const manageUrl = `${BASE_URL}/manage/${manageToken}`;
  
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: `Η αγγελία σας δημοσιεύτηκε: ${jobTitle}`,
      html: `
        <h1>Η αγγελία σας δημοσιεύτηκε!</h1>
        <p>Η αγγελία σας "${jobTitle}" έχει καταχωρηθεί και περιμένει έγκριση.</p>
        <p>Μπορείτε να διαχειριστείτε την αγγελία σας (κλείσιμο, ανανέωση, επεξεργασία) από τον παρακάτω σύνδεσμο:</p>
        <a href="${manageUrl}">Διαχείριση Αγγελίας</a>
      `,
    });
  } catch (error) {
    console.error("Resend Error (sendJobPostedEmail):", error);
  }

  return { success: true };
};

export const sendExpirationReminderEmail = async (email: string, manageToken: string, jobTitle: string) => {
  const manageUrl = `${BASE_URL}/manage/${manageToken}`;
  
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: `Η αγγελία σας λήγει σε 3 ημέρες: ${jobTitle}`,
      html: `
        <h1>Η αγγελία σας λήγει σύντομα!</h1>
        <p>Η αγγελία "${jobTitle}" λήγει σε 3 ημέρες.</p>
        <p>Ανανεώστε την τώρα για να παραμείνει ενεργή:</p>
        <a href="${manageUrl}">Διαχείριση και Ανανέωση Αγγελίας</a>
      `,
    });
  } catch (error) {
    console.error("Resend Error (sendExpirationReminderEmail):", error);
  }

  return { success: true };
};