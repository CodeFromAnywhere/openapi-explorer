import Link from "next/link";
import {
  OpenapiExplorer,
  getOpenapisOperations,
} from "openapi-for-humans-react";
import { openapiUrlObject } from "../openapiUrlObject";
import { selectedIds } from "../selectedIds";
import { generateStaticParamsForOperations } from "../generateStaticParamsForOperations";
import { ScrollToActiveOperation } from "../ScrollToActiveOperation";

export const dynamicParams = true;
export const generateStaticParams = generateStaticParamsForOperations;
export default async function PathLayout(props: {
  children: any;
  params: { path?: string | (string | undefined)[] };
}) {
  const { children, params } = props;

  const openapis = await getOpenapisOperations(openapiUrlObject, selectedIds);
  const [openapiId, operationId] =
    params?.path && Array.isArray(params.path)
      ? params.path
      : typeof params.path === "string"
      ? [params.path]
      : [];

  return (
    <div>
      <div className="lg:grid lg:grid-cols-4">
        <nav className="max-lg:w-full col-span-1 lg:h-screen lg:overflow-y-scroll border-gray-500 border-r-2">
          <OpenapiExplorer
            LinkComponent={Link}
            onRefreshOpenapis={(openapiIds) => {
              // should refresh these api(s) - which is likely 1 or all
            }}
            lastSearchResults={[]}
            onSubmitSearch={() => {
              // todo
            }}
            openapis={openapis}
            openapiId={openapiId}
            operationId={operationId}
          />
          {/* Needed to scroll active-operation into view upon pageload */}
          <ScrollToActiveOperation />
        </nav>

        <div className="relative lg:h-screen lg:overflow-y-scroll col-span-3">
          {children}

          <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]"></div>
        </div>
      </div>
    </div>
  );
}
