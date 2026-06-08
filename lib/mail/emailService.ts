import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = "TexnikesDouleies <noreply@texnikesdouleies.gr>";

export const sendApplicationNotificationEmail = async (employerEmail: string, applicantName: string, applicantPhone: string, jobTitle: string) => {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
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

export const sendAdminNotificationEmail = async (jobTitle: string, company: string, location: string) => {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: "gkontopidis@yahoo.com",
      subject: `Νέα Αγγελία: ${jobTitle} (${company})`,
      html: `
        <h1>Νέα αγγελία περιμένει έγκριση</h1>
        <p><strong>Τίτλος:</strong> ${jobTitle}</p>
        <p><strong>Εταιρεία:</strong> ${company}</p>
        <p><strong>Τοποθεσία:</strong> ${location}</p>
        <p>Συνδεθείτε στο admin panel για να την εγκρίνετε.</p>
      `,
    });
  } catch (error) {
    console.error("Resend Error (sendAdminNotificationEmail):", error);
  }
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const sendVerificationEmail = async (email: string, manageToken: string, jobTitle: string) => {
  const verifyUrl = `${BASE_URL}/verify/${manageToken}`;
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: `Επιβεβαίωση αγγελίας: ${jobTitle}`,
      html: `
        <h1>Επιβεβαίωση Αγγελίας</h1>
        <p>Παρακαλώ επιβεβαιώστε το email σας για να δημοσιευτεί η αγγελία σας: <strong>${jobTitle}</strong></p>
        <a href="${verifyUrl}">Επιβεβαίωση Αγγελίας</a>
      `,
    });
  } catch (error) {
    console.error("Resend Error (sendVerificationEmail):", error);
  }
};

export const sendJobPostedEmail = async (email: string, manageToken: string, jobTitle: string) => {
  const manageUrl = `${BASE_URL}/manage/${manageToken}`;
  
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
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

export const sendJobActivatedEmail = async (email: string, manageToken: string, jobTitle: string) => {
  const manageUrl = `${BASE_URL}/manage/${manageToken}`;
  const jobUrl = `${BASE_URL}/?search=${encodeURIComponent(jobTitle)}`;

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: `Η αγγελία σας είναι πλέον LIVE: ${jobTitle}`,
      html: `
        <h1>Η αγγελία σας δημοσιεύτηκε!</h1>
        <p>Η αγγελία σας "<strong>${jobTitle}</strong>" είναι πλέον ορατή σε όλους τους υποψήφιους.</p>
        <div style="margin: 20px 0;">
          <a href="${jobUrl}" style="background-color: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">Δείτε την Αγγελία σας</a>
        </div>
        <p>Μπορείτε να τη διαχειριστείτε από τον παρακάτω σύνδεσμο:</p>
        <a href="${manageUrl}">Διαχείριση Αγγελίας</a>
      `,
    });
  } catch (error) {
    console.error("Resend Error (sendJobActivatedEmail):", error);
  }

  return { success: true };
};

export const sendExpirationReminderEmail = async (email: string, manageToken: string, jobTitle: string) => {
  const manageUrl = `${BASE_URL}/manage/${manageToken}`;
  
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
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