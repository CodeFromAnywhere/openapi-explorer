# April 2024

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

# Fix enhancement proxy (openapi.actionschema.com)

- ✅ `openapi-enhancement-proxy-next` should route the key as first pathname chunk rather than subdomain
- ✅ when generating the server url, also use the key in pathname, and proxy is located at openapi.actionschema.com
- ✅ add homepage on which is instructed to clone to make your own, and link to explorer to discover all.

# Fix explorer

✅ Fix 500 error

✅ Fix OpenAPI can't be found

## Better Schema Resolving

❌ Look if rsjf can resolve remote or local `$ref`s. If it does, we're done, but not likely.

✅ Try `https://github.com/APIDevTools/json-schema-ref-parser`

✅ If it is not satisfactory, find others **It's good**

❌ If still not good, make my own: `resolveSchemaRecursive`

# OLD ❌ Posting a form

❌ Let's assume we don't need forms if agents can choose the actions for us and test them out.

- ✅ Take some `actionschema-web` stuff that was similar and make this opensource. If treeshaking works, better just make one huge package `cfa-react` or so or general purpose utils, then some more niche packages.
- ❌ `schema-util` can become an open-source package `oai-schema-tools` or so for both openapi and json-schema conventions. In there, let's refer to other people having made stuff. Also document my choices and learnings, and tips&tricks there. Look for other people making utils for this that is well-maintained.
- ✅ Resolve body schema in `getOpenapiOperations.ts`. Get it fully resolved from the openapi. Do some research to find this function.
- ✅ Now render the form in the standard way without the variables-string stuff.
- ✅ Provide required header info to the form in the right way and add this as additional (maybe prefilled) values to the form.

## OpenAPI Form Creation

- ✅ Finish `getFormSchema({openapi,path,method})`:
  - ✅ Merges schemas from parameters and body.
  - ✅ Merges the servers belonging to the operation according to spec.
- ✅ Make function `submitOperation(openapiUrl, path, method, context)` that fills headers, path, query, cookies, and body into a fetch in the right way according to the spec.
- ✅ Make new `OpenapiForm` with generic to paths and methods

## Back to `openapi-for-humans-next`

- ✅ Look at what I had in the actionschema and actionschema-demo codebases for form filling and copy over anything useful to `openapi-util`
- ✅ Install react in `openapi-util` and `rjsf`
- ✅ Use `rjsf` properly in the new form component.
- ✅ Test the same component in `openapi-for-humans-next` for every operation you can click. Tag-based paging comes later.
- ✅ Make it successfully render some form

## Fixes

- ✅ Make `openapi-for-humans-next` build in localhost. Fix problems.
- ✅ Some endpoints don't load; probably goes wrong in (de)serialisation
- ✅ Some stuff doesn't require body. If this is the case, form should still be a form (without any inputs)
- ✅ Make it build in prod

## OpenAPI Security

Incorporate top-level openapi-security as well into the form. This is more complex though, as it can require form submission. Secrets such as auth can be `password inputs` with toggles to view and copy, but to submit them, sometimes requires explanation or a popup. In the end, it always results in some form of header or cookie. Best to make this a custom input that is part of the form.

Make a custom component for this that is part of the form. For now only implement the http and basic types of authorization, as they're easy enough. For the others, show a warning so it's clear these forms won't work for auth-reasons.

TODO:

- ✅ Add http and apiKey auth into `getFormSchema`
- ✅ Reconstruct `securitySchemes` in `submitOperation`

## OpenAPI LLM Interpretation

- ✅ Show all tags and sort by it in Openapi Overview Page
- ✅ Try to create a string from an openapi that parses the apis into tags, endpoints, and summaries
- ✅ Create a button to go to groq with the above text + intro copied to clipboard

## Simplify debugging

❌ I need to be able to easily use all my endpoints from a swagger but with localhost. How? https://github.com/jellydn/next-swagger-doc maybe?

✅ Look at how `explorer.actionschema.com` was made again.

✅ Create a component in `react-openapi-form` (or so) that shows expandable forms for each endpoint.

Ensure prefilling and styling is optimal.

- ✅ 1 prop to provide all styling
- ✅ store previous runs into localStorage
- ✅ show req/res headers/body in JSON fields
- remember which form is open/closed

✅ Apply new component in `explorer`

✅ Use this component in `crud-openapi`

❌ Host `explorer` on http as well and test and confirm it can handle localhost:3000 openapis as well. **This isn't possible because vercel doesn't support http**

✅ With this, confirm that the 'people' API works.

Darkmode should render the rjsforms nicely (or no darkmode)

Add ability for a `cors-proxy` like in `actionschema-web` to make the form able to be posted to any server regardless of browser-origin-policy-security.

Add `openapi url` input and ensure it redirects to https or http depending on the url.

Button to easily switch between prod and localhost.

## Further improvements

- For Klippa it still "no schema" warning
- Cloudflare is gateway timeout (see logging, likely too slow or big)
- For GET endpoints we can probably instantly call the endpoint if there are no required non-defaulted variables with a form to edit stuff.

<!-- 🎉🎉🎉🎉 At this point, let's continue with OpenCRUD -->
