"use client";

import { useParams } from "next/navigation";
import { OperationPage } from "openapi-for-humans-react";
import { fetchOpenapi } from "from-anywhere";

const tryParseUrlFromId = (openapiId: string | undefined) => {
  if (!openapiId) {
    return undefined;
  }

  try {
    const urlObject = new URL("https://" + openapiId);

    return urlObject.href;
  } catch (e) {
    return;
  }
};

const Homepage = async () => {
  const { path } = useParams();
  const realPath = Array.isArray(path)
    ? (path as (string | undefined)[])
    : [path];

  const operationId = realPath.pop();

  const openapiId = realPath.join("/");

  const openapiUrlObject = {
    ["serper-dev"]: "https://serper-dev.actionschema.com/openapi.json",
    replicate: "https://api.replicate.com/openapi.json",
  };

  const openapiUrl =
    openapiId && Object.keys(openapiUrlObject).includes(openapiId)
      ? openapiUrlObject[openapiId as keyof typeof openapiUrlObject]
      : tryParseUrlFromId(openapiId);

  const openapi = await fetchOpenapi(openapiUrl);
  const exampleIndex = undefined;
  const runId = undefined;

  return (
    <div>
      {openapi && operationId ? (
        <OperationPage
          openapi={openapi}
          operationId={operationId}
          state={{ exampleIndex, runId }}
          setState={(state) => {}}
        />
      ) : (
        <div>No openapi/operation</div>
      )}
    </div>
  );
};

export default Homepage;
