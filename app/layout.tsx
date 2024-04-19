import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {
  OpenapiExplorer,
  getOpenapisOperations,
} from "openapi-for-humans-react";
import { openapiUrlObject } from "./[...path]/openapiUrlObject";

const inter = Inter({ subsets: ["latin"] });

import "openapi-for-humans-react/css.css";

export const metadata: Metadata = {
  title: "OpenAPI for Humans",
  description: "Friendly OpenAPI Explorer",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const [search, setSearch] = useState("");

  const openapis = await getOpenapisOperations(openapiUrlObject);

  return (
    <html lang="en">
      <body className={inter.className + " flex flex-row"}>
        <nav className="w-80 h-screen border-gray-500 border-r-2">
          <OpenapiExplorer
            onRefreshOpenapis={(openapiIds) => {
              // should refresh these api(s) - which is likely 1 or all
            }}
            lastSearchResults={[]}
            onSubmitSearch={() => {
              // todo
            }}
            openapis={openapis}
            search={""}
            setSearch={() => {}}
          />
        </nav>

        <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]"></div>
        <div className="p-20">{children}</div>
      </body>
    </html>
  );
}
