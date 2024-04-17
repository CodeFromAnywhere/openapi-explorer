export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-24">
      Welcome!
      <br />
      <br />
      <p>
        <b>OpenAPI for Humans</b> combines multiple OpenAPIs in a fast,
        organized, and searchable interface (inspired by{" "}
        <a target="_blank" href="https://devdocs.io">
          DevDocs
        </a>
        ).
      </p>
      <br />
      <pre>
        Here&apos;s what you should know before you start:
        <br />
        <br />
        {`- Open the Preferences to enable more docs and customize the UI.
- You don't have to use your mouse — see the list of keyboard shortcuts.
- The search supports fuzzy matching (e.g. "llm" brings up "large language model").
- To search a specific documentation, type its name (or an abbr.), then Tab.
- You can search using your browser's address bar.
- OpenAPI for Humans works offline, on mobile, and can be installed as web app.

OpenAPI for Humans is free and open source.  
`}
      </pre>
    </main>
  );
}
