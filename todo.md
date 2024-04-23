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
- ✅ Also add realtime search in the navigation. Just make it a client component.
- ✅ Add stateful search with url so it remains the same across pageloads and we can share it.
- ✅ Ensure listed apis go first by sort

🎉 APIs are searchable

# Fix Cache

- ✅ Read about next-app-router caching and fix that the list.json is refreshed. Now, my hardcoded openapis are on top.
- ✅ Allow for refetching certain OpenAPI paths via next endpoint to regenerate it. Add a button on the openapi overview page to refresh.

# Disable path checking

- ✅ Disable path validation in proxy for now
- ✅ Disable explicit JSON conversion
- ✅ Confirm the proxy works by testing in `swagger-ui`: `serper.dataman.ai/serper.json`

🎉 proxy now works

# Improved OpenAPI Standard and useful endpoints

- ✅ Come up with a pricing standard similar to how I implemented my server, but OpenAPI Design-first. Rather than only supporting pay-as-you-go, also give people a way to define subscription plans, where the pay-as-you-go is defined in credits.
- ✅ Come up with a ratelimit standard so it's clear for endpoints what the ratelimit is. If needed, should be for different plans.
- ✅ Change all my additions to be prepended with `x-`
- ✅ Remove `branding` and add `x-logo` like apiguru.
- ✅ add information about docs, signup, pricing, etc in the openapi spec
- ✅ Add information on how to auth (for now, require the user to make their token in serper.dev and pay there)

# Make more OpenAPIs

- ✅ For serper.json handmade api, add auth specification as required (`X-API-KEY` header)
- ✅ Fill new spec in nicely for `handmade/serper.json`
- ✅ Confirmed serper spec works in swagger UI 🎉
- Added openapi for:
  - ✅ pdfgen (doppio)
  - ✅ browser api (browserless)
  - browser agent
    - 🟠 induced.ai (Asked them in Discord)
    - ✅ multion.ai
  - ✅ firecrawl.dev
- ❌ Do some market research finding website crawling apis. **couldnt find any quick openapis. A more programmatic approach will be much better**
- ❌ Find the endpoints that opengpts is using for things like wiki, ddg, and have those available as openapi too. **It uses some weird langchain primitives and generates an openapi from there**
- 🟠 Look at the other APIs I had (`isPublic:true` && "plugin") as part of ActionSchema, and add their openapi proxy independently.

🎉 I've got some useful apis proxied now, I've built a layer to be able to improve them programatically, and adopted this scalable way to aggregating them!

# Building Blocks Blog

✅ Fix `projectRoot` problem.

✅ Deploy OS-Web

✅ Put blog online but hidden.

✅ Improve AS Homepage

# Missing link 1: `OpenAPIProxy` <!--tuesday-->

## Setup

- ✅ Added and altered `openapi-proxy.schema.json` to `actionschema/types`
- ✅ Setup the skelleton for the next.js app router project

## Frontend

- ✅ Make a frontend that allows easy OpenAPIProxy creation via a form.
- ✅ Serve this on `proxy.actionschema.com`
- ✅ Add `?url=xxx&url=xxx` capability so it's easy to prefil the form with openapis and a selection of available operations
- ✅ Ensure it submits to `makeProxyOpenapi` and responds with result.
- ✅ Add another button that simply responds with the `OpenapiProxy` Json instead.
- In explorer, add a link to `proxy.actionschema.com?url=xxx`

## Creation

- Implement `makeProxyOpenapi(proxy)` which turns an `OpenapiProxy` into an `openapi.json`
- Make it so that the openapis created get stored into kv-storage and served at `proxy.actionschema.com/[id]/openapi.json` and the api served at `proxy.actionschema.com/[id]/` and serve a nice homepage for every proxy too.

## Proxy Request

- Implement `handleProxyRequest(proxy,openapi)` that propogates the requests to the right real server.

## Testing

- Make a proxy for AssistantCRUD and get an openapi for this that's hosted and functional: listAssistants, createAssistant, getAssistant,modifyAssistant, deleteAssistant.
- Make an assistant for this very OpenAPI via the OpenAPI playground and confirm it's somewhat working.

<!-- This is my super valuable tool for any AI enthousiast already. -->

# Missing link 2: `AgentOpenAPI`

For a created agent in OpenAI, we need an OpenAPI to be created so agents become stackable.

- OpenAPI: `agent.actionschema.com/[userid]/[id]/openapi.json`
- Server: `agent.actionschema.com/[userid]/[id]/**`
- Homepage: `agent.actionschema.com`: Fill in your OpenAI key, store this in kv with a created userId, and redirect to your page: `/[userId]`
- Userpage: `agent.actionschema.com/[userId]` will render exploration of all agents from the given user.
- NewAgentForm: `agent.actionschema.com/new?url=openapi` will allow easy creation of a new agent in your OpenAPI account with the openapi prefilled.

