"use client";

import { OperationDetails, OperationPage } from "openapi-for-humans-react";

export const NextOperationPage = (props: {
  operationDetails: OperationDetails;
  openapiUrl: string;
}) => {
  const { operationDetails, openapiUrl } = props;

  // TODO: Fill it from query parameters (can this be done serverside?)
  const exampleIndex = undefined;
  const runId = undefined;

  return (
    <OperationPage
      openapiUrl={openapiUrl}
      operationDetails={operationDetails}
      state={{ exampleIndex, runId }}
      setState={(state) => {}}
    />
  );
};
