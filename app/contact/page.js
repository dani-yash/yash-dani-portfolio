// app/contact/page.js
import ContactForm from "@/components/contact-form";

export const metadata = {
  title: "Contact — Yash Dani",
  description: "Get in touch with Yash.",
};

export default function ContactPage() {
  // Background/particles come from BaseLayout automatically
  return (
    <div className="w-full">
      <ContactForm />
    </div>
  );
}
