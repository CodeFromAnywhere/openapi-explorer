import { getOpenapisOperations } from "openapi-for-humans-react";
import { openapiUrlObject } from "./openapiUrlObject";
import { selectedIds } from "./selectedIds";

/**
 * NB: openapi must be defined to show this page (otherwise, homepage is shown)
 *
 * However, the operation need not be defined, and can be undefined.
 */
export type PathParam = (string | undefined)[];

/** Returns static params for any component to render with all these params
 *
 * Returns params for each operation that is selected
 */
export const generateStaticParamsForOperations = async () => {
  const openapis = await getOpenapisOperations(openapiUrlObject, selectedIds);
  const params = openapis.map((item) => {
    const openapiParams: {
      path?: PathParam;
    }[] = item.operations.map((item) => {
      const { operation, path, method, openapiId } = item;
      // NB: operationId is not required, so we need to use path=method as unique identifier incase there isn't one
      const operationId = operation.operationId || `${path}=${method}`;

      const pathParam: PathParam = [openapiId, operationId];

      return { path: pathParam };
    });

    // NB: Add the route where there's no operation defined.
    return openapiParams.concat([{ path: [item.openapiId, undefined] }]);
  });

  return params.concat([{}]);
};
