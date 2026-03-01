import Link from "next/link";
import SmokeCanvas from "@/components/smoke-canvas";

export default function DeniedPage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-night text-ink">
      <SmokeCanvas />
      <div className="scanlines pointer-events-none" />
      <div className="relative z-10 mx-auto w-full max-w-lg px-4 text-center">
        <div className="glass-panel rounded-3xl border border-red-500/30 p-6 shadow-neon-red sm:p-8">
          <h1 className="display-font mb-3 text-3xl font-semibold text-red-400 sm:text-4xl">ACCESS DENIED</h1>
          <p className="mb-6 max-w-2xl text-base text-red-100/80 sm:text-lg">
            You must be 21 years of age or older to enter this site.
          </p>

          <div className="mt-6">
            <Link href="https://www.google.com" className="button-primary bg-red-600 hover:bg-red-700">
              EXIT
            </Link>
          </div>

          <p className="mt-8 text-xs uppercase tracking-[0.18em] text-red-100/65">ERROR: AGE REQUIREMENT NOT MET</p>
        </div>
      </div>
    </main>
  );
}
