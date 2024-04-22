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

✅ Ensure the navigation has the same way of rendering for each path. Now I can highlight the active one.

✅ Add the operations into the navigation and link to the right operation page.

✅ Allow rendering `summary` if available.

✅ Only show the operations of the active openapi. The rest can be minimised at the bottom.

# Search

✅ Make current header sticky on top

✅ Ensure we auto-scroll to the currently active operation.

✅ Implement a searchbar in the sticky header as well.

🤔 Rather than doing direct search, let's focus on search via an API. 🐴

🤔 In `layout.tsx` we don't have access to the `searchParams`.

# Metadata

- ✅ Ensure it's fully cached and has good indexation.
- ✅ Add correct metadata (title + basic description)
- ✅ Add description being from the operation description
- ✅ Add image from openapi info logo url for serper.dev (and add it to the spec)
- ✅ The hardcoded openapis will be cached in HTML at buildtime.
- ❌ Create a sitemap so these pages are indexable.

# Allow for wildcard domain

- ✅ Added `*.dataman.ai` as main domain and changed its nameservers to vercelDNS
- ✅ Change proxy in a way that it looks at subdomain and find the right openapi file

# SUPERPROXY: Create proxies for all of them

- ✅ Make a script that:
  - lists all current JSONs in `public`
  - pulls https://api.apis.guru/v2/list.json and reformats it into flat-object array
  - add my own OpenAPI list too besides this.
  - add a unique key for each api
  - puts all `x-origin` openapi urls into `next-openapi-proxy/public` with name `[key].json`
- ✅ Confirm the above is possible to host on Vercel (must be <13GB)
- ✅ Add an api `/list.json` that responds with all openapi paths.
- ✅ change servers to `https://[key].dataman.ai` and change `x-origin-servers` to `[{url:"original url"}]`
- ✅ ensure key can be a subdomain

# Realtime OpenAPI Search

- ✅ Make the proxy work in a way that I can provide headers and it will pass it on.
- ✅ On the openapi overview page, add links for different explorers for the openapi (same as with https://apis.guru) so we can test things.
- ✅ Use `list.dataman.ai/list.json` in `openapi-for-humans-next` at buildtime to build and show the menu.
- ✅ Ensure hardcoded list I had originally is also part of it.
- ✅ Make a client component so we can search through the list in realtime.
- ✅ Fix serverless function timeout: we don't need the operations in the menu, let's KISS.
- Also add realtime search in the navigation. Just make it a client component.
- Make it scroll so the active openapi is on top
- Add ability to favorite apis so they go on top for you. Ensure it already contains a default with some favorited for me that are nice.
- Make proxy work: Paths matcher doesn't always match correctly. Read spec and ensure it matches with variables too.
- Confirm the proxy works by testing `serper.dataman.ai/serper.json` in swaggerui
- Test and favorite a few more.

# Improved OpenAPI Standard

- Come up with a pricing standard similar to how I implemented my server, but OpenAPI Design-first. Rather than only supporting pay-as-you-go, also give people a way to define subscription plans, where the pay-as-you-go is defined in credits.
- Come up with a ratelimit standard so it's clear for endpoints what the ratelimit is. If needed, should be for different plans.
- Change all my additions to be prepended with `x-`
- Remove `branding` and add `x-logo` like apiguru.

# Crawling Website Info

Do some market research finding website crawling apis.

Think about pulling my own with serverless nextjs + browserless

Implement or find an openapi for firecrawl.dev or similar.

Obtain docs site, pricing, signup, and auth info: Need web scraping for this.

As soon as possible, I need this superproxy to be authenticated for a % of them, and I need to be able to confirm this works.

# Custom OpenAPI Support

`AddCustomApi` client component.

This form should simply check if it's found and if it's correct.

If it is, it should navigate to `/{urlEncoded(url)}`

If possible, we can also add this one to `localStorage` from here so it will stay in the menu for a user, but it's not statically generated.

Depending on how easy it's to use `localStorage` maybe a better solution is to create an ID/URL pair in `localStorage` and navigate to the ID.

Also, we need to track which valid openapis people fill in. We can collect that in some analytics provider. This will allow us to become a provider that collects the data, and once in a while we will re-generate the site with all new useful openapis so google can index it too.

#

To get more openapis, see https://blog.postman.com/what-we-learned-from-200000-openapi-files/

- they collected approximately 11,000 OpenAPI documents from GitHub using Google’s BigQuery framework
- Then, 10,000 more OAS documents were added from the SwaggerHub API,
- Finally, 44,500 more API definitions were added by brute force scanning the web for likely URL endpoints at which OAS documents might be exposed

Also, apiguru has lots of apis in their repo:

- https://api.apis.guru/v2/list.json
- https://apis.guru

Mike Ralphson: mike.ralphson@gmail.com

# Refresh

Allow for refetching certain OpenAPI paths via next endpoint to regenerate it

# Backend search

Implement the search form to navigate to `/search/{endpoint}/{query}`

Implement `search/regular/{query}` to actually call some backend function that applies some sort of LLM search on the OpenAPIs.

Ultimately, a scalable API searching through thousands of APIs in a smart hierarchical way, would be what I really need.

# Single OpenAPI homepage

If there's just one openapi, load the overview of that one by default from the homepage. No redirect!

Make a variation on the navigation that only shows the current openapi and a link to the homepage. Let's make `openapiforhumans.com/klippa` the place to have a single openapi without menu of others.

It'd be great to also have some customisation like logos, coloring, etc. Let's do this custom for Klippa now, and come up with how to do this automatically at build-time.

🎉 Now the menu is near-perfect, supporting single-api sites, multiple, and custom openapi adding. It should show the active one, and everything is super static and fast.

# Proxy API

Once we can reliably have an agent decide which APIs are useful for an agent, it should be able to take the set of actions and turn it into an `OpenAPIProxy`.

Also, we need an API to host a proxy on a serverless endpoint with a single auth in front of the auths of the original apis. This can be done with the Vercel API, as long as we can set `.env` variables.

# Test proxies with OpenGPTs and/or OpenAIs API

https://github.com/langchain-ai/opengpts and OpenAIs API should allow me to easily build an agent with a new serverless OpenAPI Proxy, and then test the agent.

The proxy creator is already an amazing idea, but when will it be useful and reliable? We need to test agents for that.

# Next.js Installation Problem

If we have `^0.0.5` or anything in our own packages, theres a big chance the package doesn't get updated to the latest version. Maybe this is `package-lock.json` at work? In this case, maybe there should be a predeploy that refreshes all packages to the latest version. This way we can be certain about the version number.

# Validate the usefulness of this thing

For each `explorer.actionschema.com/xyz` page, contact the company and try to get a meeting with them.

Talk with multiple SaaS providers with an API about the usefulness of multiple GTM ideas.

Explore LangChain, Robocorp and the tooling they made and see where it can be complemented.

## GTM ideas

- `OpenAPIActionSchema` for OpenAPI improvement: examples, testing, docs, and much more.
- Webapp for (open)GPTs to more easily find the right actions for agents.
- Offer Support chat-agent for SaaS
- Offer Execute-Agent for SaaS
- Code recipes generation
- Provide API playground website to SaaS
- Provide paid search-access to Code-gen AIs

# LLM Search & Generating ActionSchemas

- Add LLM Search based on an OpenAI key provided in configuration. Should use a serverless endpoint and some sort of global cached openapi store.
- Add ability to select search results and export the openapi/operationId-pairs and also the entire JSON
- Create a nice prompt for generating ActionSchemas which can use the above as context.
- Make it easy to create an openapi proxy from selection.
