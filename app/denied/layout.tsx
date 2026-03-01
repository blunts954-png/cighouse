import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Access Denied",
  description: "Access to this site is restricted to adults 21+."
};

export default function DeniedLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-night text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
