"use client";
import { OperationDetails, OperationPage } from "openapi-for-humans-react";
import { FormContext } from "openapi-util";

export const NextOperationPage = (props: {
  operationDetails: OperationDetails;
  openapiUrl: string;
  formContext: FormContext;
}) => {
  const { operationDetails, openapiUrl, formContext } = props;

  return (
    <OperationPage
      openapiUrl={openapiUrl}
      operationDetails={operationDetails}
      formContext={formContext}
    />
  );
};
