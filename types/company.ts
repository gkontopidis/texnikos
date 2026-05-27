export type Company = {
  _id: string;
  name: string;
  slug: string;
  logo?: string;
  description?: string;
  location?: string;
  phone?: string;
  website?: string;
  contactEmail: string;
  verified: boolean;
  createdAt: string;
};
