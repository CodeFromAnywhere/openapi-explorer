# IDEA: Services crawler: useful niche: SERP

Let's imagine we want to know everything about the topic of SERP. How would an AI be able to find these websites? A single ActionSchema that does something like this could be enough to auto-generate 100 OpenAPIs for SERP. Zooming out, the same strategy can be applied for any other topic such as image generation. Each proxy can be deployed separately, and we can also set up a separate website with pricing.

```json
{
  "capability": "APIs that respond with search engine result pages (SERP APIs)",
  /** LLM-generated + human feedback */
  "agentFindingStrategy": "Use Google and search for 'SERP API' and 'Google Search API' and get the URLs and descriptioins for the first 5 pages for each query",
  /** Found using an agent with `agentFindingStrategy` */
  "googleResults": [
    {
      "url": "https://serper.dev",
      "description": "",
      "domain": "serper.dev",
      "isFirstResult": true,
      /** Can be done with an agent that determines whether {domain} can fulfil {capability} */
      "isValid": true
    },
    { "url": "https://serpdog.io" },
    {
      "url": "https://www.scrapingbee.com/features/google/"
    },
    { "url": "https://serpapi.com" },
    {
      "url": "https://docs.perplexity.ai/reference/post_chat_completions"
    },
    { "url": "https://kagi.com" }
  ],
  /** Taken from googleResults(isFirstResult && isValid).domain */
  "validDomains": [
    {
      "domain": "serper.dev",
      /** Scraped by an agent if available */
      "originalOpenapiUrl": null,
      /** Scraped by an agent*/
      "documentationUrl": null,
      /** Scraped by an agent */
      "usageInformation": null,
      /** Scraped by an agent*/
      "pricing": "2500 free queries, afterwards pay as you go packages ....MORE INFO....",
      /** LLM */
      "pricingSummary": "2500 queries for free, then $0.30-$1 per 1000 queries by buying packages sizing between $50 and $3750",
      /** LLM */
      "ratelimit": "50-300 queries per second",

      /** Agent determines this based on usageInformation */
      "endpoints": [
        {
          "url": "https://google.serper.dev/search",
          "description": "The main endpoint to search Google Search",
          "input": {
            "q": "apple inckkkk",
            "location": "Kazakhstan",
            "gl": "kz",
            "hl": "sq",
            "num": 30,
            "autocorrect": false,
            "page": 2
          },
          "output": {
            "searchParameters": {
              "q": "apple inckkkk",
              "gl": "kz",
              "hl": "sq",
              "type": "search",
              "num": 30,
              "autocorrect": false,
              "page": 2,
              "location": "Kazakhstan",
              "engine": "google"
            },
            "organic": []
          },
          "testResultConclusion": "OK"
        },
        {
          "url": "https://google.serper.dev/images",
          "description": "The main endpoint to search Google Images",
          "input": {
            "q": "apple inckkkk",
            "location": "Kazakhstan",
            "gl": "kz",
            "hl": "sq",
            "num": 30,
            "autocorrect": false,
            "page": 2
          },
          "output": {
            "organic": []
          },
          "testResultConclusion": "OK"
        }
      ],
      /** Fetched from `originalOpenapiUrl` or based on endpoints, needed to create serverless openapi proxy.  */
      "openapiForProxy": {
        //openapi
      },
      /** Based on openapiForProxy, needed to serve to users */
      "proxyOpenapi": {
        //openapi
      },
      // This could put this whole thing (ValidDomain) in a new standalone datastructure (DeployableOpenapi)
      "deployProxy": { "isSuccessful": true }
    }
  ]
}
```

Imagine this would be possible. The same tech required carries over to many other places, so this seems like a great initial concept.

I can use induced.ai within ActionSchema initially.

TODO:

- Make locally runnable ActionSchema work nicely.
- Create `openapiForProxy`s for serper.dev, induced.ai, and all other apis I had previously integrated and host these proxys on `xyz.actionschema.com/openapi.json`.
- Via the VSCode interface of ActionSchema, ensure these proxys are all added and can be searched through with semantic search.

# `serper-openapi`:

- ✅ Use `app` router instead of `pages` router to allow for root path to be root for api.
- ✅ Add other serper endpoints to complete the spec.
- ❌ Test them inside ActionSchema and confirm the proxy works as expected. **Not yet, I need to improve those components**

# `openapi-for-humans-next`

- ✅ Make layout look like https://devdocs.io
- ✅ Setup router structure in the right way
- ✅ Clean up `openapi-for-humans` packages and deploy everything with new `from-anywhere`
- ✅ Learn new stuff from next approuter docs
- ✅ Figure out how to statically build `OperationPage` for predefined openapis: `https://explorer.actionschema.com/[openapiId]/[operationId]`

# New Vercel-project: `klippa.dev`

✅ As a POC make a next-app for a **single project** too rather than all. This can be a different environment variable `SELECTED_OPENAPI_IDS=klippa` which can be comma separated ids as we hardcoded.

✅ We need to keep maintaining both a single one and multiple ones from the same repo but allow it to be hosted in multiple ways using these ENVIRONMENT VARIABLE settings.

