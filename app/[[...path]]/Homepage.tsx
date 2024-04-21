import { readFile } from "fs/promises";
import path from "path";
import Markdown from "react-markdown";
import { ProperMarkdown } from "../ProperMarkdown";

export const Homepage = async () => {
  const readmePath = path.resolve(".", "README.md");
  console.log({ readmePath });
  const readme = await readFile(readmePath, "utf8");

  return (
    <main className="min-h-screen p-24">
      <ProperMarkdown>{readme}</ProperMarkdown>
    </main>
  );
};
