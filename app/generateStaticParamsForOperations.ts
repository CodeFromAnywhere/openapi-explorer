import {
  OpenapiListItem,
  getOpenapisOperations,
} from "openapi-for-humans-react";
import { selectedIds } from "./selectedIds";

/**
 * NB: openapi must be defined to show this page (otherwise, homepage is shown)
 *
 * However, the operation need not be defined, and can be undefined.
 */
export type PathParam = (string | undefined)[];

export const fetchList = async () => {
  try {
    const list = await fetch("https://list.dataman.ai/list.json", {
      cache: "no-cache",
    }).then((res) => res.json() as Promise<OpenapiListItem[]>);
    return list;
  } catch (e) {
    console.log(e);
    return undefined;
  }
};
/**
 * Returns static params for any component to render with all these params
 *
 * Returns params for each operation that is selected
 */
export const generateStaticParamsForOperations = async () => {
  const list = await fetchList();
  if (!list) {
    return [];
  }

  //const openapis = await getOpenapisOperations(list, selectedIds);
  const params = list.map((item) => {
    // const openapiParams: {
    //   path?: PathParam;
    // }[] = item.operations.map((item) => {
    //   const { operation, path, method, openapiId } = item;
    //   // NB: operationId is not required, so we need to use path=method as unique identifier incase there isn't one
    //   const operationId = operation.operationId || `${path}=${method}`;

    //   const pathParam: PathParam = [openapiId, operationId];

    //   return { path: pathParam };
    // });

    // NB: Add the route where there's no operation defined.
    const res: {
      path?: PathParam;
    }[] = [{ path: [item.key, undefined] }];

    return res;
  });

  return params.concat([{}]);
};
