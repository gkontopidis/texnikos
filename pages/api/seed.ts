import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/mongodb";
import Job from "@/models/Job";
import dns from "dns";

dns.setServers(["1.1.1.1", "8.8.8.8"]);
export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectDB();

    const now = new Date();
    const expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

    await Job.insertMany([
      {
        title: "Ηλεκτρολόγος Εγκαταστάσεων",
        company: "Τεχνική ΑΕ",
        location: "Αθήνα",
        salary: "1700€ - 2100€",
        urgent: true,
        fullTime: true,
        status: "active",
        contactEmail: "contact@texniki.gr",
        contactPhone: "+30 210 1234567",
        manageToken: "token-1",
        verifiedEmployer: true,
        salaryVerified: true,
        responseRate: 95,
        expiresAt,
      },
      {
        title: "Υδραυλικός",
        company: "HydroFix",
        location: "Θεσσαλονίκη",
        salary: "1600€ - 2300€",
        urgent: false,
        fullTime: true,
        status: "active",
        contactEmail: "info@hydrofix.gr",
        contactPhone: "+30 2310 765432",
        manageToken: "token-2",
        verifiedEmployer: true,
        salaryVerified: false,
        responseRate: 88,
        expiresAt,
      },
      {
        title: "Ψυκτικός / κλιματισμός",
        company: "CoolTech",
        location: "Αθήνα",
        salary: "1500€ - 2100€",
        urgent: false,
        fullTime: true,
        status: "active",
        contactEmail: "hello@cooltech.gr",
        contactPhone: "+30 210 6543210",
        verifiedEmployer: false,
        salaryVerified: true,
        responseRate: 75,
        expiresAt,
      },
      {
        title: "Χτίστης / μπετατζής",
        company: "BuildMasters",
        location: "Πάτρα",
        salary: "1400€ - 1800€",
        urgent: false,
        fullTime: true,
        status: "active",
        contactEmail: "jobs@buildmasters.gr",
        contactPhone: "+30 2610 123456",
        verifiedEmployer: true,
        salaryVerified: true,
        responseRate: 92,
        expiresAt,
      },
      {
        title: "Σοβατζής / επιχριστής",
        company: "ProFinish",
        location: "Θεσσαλονίκη",
        salary: "1300€ - 1700€",
        urgent: false,
        fullTime: true,
        status: "active",
        contactEmail: "info@profinish.gr",
        contactPhone: "+30 2310 987654",
        verifiedEmployer: false,
        salaryVerified: false,
        responseRate: 60,
        expiresAt,
      },
      {
        title: "Τεχνίτης σιδήρου / κολλητής",
        company: "MetalWorks",
        location: "Αθήνα",
        salary: "1600€ - 2200€",
        urgent: true,
        fullTime: true,
        status: "active",
        contactEmail: "contact@metalworks.gr",
        contactPhone: "+30 210 3344556",
        verifiedEmployer: true,
        salaryVerified: true,
        responseRate: 100,
        expiresAt,
      },
      {
        title: "Χειριστής κλαρκ / περονοφόρου",
        company: "LogiMove",
        location: "Αθήνα",
        salary: "1200€ - 1500€",
        urgent: false,
        fullTime: true,
        status: "active",
        contactEmail: "hr@logimove.gr",
        contactPhone: "+30 210 7788990",
        verifiedEmployer: true,
        salaryVerified: true,
        responseRate: 85,
        expiresAt,
      },
      {
        title: "Χειριστής γερανού / μηχανημάτων",
        company: "MegaCrane",
        location: "Θεσσαλονίκη",
        salary: "1700€ - 2300€",
        urgent: true,
        fullTime: true,
        status: "active",
        contactEmail: "jobs@megacrane.gr",
        contactPhone: "+30 2310 112233",
        verifiedEmployer: true,
        salaryVerified: true,
        responseRate: 98,
        expiresAt,
      },
      {
        title: "Κατασκευαστής ξυλουργικών / ξυλουργός",
        company: "WoodCraft",
        location: "Ηράκλειο",
        salary: "1300€ - 1750€",
        urgent: false,
        fullTime: true,
        status: "active",
        contactEmail: "hello@woodcraft.gr",
        contactPhone: "+30 2810 223344",
        verifiedEmployer: false,
        salaryVerified: false,
        responseRate: 70,
        expiresAt,
      },
      {
        title: "Συντηρητής οικοδομών / τεχνίτης κτιρίων",
        company: "BuildCare",
        location: "Πειραιάς",
        salary: "1500€ - 1900€",
        urgent: false,
        fullTime: true,
        status: "active",
        contactEmail: "care@buildcare.gr",
        contactPhone: "+30 210 1122334",
        verifiedEmployer: true,
        salaryVerified: true,
        responseRate: 90,
        expiresAt,
      },
    ]);

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
    });
  }
}