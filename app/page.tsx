"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import AgeGate from "@/components/age-gate";
import LeadFunnel from "@/components/lead-funnel";
import ProductGrid from "@/components/product-grid";
import SmokeCanvas from "@/components/smoke-canvas";
import { deals, galleryImages } from "@/lib/data";

const reveal = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" }
  }
};

export default function Page() {
  return (
    <AgeGate>
      <main className="relative min-h-screen overflow-x-clip pb-24">
        <SmokeCanvas />
        <div className="scanlines pointer-events-none" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <header className="sticky top-4 z-40 mt-4 rounded-2xl border border-cyan-200/25 bg-[#061120]/88 px-4 py-3 backdrop-blur-md sm:px-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="display-font text-lg font-semibold text-cyan-100">Cigarette House</p>
                <p className="text-xs tracking-[0.12em] text-cyan-100/75 uppercase">Bakersfield 21+ Access</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <a className="button-primary text-sm" href="tel:+16618295627">
                  Call (661) 829-5627
                </a>
                <a
                  className="button-ghost text-sm"
                  href="https://maps.google.com/?q=5400+Olive+Dr+Ste+C+Bakersfield+CA+93308"
                  target="_blank"
                  rel="noreferrer"
                >
                  Get Directions
                </a>
              </div>
            </div>
          </header>

          {/* Hero Section */}
          <section className="grid items-center gap-8 pt-14 lg:grid-cols-[1.2fr_0.8fr]">
            <motion.div variants={reveal} initial="hidden" animate="show" className="space-y-6">
              <p className="eyebrow">Open Late Daily</p>
              <h1 className="display-font text-5xl font-semibold leading-tight text-cyan-100 sm:text-7xl">
                Your One-Stop Smoke & Vape Shop
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-cyan-100/84 sm:text-lg">
                Huge selection, fair pricing, and local-owner energy built for fast runs and late
                nights. Vapes, tobacco, hookah, glass, accessories, and more under one roof.
              </p>
              <div className="flex flex-wrap gap-3">
                <a className="button-primary" href="#products">
                  See Products
                </a>
                <a className="button-ghost" href="#visit-us">
                  Visit Us
                </a>
              </div>
            </motion.div>

            <motion.div
              variants={reveal}
              initial="hidden"
              animate="show"
              transition={{ delay: 0.08 }}
              className="section-shell"
            >
              <p className="eyebrow mb-4">Store Snapshot</p>
              <div className="relative h-72 overflow-hidden rounded-2xl border border-cyan-200/25">
                <Image
                  src="/images/yelp-2.jpg"
                  alt="Cigarette House interior"
                  fill
                  priority
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="display-font text-xl text-white">5400 Olive Dr, Ste C</p>
                  <p className="text-sm text-cyan-100/85">Bakersfield, CA 93308 | 21+ only</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-cyan-100/75">
                Open late every day. Most listings show 8:00 AM to 10:00 PM with social profiles
                showing late-night windows.
              </p>
            </motion.div>
          </section>

          {/* Products Section */}
          <section id="products" className="mt-24 space-y-6">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="eyebrow mb-3">What We Carry</p>
                <h2 className="display-font text-3xl text-cyan-100 sm:text-4xl">Stocked for Daily and Late Runs</h2>
              </div>
              <a className="button-ghost hidden text-sm md:inline-flex" href="tel:+16618295627">
                Don't see it? Call us
              </a>
            </div>
            <ProductGrid />
          </section>

          {/* Why Choose Us Section */}
          <section className="mt-24">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="eyebrow mb-3">Why Choose Us</p>
                <h2 className="display-font text-3xl text-cyan-100 sm:text-4xl">Your Go-To Local Shop</h2>
              </div>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="section-shell">
                <h3 className="display-font text-xl text-cyan-100">Open Late Convenience</h3>
                <p className="mt-3 text-sm text-cyan-100/82">
                  We're open late for your night-time needs, ensuring you can always get what you
                  need.
                </p>
              </div>
              <div className="section-shell">
                <h3 className="display-font text-xl text-cyan-100">Huge Selection</h3>
                <p className="mt-3 text-sm text-cyan-100/82">
                  From vapes to glass, we have a massive selection of products to choose from.
                </p>
              </div>
              <div className="section-shell">
                <h3 className="display-font text-xl text-cyan-100">Real Service</h3>
                <p className="mt-3 text-sm text-cyan-100/82">
                  As a locally-owned business, we pride ourselves on providing friendly, helpful
                  service.
                </p>
              </div>
            </div>
          </section>

          {/* Deals Section */}
          <section id="deals" className="mt-24">
            <p className="eyebrow mb-3">Deals and Rewards</p>
            <h2 className="display-font text-3xl text-cyan-100 sm:text-4xl">Repeat-Customer Engine</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {deals.map((deal) => (
                <div key={deal.title} className="section-shell hover-glow">
                  <h3 className="display-font text-xl text-cyan-100">{deal.title}</h3>
                  <p className="mt-3 text-sm text-cyan-100/82">{deal.description}</p>
                  <p className="mt-5 rounded-lg border border-cyan-300/25 bg-black/30 px-3 py-2 text-sm text-emerald-100">
                    {deal.action}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Gallery Section */}
          <section id="gallery" className="mt-24">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow mb-3">Gallery</p>
                <h2 className="display-font text-3xl text-cyan-100 sm:text-4xl">Inside Cigarette House</h2>
              </div>
              <p className="max-w-xl text-sm text-cyan-100/75">
                Real inventory and interior images to show this is fully stocked, organized, and ready.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {galleryImages.map((image) => (
                <figure
                  key={image.src}
                  className="glass-panel neon-border group overflow-hidden rounded-2xl transition-all duration-300 hover:border-cyan-300/70"
                >
                  <div className="relative h-52">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <figcaption className="border-t border-cyan-200/20 px-3 py-3 text-sm text-cyan-100/84">
                    {image.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>

          {/* Visit Us Section */}
          <section id="visit-us" className="mt-24 grid gap-6 lg:grid-cols-2">
            <div className="section-shell space-y-4">
              <p className="eyebrow">Visit Us</p>
              <h2 className="display-font text-3xl text-cyan-100">Open Late on Olive Drive</h2>
              <p className="text-cyan-100/84">
                Cigarette House is a locally owned 21+ smoke shop carrying vaping, tobacco, glass,
                hookah, and accessories.
              </p>
              <div className="space-y-2 text-sm text-cyan-100/84">
                <p>
                  <strong>Address:</strong> 5400 Olive Dr, Ste C, Bakersfield, CA 93308
                </p>
                <p>
                  <strong>Phone:</strong> (661) 829-5627
                </p>
                <p>
                  <strong>Hours:</strong> Open daily with extended late-night positioning
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a className="button-primary" href="tel:+16618295627">
                  Tap to Call
                </a>
                <Link
                  className="button-ghost"
                  href="https://maps.google.com/?q=5400+Olive+Dr+Ste+C+Bakersfield+CA+93308"
                  target="_blank"
                >
                  Tap for Directions
                </Link>
              </div>
            </div>

            <LeadFunnel />
          </section>

          <footer className="mt-24 border-t border-cyan-200/20 py-8 text-sm text-cyan-100/68">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p>Cigarette House | 5400 Olive Dr Ste C, Bakersfield, CA 93308 | 21+ only</p>
              <p>&copy; {new Date().getFullYear()} All Rights Reserved.</p>
            </div>
            <p className="mt-4 text-xs text-cyan-100/50">
              This landing page is a conceptual design. Backend POS sync, payments, and compliance
              modules are scaffolded separately.
            </p>
          </footer>
        </div>
      </main>
    </AgeGate>
  );
}
