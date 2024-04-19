import {
  OperationPage,
  OpenapiOverviewPage,
  getOpenapisOperations,
  getOpenapiOperations,
} from "openapi-for-humans-react";
import { OpenapiOperationObject, fetchOpenapi, notEmpty } from "from-anywhere";
import { Metadata, ResolvingMetadata } from "next";
import { tryParseUrlFromId } from "./tryParseUrlFromId";
import { openapiUrlObject } from "../openapiUrlObject";
import { selectedIds } from "../selectedIds";

type HomepageProps = { params: { path: PathParam }; searchParams: {} };

/**
 * See: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata(
  props: HomepageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const {
    params: {
      path: [openapiId, operationId],
    },
    searchParams,

    ...rest
  } = props;

  console.log({ rest, searchParams, openapiId, operationId });
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: "JOEPIE",
    openGraph: {
      images: ["/some-specific-page-image.jpg", ...previousImages],
    },
  };
}

/**
 * https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamicparams
 */
export const dynamicParams = true;

/**
 * NB: openapi must be defined to show this page (otherwise, homepage is shown)
 *
 * However, the operation need not be defined, and can be undefined.
 */
type PathParam = [string, string | undefined];

/**
 * https://nextjs.org/docs/app/api-reference/functions/generate-static-params#generate-only-a-subset-of-params
 */
export const generateStaticParams = async () => {
  const openapis = await getOpenapisOperations(openapiUrlObject, selectedIds);
  const params = openapis.map((item) => {
    const openapiParams: {
      path: PathParam;
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

  return params;
};

const Homepage = async (props: HomepageProps) => {
  const {
    params: {
      path: [openapiId, operationId],
    },
  } = props;

  const openapiUrl = Object.keys(openapiUrlObject).includes(openapiId)
    ? openapiUrlObject[openapiId as keyof typeof openapiUrlObject]
    : tryParseUrlFromId(openapiId);

  // TODO: Is this cached? https://nextjs.org/docs/app/building-your-application/caching#request-memoization
  const openapiDetails = openapiUrl
    ? await getOpenapiOperations(openapiId, openapiUrl)
    : undefined;

  // TODO: Fill it from query parameters (can this be done serverside?)
  const exampleIndex = undefined;
  const runId = undefined;

  const operationDetails = operationId
    ? openapiDetails?.operations?.find((x) => x.id === operationId)
    : undefined;

  return (
    <div>
      {openapiDetails ? (
        operationDetails ? (
          <OperationPage
            operationDetails={operationDetails}
            state={{ exampleIndex, runId }}
            setState={(state) => {}}
          />
        ) : (
          <OpenapiOverviewPage openapiDetails={openapiDetails} />
        )
      ) : (
        <div>
          No openapi found even though it should be available. Likely fetch
          failed?
        </div>
      )}
    </div>
  );
};

export default Homepage;
