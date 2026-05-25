# TexnikesDouleies.gr

Η νούμερο 1 πλατφόρμα για τεχνικά επαγγέλματα στην Ελλάδα. Σύνδεση εργοδοτών και τεχνιτών με αξιοπιστία και ταχύτητα.

## Τεχνολογίες
- **Framework:** Next.js (App Router)
- **Database:** MongoDB
- **Styling:** Tailwind CSS (Vanilla CSS & Tailwind-like utilities)
- **Emails:** Resend
- **Language:** TypeScript

## Εγκατάσταση

1. Clone το repository:
   ```bash
   git clone <repository-url>
   cd TexnikesDouleies
   ```

2. Εγκατάσταση dependencies:
   ```bash
   npm install
   ```

3. Ρύθμιση `.env` (δημιουργήστε το αρχείο στη ρίζα):
   ```env
   MONGODB_URI=your_mongodb_connection_string
   RESEND_API_KEY=your_resend_api_key
   ```

4. Εκκίνηση development server:
   ```bash
   npm run dev
   ```

## API Endpoints (Κεντρικά)

- `POST /api/jobs/create`: Δημιουργία νέας αγγελίας.
- `POST /api/apply`: Υποβολή αίτησης υποψηφίου.
- `POST /api/admin/moderate`: Διαχείριση/moderation αγγελιών.
- `PUT /api/admin/jobs/update`: Ενημέρωση στοιχείων αγγελίας (Admin).

## Αρχιτεκτονική
- `/app`: Σελίδες Next.js (Pages & Admin panels).
- `/components`: UI Components (Modals, Job cards, Filters).
- `/lib`: Βιβλιοθήκες (DB connection, Email services, Filters).
- `/models`: Mongoose Schemas (Job, Application, AlertSubscription).

## Deployment
Το project έχει ρυθμιστεί για εύκολο deployment στο Vercel:
1. Συνδέστε το repo στο Vercel.
2. Προσθέστε τα Environment Variables στο Vercel Dashboard.
3. Το deployment θα γίνεται αυτόματα με κάθε push στο main branch.
