"use client";

import Header from "@/components/header";
import { Footer } from "@/components/footer";
import { Logo } from "@/components/logo";
import { Facebook, Twitter, Instagram, Send } from "lucide-react";
import { useState } from "react";
import { getAuthor } from "@/app/layout.config";
import Link from "next/link";

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
    <div className="container mx-auto px-4 py-8">
      <Header />
      <main className="flex-1">
        <section className="mx-auto px-4 pt-12 sm:pt-20 lg:pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-16">
            {/* Contact Form & FAQ */}
            <div className="space-y-12">
              {/* CONTACT */}
              <div className="space-y-6">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase text-foreground">
                  CONTACT US
                </h1>

                <div className="space-y-4">
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    Got a question? We'd love to hear from you. Send us a message and our team will
                    respond as soon as possible.
                  </p>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    For any issues or inquiries related to Crypto Threads, please reach out to{" "}
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
                      className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground/30"
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
                      className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground/30"
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
                      className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground/30"
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
                      className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground/30 resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-10 py-3 rounded-lg border border-border/40 text-foreground font-semibold uppercase bg-gray-300 dark:bg-gray-600 hover:bg-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Sending..." : "SEND"}
                  </button>
                </form>
              </div>

            </div>

            {/* logo */}
            <div className="space-y-12">
              <div className="flex items-center justify-center">
                <div className="w-full max-w-sm aspect-square rounded-xl bg-muted flex items-center justify-center">
                  <Logo className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 text-foreground" />
                </div>
              </div>
            </div>
          </div>

          {/* FAQ and Social Media - Aligned horizontally */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-16 pt-24">
            {/* FAQ Section */}
            <div className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold uppercase text-foreground">
                FREQUENTLY ASKED QUESTIONS
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
              <h2 className="text-1xl sm:text-2xl font-semibold uppercase text-foreground">
                FOLLOW US ON SOCIAL MEDIA
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
