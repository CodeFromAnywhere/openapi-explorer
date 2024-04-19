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

- Add information about docs, signup, pricing, etc in the openapi spec and fill it in nicely for serper.dev
- Add information on how to auth (for now, require the user to make their token in serper.dev and pay there)
- Other APIs to proxy: Induced, Scrapingbee, OpenAI, PlayHT, Deepgram, Fly.io, etc etc. Contact every API owner by applying to a position with open email about OpenAPIs. Then go into interview and show them the value I created already.
- ❌ Also deploy the SDK based on my openapi.
- ❌ Also deploy a link to docs in this website. Can be using that docs maker.
- ❌ Turn this website into a playground: For every endpoint, show a form, and documentation.
- The above would be distraction. **Focus on reducing time required to have quality api proxy**.
