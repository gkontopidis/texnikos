import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/mongodb";
import Job from "@/models/Job";
import Company from "@/models/Company";
import AlertSubscription from "@/models/AlertSubscription";
import { sendJobPostedEmail, sendVerificationEmail, sendAdminNotificationEmail } from "@/lib/mail/emailService";
import { sendJobAlertEmail } from "@/lib/mail/alertService";
import { generateSlug } from "@/lib/slug";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await connectDB();

    const {
      title, company: companyName, location, salary, duration, description, 
      contactEmail, contactPhone, fullTime, urgent, featured, 
      plan, isPaid, createCompanyProfile, updateProfile, 
      originalCompanyEmail, companyId: providedCompanyId, honeypot 
    } = req.body;

    // ... (rest of validation)
    // 1. Honeypot check
    if (honeypot) {
        return res.status(400).json({ success: false, message: "Spam detected." });
    }

    // 2. Disposable email blocking
    const blockedDomains = ['mailinator.com', 'guerrillamail.com', '10minutemail.com'];
    const domain = contactEmail.split('@')[1];
    if (blockedDomains.includes(domain)) {
        return res.status(400).json({ success: false, message: "Email domain not allowed." });
    }

    // 3. Duplicate detection
    const recentJob = await Job.findOne({ 
        contactEmail, 
        createdAt: { $gte: new Date(Date.now() - 15 * 60 * 1000) } 
    });
    if (recentJob) {
        return res.status(429).json({ success: false, message: "Πρέπει να περιμένετε 15 λεπτά πριν δημοσιεύσετε ξανά." });
    }

    if (!title || !companyName || !location || !contactEmail) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // --- COMPANY LOGIC ---
    let companyId = null;
    let existingCompany = null;
    
    if (createCompanyProfile) {
      // Lookup by provided ID or original email if we are updating
      if (providedCompanyId) {
        existingCompany = await Company.findById(providedCompanyId);
      } else if (originalCompanyEmail) {
        existingCompany = await Company.findOne({ contactEmail: originalCompanyEmail });
      } else {
        existingCompany = await Company.findOne({ contactEmail });
      }
      
      if (!existingCompany) {
        // Create a new company profile automatically
        let slug = generateSlug(companyName);
        
        // Ensure unique slug
        let slugExists = await Company.findOne({ slug });
        if (slugExists) {
          slug = `${slug}-${Math.floor(Math.random() * 1000)}`;
        }

        existingCompany = new Company({
          name: companyName,
          slug,
          contactEmail,
          location,
          phone: contactPhone,
          verified: false 
        });
        await existingCompany.save();
      } else if (updateProfile) {
        // Update existing profile with new details
        existingCompany.name = companyName;
        existingCompany.location = location;
        existingCompany.phone = contactPhone;
        
        // Handle email change - ensure new email is not taken by another company
        if (contactEmail !== existingCompany.contactEmail) {
            const emailTaken = await Company.findOne({ contactEmail, _id: { $ne: existingCompany._id } });
            if (emailTaken) {
                return res.status(400).json({ success: false, message: "Το νέο email χρησιμοποιείται ήδη από άλλη επιχείρηση." });
            }
            existingCompany.contactEmail = contactEmail;
        }

        // Update slug if name changed
        let newSlug = generateSlug(companyName);
        if (newSlug !== existingCompany.slug) {
          let slugExists = await Company.findOne({ slug: newSlug });
          if (slugExists) {
            newSlug = `${newSlug}-${Math.floor(Math.random() * 1000)}`;
          }
          existingCompany.slug = newSlug;
        }
        await existingCompany.save();
      }
      companyId = existingCompany._id;
    }
    // ---------------------

    const now = new Date();

    // Check if employer is already verified
    const existingJob = await Job.findOne({ contactEmail, emailVerified: true });
    const isVerified = !!existingJob;

    // ... (rest of job creation)
    const publishAt = plan === "free" 
      ? new Date(now.getTime() + 72 * 60 * 60 * 1000) 
      : now;

    const jobData = {
      title, 
      company: companyName, 
      companyId, // Link to company (null if createCompanyProfile is false)
      location, salary, duration, description, 
      contactEmail, contactPhone,
      fullTime: !!fullTime,
      urgent: !!urgent,
      featured: !!featured,
      plan,
      isPaid: !!isPaid,
      status: isVerified ? (plan === "free" ? "scheduled" : "active") : "pending-verification",
      publishAt,
      emailVerified: isVerified,
      audit: {
        creatorIP: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
        userAgent: req.headers["user-agent"],
        createdAt: now,
      },
      createdAt: now,
    };

    const newJob = new Job(jobData);
    await newJob.save();

    // Update company verification status if job is verified
    if (isVerified && existingCompany && !existingCompany.verified) {
      await Company.updateOne({ _id: companyId }, { verified: true });
    }

    // ... (rest of handlers)
    (async () => {
      try {
        await sendAdminNotificationEmail(title, companyName, location);

        if (isVerified) {
          await sendJobPostedEmail(contactEmail, newJob.manageToken, title);
        } else {
          await sendVerificationEmail(contactEmail, newJob.manageToken, title);
        }

        if (newJob.status === "active") {
          const subscribers = await AlertSubscription.find({ 
            specialty: newJob.title, 
            location: newJob.location,
            unsubscribed: false
          });
          
          for (const sub of subscribers) {
            await sendJobAlertEmail(sub.email, newJob.title, sub._id.toString());
          }
        }
      } catch (err) {
        console.error("Background email process error:", err);
      }
    })();

    return res.status(201).json({
      success: true,
      job: newJob,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}
