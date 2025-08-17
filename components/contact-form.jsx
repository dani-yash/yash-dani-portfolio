"use client";

import { useState } from "react";
import Typewriter from "@/components/ui/typewriter";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "", hp: "" });
  const [status, setStatus] = useState('console.log("Waiting for your message...");');
  const [isSending, setIsSending] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setStatus('console.log("Sending...");');

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Failed");

      setStatus(
        `console.log("Sent! Thanks ${form.name || "friend"} — I’ll reply at ${form.email}.");`
      );
      setForm({ name: "", email: "", message: "", hp: "" });
    } catch (err) {
      setStatus('console.error("Something went wrong. Try again later.");');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      {/* Title */}
      <h1 className="text-lg md:text-4xl font-bold mb-3 text-black dark:text-white text-center">
        Let&apos;s Talk ✉️
      </h1>

      {/* Sub / typing line */}
      <div className="mt-3 text-center text-sm md:text-base text-neutral-300">
        <Typewriter
          words={["Drop me a line about your idea 💡", "Let's build something awesome together 🚀"]}
          typingSpeed={60}
          deletingSpeed={35}
          holdTime={1200}
        />
      </div>

      {/* Card */}
      <div className="mt-10 rounded-2xl border border-white/10 bg-neutral-900/70 backdrop-blur-sm shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_15px_35px_-10px_rgba(0,0,0,0.6)]">
        <form onSubmit={onSubmit} className="p-6 md:p-8 space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm text-neutral-300 mb-2">
              Name:
            </label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={onChange}
              placeholder="> Your name here"
              autoComplete="name"
              className="w-full rounded-lg bg-neutral-800/80 text-neutral-200 placeholder-neutral-500 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-transparent px-4 py-3"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm text-neutral-300 mb-2">
              Email:
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
              placeholder="> your@email.com"
              autoComplete="email"
              className="w-full rounded-lg bg-neutral-800/80 text-neutral-200 placeholder-neutral-500 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-transparent px-4 py-3"
              required
            />
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm text-neutral-300 mb-2">
              Message:
            </label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={onChange}
              placeholder="> Write your message here..."
              rows={7}
              autoComplete="off"
              className="w-full rounded-lg bg-neutral-800/80 text-neutral-200 placeholder-neutral-500 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-transparent px-4 py-3 resize-none"
              required
            />
          </div>

          {/* Honeypot (hidden) */}
          <input
            type="text"
            name="hp"
            value={form.hp}
            onChange={onChange}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={isSending}
            className="relative group w-full overflow-hidden rounded-lg
                       bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold py-3
                       shadow-lg shadow-indigo-500/30 ring-1 ring-white/10
                       transition-all duration-300 hover:shadow-indigo-500/50 hover:from-indigo-500 hover:to-blue-500
                       disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {/* sweeping glow beam */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0
                         bg-gradient-to-r from-transparent via-white/20 to-transparent
                         opacity-0 group-hover:opacity-100
                         -translate-x-[150%] group-hover:translate-x-[150%]
                         transition-transform duration-700 ease-out"
            />
            <span className="relative z-10">{isSending ? "Sending…" : "Send Message 🚀"}</span>
          </button>

          {/* Fun console line */}
          <code className="block text-emerald-400 text-sm mt-4" aria-live="polite">
            {status}
          </code>
        </form>
      </div>
    </section>
  );
}