> Now I need to answer the question how to make agents reliable. And I think it can be done by making their possible behaviors simple enough and unambiguous.

# Safety

Last but not least, reason about a "safety" building block that needs to be there. `Decentralised Action Tracking` would be my bet: any agent will only perform any action given he knows the context in which this action has impact and confirms the ethical nature of the action. Therefore, any agent needs to be provided additional context for performing an action, and any agent needs to provide additional context. Besides, some high-level metrics should be visible: agents cannot work in the darkness. Inspired by humans. Old blog: https://www.actionschema.com/blog/agi-decentralised-oversight

# Twilio Relay OpenAPI:

Rename this to `human-openapi` and make it possible there to create it for multiple humans. BYOK on user-level.

`twilio-relay` (should be serverless standalone with bring your own twilio)

Host this next project on human.actionschema.com

# MAIL

Make a PR in APIS.guru and Let `mike.ralphson@gmail.com` know.

Let Antti Sema4.ai know about this as well, once it's there. It'd be very useful to be able to make agents so quickly and can be part of their docs. Maybe I can merge it in into opengpts.

# SWC UTIL (tuesday)

- `swc-util` needs to become a standalone CLI + api
- Use that api to be able to generate an openapi from code in a serverless environment
- Use that for the below apis I want to setup. This way it should be much faster.

# Make Webscraping API (Wednesday)

Think about pulling my own crawler with serverless nextjs + browserless or use another API.

- `fromHtmlGetRecurringElementsPlugin`
- `getRichLink`
- `getRichTextPlugin`
- `stripHtml`
- Other HTML to markdown stuff ;)
- `markdownToHtml.ts` is a simple utility function but very useful. maybe can also use `markdown-wasm` in serverless. In that case, could be even better.
- Good ideas:
  - function to scrape all internal links, recursively, and make a contentMap for links on each page. also respond with the external links and whether or not they are follow. This can be a base for a pagerank algo
  - function to find sitemap
  - function to get robots.txt in json

Just spend 2 hours on this and expose that on `scraping.actionschema.com`

# Make Replicate OpenAPI (Thursday)

`replicate-wrapper` contains a lot of nice ones. I experimented before generating the openapi spec for their project. Let's do this now in serverless standalone project so others can benefit too.

# LLM Prompting Cookbook & OpenAPI

- `gpt-data-util` is full of useful GPT Data Creation Prompts that can easily be exposed as serverless OpenAPI
- Other things in `ai-scraping` can be very useful (such as `person-insights`)
- `getJobData.ts`
- `imageToJson`
- `audioToJson` (needed for sprent)

# PRINT

**Let's Print `ai-scraping`**: There's lots of code there that will be good to freshen up on. Let's print it all out!

# DOMAIN

If home....

Buy openapiforhumans.com? cheap, good name

# Grouping

Read: https://swagger.io/docs/specification/grouping-operations-with-tags/\

Show all tags and sort by it in Openapi overview Page

# Crawling Website Info

As soon as possible, I need this superproxy to be authenticated for a % of them, and I need to be able to confirm this works.

Put the APIs of which I have authentication (or they're public) on top of the list, and mark them.

In the proxy, ensure auth gets provided with a master auth key.

🎉 Now I have 10+ authed apis that can be used via my proxy

# Backend search

Implement the search form to navigate to `/search/{endpoint}/{query}`

Implement `search/regular/{query}` to actually call some backend function that applies some sort of LLM search on the OpenAPIs.

Ultimately, a scalable API searching through thousands of APIs in a smart hierarchical way, would be what I really need.

# Proxy API

Once we can reliably have an agent decide which APIs are useful for an agent, it should be able to take the set of actions and turn it into an `OpenAPIProxy`.

Also, we need an API to host a proxy on a serverless endpoint with a single auth in front of the auths of the original apis. This can be done with the Vercel API, as long as we can set `.env` variables.

# LLM Search & Generating ActionSchemas

- Add LLM Search based on an OpenAI key provided in configuration. Should use a serverless endpoint and some sort of global cached openapi store.
- Add ability to select search results and export the openapi/operationId-pairs and also the entire JSON
- Create a nice prompt for generating ActionSchemas which can use the above as context.
- Make it easy to create an openapi proxy from selection.

## GTM ideas

- Talk with multiple SaaS providers with an API about the usefulness of multiple GTM ideas.
- Explore LangChain, Robocorp and the tooling they made and see where it can be complemented.
- `OpenAPIActionSchema` for OpenAPI improvement: examples, testing, docs, and much more.
- Webapp for (open)GPTs to more easily find the right actions for agents.
- Offer Support chat-agent for SaaS
- Offer Execute-Agent for SaaS
- Code recipes generation
- Provide API playground website to SaaS
- Provide paid search-access to Code-gen AIs
