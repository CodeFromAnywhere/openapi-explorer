import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {
  OpenapiExplorer,
  getOpenapisOperations,
} from "openapi-for-humans-react";
import { openapiUrlObject } from "./openapiUrlObject";

const inter = Inter({ subsets: ["latin"] });

import "openapi-for-humans-react/css.css";
import { selectedIds } from "./selectedIds";
import Link from "next/link";

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
