import { readFile } from "fs/promises";
import Markdown from "react-markdown";

export default async function Home() {
  const readme = await readFile("README.md", "utf8");

  return (
    <main className="flex min-h-screen flex-col p-24">
      <Markdown
        components={{
          h1: (props) => <h1 className="text-3xl py-8">{props.children}</h1>,
          h2: (props) => <h2 className="text-2xl py-8">{props.children}</h2>,
          code: (props) => <code className="font-bold">{props.children}</code>,
          li: (props) => <li className="list-disc list-inside" {...props} />,
          a: (props) => <a className="text-blue-500" {...props} />,
          p: (props) => <p className="py-2" {...props} />,
          pre: (props) => (
            <pre
              className="w-full p-4 my-4 border border-orange-300"
              {...props}
            />
          ),
        }}
      >
        {readme}
      </Markdown>
    </main>
  );
}
