"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const VERIFIED_KEY = "ru21_verified";

type GateState = "locked" | "opening" | "denied";

export default function AgeGate({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [verified, setVerified] = useState(false);
  const [gateState, setGateState] = useState<GateState>("locked");
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const verifiedFlag = window.sessionStorage.getItem(VERIFIED_KEY);
    if (verifiedFlag === "true") {
      setVerified(true);
    }
  }, []);

  const handleAllow = () => {
    setGateState("opening");
    window.sessionStorage.setItem(VERIFIED_KEY, "true");
    window.setTimeout(() => {
      setVerified(true);
    }, 860);
  };

  const handleDeny = () => {
    setGateState("denied");
    router.push("/denied");
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
      <AnimatePresence>
        {!verified && (
          <motion.section
            className={`fixed inset-0 z-[1000] overflow-hidden bg-[#020407] ${
              gateState === "opening" ? "gate-opening" : ""
            }`}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="gate-door gate-door-left" />
            <div className="gate-door gate-door-right" />

            <motion.div
              className="relative z-10 mx-auto flex min-h-full w-full max-w-lg items-center justify-center px-4 py-8"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <div className="glass-panel w-full rounded-3xl border border-cyan-300/30 p-6 text-center shadow-neon sm:p-8">
                <h1 className="display-font mb-3 text-3xl font-semibold text-cyan-100 sm:text-4xl">
                  21+ TO ENTER
                </h1>
                <p className="mb-6 max-w-2xl text-base text-cyan-100/80 sm:text-lg">
                  You must be 21 years of age or older to enter this site.
                </p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <button className="button-primary w-full sm:w-auto" type="button" onClick={handleAllow}>
                    YES, I AM 21+
                  </button>
                  <button className="button-ghost w-full sm:w-auto" type="button" onClick={handleDeny}>
                    NO
                  </button>
                </div>

                <p className="mt-8 text-xs uppercase tracking-[0.18em] text-cyan-100/65">
                  ACCESS STATUS: {gateState === "denied" ? "DENIED" : gateState === "opening" ? "GRANTED" : "AWAITING INPUT"}
                </p>
              </div>
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>

      <div className={verified ? "opacity-100 transition-opacity" : "pointer-events-none opacity-0"}>
        {children}
      </div>
    </>
  );
}
