# ❌ Posting a form

❌ Let's assume we don't need forms if agents can choose the actions for us and test them out.

- ✅ Take some `actionschema-web` stuff that was similar and make this opensource. If treeshaking works, better just make one huge package `cfa-react` or so or general purpose utils, then some more niche packages.
- `schema-util` can become an open-source package `oai-schema-tools` or so for both openapi and json-schema conventions. In there, let's refer to other people having made stuff. Also document my choices and learnings, and tips&tricks there. Look for other people making utils for this that is well-maintained.
- Resolve body schema in `getOpenapiOperations.ts`. Get it fully resolved from the openapi. Do some research to find this function.
- Now render the form in the standard way without the variables-string stuff.
- Use `cors-proxy` like in `actionschema-web` to make the form able to be posted
- Provide required header info to the form in the right way and add this as additional (maybe prefilled) values to the form.
- Secrets such as auth can be `password inputs` with toggles to view and copy.

# ❌ Serper Improvements

❌ Let's assume for now that APIs are already reliable. Let's focus on searching through them rather than improving them.

- ❌ Also deploy the SDK based on my openapi.
- ❌ Also deploy a link to docs in this website. Can be using that docs maker.
- ❌ Turn this website into a playground: For every endpoint, show a form, and documentation.
- The above would be distraction. **Focus on reducing time required to have quality api proxy**.

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

# Single OpenAPI homepage

If there's just one openapi, load the overview of that one by default from the homepage. No redirect!

Make a variation on the navigation that only shows the current openapi and a link to the homepage. Let's make `openapiforhumans.com/klippa` the place to have a single openapi without menu of others.

It'd be great to also have some customisation like logos, coloring, etc. Let's do this custom for Klippa now, and come up with how to do this automatically at build-time.

🎉 Now the menu is near-perfect, supporting single-api sites, multiple, and custom openapi adding. It should show the active one, and everything is super static and fast.

# Next.js Installation Problem

If we have `^0.0.5` or anything in our own packages, theres a big chance the package doesn't get updated to the latest version. Maybe this is `package-lock.json` at work? In this case, maybe there should be a predeploy that refreshes all packages to the latest version. This way we can be certain about the version number.
