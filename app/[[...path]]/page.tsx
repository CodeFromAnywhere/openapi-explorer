import {
  OpenapiListItem,
  OpenapiOverviewPage,
  getOpenapiOperations,
} from "openapi-for-humans-react";
import { Metadata, ResolvingMetadata } from "next";
import { tryParseUrlFromId } from "./tryParseUrlFromId";
import {
  fetchList,
  generateStaticParamsForOperations,
} from "../generateStaticParamsForOperations";
import { Homepage } from "./Homepage";
import { NextOperationPage } from "./NextOperationPage";

type HomepageProps = {
  params?: { path: PathParam };
  searchParams: { query?: string };
};

/**
 * See: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata(
  props: HomepageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { params, searchParams } = props;
  const openapiId = params?.path?.[0];
  const list = await fetchList();
  const openapiUrl = getOpenapiUrl(openapiId, list || []);
  const defaultMetadata = {
    title: "OpenAPI for Humans",
    description:
      "OpenAPI for Humans combines multiple OpenAPIs in a fast, organized, and searchable interface.",
  };
  if (!openapiId || !openapiUrl) {
    return defaultMetadata;
  }

  const openapiDetails =
    openapiId && openapiUrl
      ? await getOpenapiOperations(openapiId, openapiUrl)
      : undefined;
  if (!openapiDetails) {
    return defaultMetadata;
  }

  const operationId = params?.path?.[1];

  const operation = operationId
    ? openapiDetails.operations.find((x) => x.id === operationId)?.operation
    : undefined;

  const description = operation
    ? operation.description || operation.summary
    : openapiDetails.document.info.description;

  return {
    title: operationId ? `${openapiId} - ${operationId}` : openapiId,
    description,
    openGraph: { images: openapiDetails.document.info?.branding?.logoImageUrl },
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
type PathParam = [string | undefined, string | undefined];

/**
 * https://nextjs.org/docs/app/api-reference/functions/generate-static-params#generate-only-a-subset-of-params
 */
export const generateStaticParams = generateStaticParamsForOperations;

const getOpenapiUrl = (
  openapiId: string | undefined,
  list: OpenapiListItem[],
) => {
  const key = list.find((x) => x.key === openapiId)?.key;
  if (!key) {
    return tryParseUrlFromId(openapiId);
  }

  return `https://${key}.dataman.ai/${key}.json`;
};

const Pathpage = async (props: HomepageProps) => {
  const openapiId = props?.params?.path?.[0];
  const operationId = props?.params?.path?.[1];
  const list = await fetchList();
  const openapiUrl = getOpenapiUrl(openapiId, list || []);

  if (!openapiId || !openapiUrl) {
    return <Homepage />;
  }

  const openapiDetails =
    openapiId && openapiUrl
      ? await getOpenapiOperations(openapiId, openapiUrl)
      : undefined;

  const operationDetails = operationId
    ? openapiDetails?.operations?.find((x) => x.id === operationId)
    : undefined;

  return (
    <div>
      {openapiDetails ? (
        operationDetails ? (
          <NextOperationPage operationDetails={operationDetails} />
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

export default Pathpage;
