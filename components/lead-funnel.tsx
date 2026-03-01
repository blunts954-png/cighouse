"use client";

import { FormEvent, useState } from "react";

type Status = "idle" | "sent";

export default function LeadFunnel() {
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sent");
    event.currentTarget.reset();
  };

  return (
    <div className="section-shell">
      <p className="eyebrow mb-3">VIP Funnel</p>
      <h3 className="display-font text-2xl text-cyan-100">Get Drop Alerts and Local Deals</h3>
      <p className="mt-2 max-w-2xl text-sm text-cyan-100/80">
        Capture names, numbers, and emails for flash promos and new item alerts. Connect this form
        to Twilio and Supabase in Phase 3.
      </p>

      <form className="mt-5 grid gap-3 md:grid-cols-2" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          required
          placeholder="Full name"
          className="rounded-xl border border-cyan-200/35 bg-black/45 px-4 py-3 outline-none transition focus:border-emerald-300/70"
        />
        <input
          type="tel"
          name="phone"
          required
          placeholder="Mobile number"
          className="rounded-xl border border-cyan-200/35 bg-black/45 px-4 py-3 outline-none transition focus:border-emerald-300/70"
        />
        <input
          type="email"
          name="email"
          required
          placeholder="Email address"
          className="rounded-xl border border-cyan-200/35 bg-black/45 px-4 py-3 outline-none transition focus:border-emerald-300/70 md:col-span-2"
        />
        <label className="md:col-span-2 flex items-start gap-3 rounded-xl border border-cyan-200/20 bg-black/30 px-3 py-3 text-xs text-cyan-100/75">
          <input type="checkbox" required className="mt-0.5" />
          <span>
            I confirm I am 21+ and agree to receive deal alerts by SMS/email. Message and data rates
            may apply.
          </span>
        </label>
        <div className="md:col-span-2 flex flex-col items-start gap-2 sm:flex-row sm:items-center">
          <button type="submit" className="button-primary">
            Join VIP Alerts
          </button>
          {status === "sent" ? (
            <span className="rounded-lg border border-emerald-300/45 bg-emerald-400/10 px-3 py-2 text-sm text-emerald-100">
              Lead captured. Connect backend webhook to persist this in production.
            </span>
          ) : null}
        </div>
      </form>
    </div>
  );
}
