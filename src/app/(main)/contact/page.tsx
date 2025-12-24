"use client";

import Link from "next/link";
import Header from "@/components/header";
import { Footer } from "@/components/footer";
import { Logo } from "@/components/logo";
import { Facebook, Twitter, Instagram, Send } from "lucide-react";
import { useState } from "react";
import { getAuthor } from "@/app/layout.config";
// import BgStripedGradient from "@/assets/images/bg-striped-gradient.jpg";

const faqs = [
  {
    question: "How long until someone gets back with me?",
    answer:
      "We can't guarantee you'll hear back immediately, but we do strive to answer all enquiries within 1 business day.",
  },
  {
    question: "Who is my message going to?",
    answer:
      "That really depends on what your question is. We will be sure send your message to the appropriate person so we can address your needs in the best way possible",
  },
  {
    question: "What if I don't get a response",
    answer:
      "While we do strive to respond to enquiries within 1 business day, sometimes life gets in the way and it takes 2 or even 3 days to provide you with a response. If you don't hear back from us 3 business days it's possible your message was somehow lost in space and your best course would be to contact us again",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const author = getAuthor("The20 Team");
  const contactEmail = author.email;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Thank you for your message! We'll get back to you soon.");
      setFormData({ name: "", country: "", email: "", message: "" });
    }, 1000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <section className="mx-auto px-4 pt-12 sm:pt-20 lg:pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Form & FAQ */}
            <div className="space-y-12">
              {/* CONTACT */}
              <div className="space-y-6">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground font-funnel">
                  Contact us
                </h1>

                <div className="space-y-4">
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    Got a question? We&apos;d love to hear from you. Send us a
                    message and our team will respond as soon as possible.
                  </p>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    For any issues or inquiries related to Crypto Threads,
                    please reach out to{" "}
                    <Link
                      href={`mailto:${contactEmail}`}
                      className="text-foreground hover:underline font-medium"
                    >
                      {contactEmail}
                    </Link>
                  </p>
                </div>

                {/* Contact Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-full bg-primary/10 dark:bg-primary/10 text-foreground font-medium placeholder:text-primary/70 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="country"
                      placeholder="Country"
                      value={formData.country}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-full bg-primary/10 dark:bg-primary/10 text-foreground font-medium placeholder:text-primary/70 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-full bg-primary/10 dark:bg-primary/10 text-foreground font-medium placeholder:text-primary/70 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30"
                    />
                  </div>
                  <div>
                    <textarea
                      name="message"
                      placeholder="Message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 rounded-lg bg-primary/10 dark:bg-primary/10 text-foreground font-medium placeholder:text-primary/70 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-10 py-3 rounded-full border border-border/40 text-white font-semibold bg-primary dark:bg-primary hover:bg-primary/60 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Sending..." : "Send"}
                  </button>
                </form>
              </div>
            </div>

            {/* logo */}
            <div className="flex items-center justify-center h-full">
              <div className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden bg-primary">
                {/* <Image
                  src={BgStripedGradient}
                  alt="Crypto Threads background"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 640px) 360px, 420px"
                /> */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white gap-5">
                  <Logo className="w-28 h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 text-white" />
                  <span className="text-2xl sm:text-3xl md:text-4xl font-semibold font-funnel tracking-tight text-center">
                    Crypto Threads
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ and Social Media - Aligned horizontally */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-16 pt-24">
            {/* FAQ Section */}
            <div className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground font-funnel">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="space-y-2">
                    <h3 className="text-base sm:text-lg font-semibold text-foreground">
                      {faq.question}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Media Section */}
            <div className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground font-funnel">
                Follow Us On Social Media
              </h2>
              <div className="flex items-center gap-4">
                <a
                  href="#"
                  className="w-12 h-12 rounded-lg bg-gray-200 dark:bg-gray-600 flex items-center justify-center hover:bg-blue-500 hover:border-blue-500 transition-colors group"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5 text-foreground group-hover:text-white transition-colors" />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 rounded-lg bg-gray-200 dark:bg-gray-600 flex items-center justify-center hover:bg-blue-400 hover:border-blue-400 transition-colors group"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5 text-foreground group-hover:text-white transition-colors" />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 rounded-lg bg-gray-200 dark:bg-gray-600 flex items-center justify-center hover:bg-pink-500 hover:border-pink-500 transition-colors group"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5 text-foreground group-hover:text-white transition-colors" />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 rounded-lg bg-gray-200 dark:bg-gray-600 flex items-center justify-center hover:bg-pink-500 hover:border-pink-500 transition-colors group"
                  aria-label="Instagram"
                >
                  <Send className="w-5 h-5 text-foreground group-hover:text-white transition-colors" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
