import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "openapi-for-humans-react/css.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OpenAPI for Humans",
  description: "Friendly OpenAPI Explorer",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
