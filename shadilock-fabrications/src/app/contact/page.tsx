import ContactForm from "@/components/contact/ContactForm";

export const metadata = {
  title: "Contact Shadilock Fabrication | Aluminium & Glass Solutions",
  description:
    "Get in touch with Shadilock Fabrication for quotes, inquiries, and support. High-quality aluminium and glass solutions in Accra, Ghana.",
  openGraph: {
    title: "Contact Shadilock Fabrication",
    description:
      "Reach out for quotes, inquiries, or support for aluminium and glass solutions.",
    type: "website",
  },
};

export default function ContactPage() {
  return <ContactForm />;
}
