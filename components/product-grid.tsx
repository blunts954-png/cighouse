"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { productCards } from "@/lib/data";

export default function ProductGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {productCards.map((product, index) => (
        <motion.article
          key={product.id}
          className="product-card group relative overflow-hidden rounded-2xl"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, delay: index * 0.06 }}
        >
          <div className="glass-panel neon-border absolute inset-0 rounded-2xl" />

          <div className="relative h-52 overflow-hidden">
            <Image
              src={product.image}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center transition duration-500 group-hover:scale-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute left-4 top-4 rounded-full border border-cyan-200/40 bg-black/55 px-3 py-1 text-xs uppercase tracking-[0.12em]">
              {product.badge}
            </div>
            <div className="absolute bottom-4 left-4">
              <p className="text-sm uppercase tracking-[0.16em] text-cyan-100/80">{product.category}</p>
              <h3 className="display-font mt-1 text-2xl font-semibold text-white">{product.title}</h3>
            </div>
          </div>

          <div className="relative space-y-4 p-4 sm:p-5">
            <p className="text-sm leading-relaxed text-cyan-100/84">{product.description}</p>
            <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
              <span className="rounded-md border border-emerald-300/40 bg-emerald-300/10 px-3 py-1 font-semibold text-emerald-100">
                {product.priceBand}
              </span>
              <a className="button-primary text-sm" href="tel:+16618295627">
                Call for Stock
              </a>
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
