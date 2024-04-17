import { fetchWithTimeout } from "./fetchWithTimeout";
import { OpenapiDocument } from "./types";
const openapis: { [url: string]: OpenapiDocument } = {};

/** Fetches openapi but with cache */
export const fetchOpenapi = async (openapiUrl: string | undefined) => {
  if (!openapiUrl) {
    return;
  }

  if (openapis[openapiUrl]) {
    // NB: cached in memory
    return openapis[openapiUrl];
  }

  const isYaml = openapiUrl.endsWith(".yaml");

  const { json, status, statusText, text } =
    await fetchWithTimeout<OpenapiDocument>(
      openapiUrl,
      {
        headers: isYaml
          ? undefined
          : {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
      },
      30000,
    );

  if (json) {
    // NB: set cache
    openapis[openapiUrl] = json;
  }

  return json || undefined;
};
