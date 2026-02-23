import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const ibmPlexSans = IBM_Plex_Sans({
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Projeto Araucaria",
  description: "Transição Energetica no Oeste do Paraná",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" data-bs-theme="light">
      <body className={`${ibmPlexSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
