export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { Inter, IBM_Plex_Serif } from "next/font/google";
import "./globals.css";
import Header from "components/header/header";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-ibm-plex-serif",
});

export const metadata: Metadata = {
  title: "Qr Me",
  description: "Qr Me is a ...",
  icons: {
    icon: "/logo_1.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overscroll-y-none">
      <body
        className={`${inter.variable} ${ibmPlexSerif.variable} overscroll-y-none`}
      >
        {children}
      </body>
    </html>
  );
}