🔥 Later I can do this for any SaaS, even if they don't have an OpenAPI.

# Optimise single openapi site

✅ Added nice readme with a markdown renderer onto the site.

Ensure the navigation has the same way of rendering for each path. Now I can highlight the active one.

Add the operations into the navigation and link to the right operation page.

If there's just one openapi, load the overview of that one by default from the homepage. No redirect!

Allow rendering `summary` if available.

Allow sorting on tags similar to `readme.com`

Only show the operations of the active openapi. The rest can be minimised at the bottom.

Confirm it looks good now als for multiple openapi nav.

If I can use `typeof window !== "undefined" && window.location.search` from server, implement search in this way. No `setState` as it's a URL modification hook.

Make a variation on the navigation that only shows the current openapi and a link to the homepage. Let's make `openapiforhumans.com/klippa` the place to have a single openapi without menu of others.

It'd be great to also have some customisation like logos, coloring, etc. Let's do this custom for Klippa now, and come up with how to do this automatically at build-time.

# Custom OpenAPI Support

This form should simply check if it's found and if it's correct.

If it is, it should navigate to `/{urlEncoded(url)}`

If possible, we can also add this one to `localStorage` from here so it will stay in the menu for a user, but it's not statically generated.

Depending on how easy it's to use `localStorage` maybe a better solution is to create an ID/URL pair in `localStorage` and navigate to the ID.

Also, we need to track which valid openapis people fill in. We can collect that in some analytics provider. This will allow us to become a provider that collects the data, and once in a while we will re-generate the site with all new useful openapis so google can index it too.

🎉 Now the menu is near-perfect, supporting single-api sites, multiple, and custom openapi adding. It should show the active one, and everything is super static and fast.

# Posting a form

- ✅ Take some `actionschema-web` stuff that was similar and make this opensource. If treeshaking works, better just make one huge package `cfa-react` or so or general purpose utils, then some more niche packages.
- `schema-util` can become an open-source package `oai-schema-tools` or so for both openapi and json-schema conventions. In there, let's refer to other people having made stuff. Also document my choices and learnings, and tips&tricks there. Look for other people making utils for this that is well-maintained.
- Resolve body schema in `getOpenapiOperations.ts`. Get it fully resolved from the openapi. Do some research to find this function.
- Now render the form in the standard way without the variables-string stuff.
- Use `cors-proxy` like in `actionschema-web` to make the form able to be posted
- Provide required header info to the form in the right way and add this as additional (maybe prefilled) values to the form.
- Secrets such as auth can be `password inputs` with toggles to view and copy.

# `openapi-for-humans-next`

- Implement `OperationPage` with just the form.
- Ensure it's fully cached and has good indexation.

# Next.js Installation Problem

If we have `^0.0.5` or anything in our own packages, theres a big chance the package doesn't get updated to the latest version. Maybe this is `package-lock.json` at work? In this case, maybe there should be a predeploy that refreshes all packages to the latest version. This way we can be certain about the version number.

# `openapi-for-humans-next`

- Add correct metadata.
- Create a sitemap so these pages are indexable.
- The hardcoded openapis will be cached in HTML at buildtime. What about the dynamic ones? They're probably good too as nextjs takes care of it.
- Allow for refetching certain OpenAPI paths via next endpoint to regenerate it (or auto-revalidate it every minute)
- Add settings similar to `actionschema-web` for auth etc.

# Validate the usefulness of this thing

For each `explorer.actionschema.com/xyz` page, contact the company and try to get a meeting with them.

Talk with multiple SaaS providers with an API about the usefulness of multiple GTM ideas.

## GTM ideas

- `OpenAPIActionSchema` for OpenAPI improvement: examples, testing
- Offer Support chat-agent for SaaS
- Offer Execute-Agent for SaaS
- Code recipes generation
- Provide API playground website to SaaS
- Provide paid search-access to Code-gen AIs
- Webapp for openai to more easily find actions for agents (Milan)

# Serper Improvements

- Add information about docs, signup, pricing, etc in the openapi spec and fill it in nicely for serper.dev
- Add information on how to auth (for now, require the user to make their token in serper.dev and pay there)
- Other APIs to proxy: Induced, Scrapingbee, OpenAI, PlayHT, Deepgram, Fly.io, etc etc. Contact every API owner by applying to a position with open email about OpenAPIs. Then go into interview and show them the value I created already.
- ❌ Also deploy the SDK based on my openapi.
- ❌ Also deploy a link to docs in this website. Can be using that docs maker.
- ❌ Turn this website into a playground: For every endpoint, show a form, and documentation.
- The above would be distraction. **Focus on reducing time required to have quality api proxy**.

<!-- The above is a Proof of concept and is valuable for any service. -->

# LLM Search & Generating ActionSchemas

- Add LLM Search based on an OpenAI key provided in configuration. Should use a serverless endpoint and some sort of global cached openapi store.
- Add ability to select search results and export the openapi/operationId-pairs and also the entire JSON
- Create a nice prompt for generating ActionSchemas which can use the above as context.
- Make it easy to create an openapi proxy from selection.