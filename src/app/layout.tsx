import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: {
    default: "PEDSAR | Cursos y capacitaciones",
    template: "%s | PEDSAR",
  },
  description:
    "Aprende tecnología, datos y gestión con cursos prácticos de PEDSAR. Explora la oferta, inscríbete en línea y certifica tus habilidades.",
  keywords: ["PEDSAR", "cursos", "capacitaciones", "tecnología", "Ica"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className="bg-background text-foreground antialiased"
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
