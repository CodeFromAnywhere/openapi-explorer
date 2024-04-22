"use client";

import revalidateOpenapi from "./revalidateOpenapi";
import { MatchingText, OpenapiDetails } from "openapi-for-humans-react";
import { useState } from "react";
import Markdown from "react-markdown";

export const OpenapiOverviewPage = (props: {
  openapiDetails: OpenapiDetails;
}) => {
  const { openapiDetails } = props;

  const [search, setSearch] = useState("");

  const filteredOperations =
    !search || search.trim() === ""
      ? openapiDetails.operations
      : openapiDetails.operations.filter(
          (item) =>
            !search ||
            item.id.toLowerCase().includes(search.toLowerCase()) ||
            item.operation.summary
              ?.toLowerCase()
              .includes(search.toLowerCase()),
        );

  const links = [
    {
      title: "Swagger",
      url: `https://petstore.swagger.io/?url=${openapiDetails.openapiUrl}`,
    },
    {
      title: "Swagger Editor",
      url: `https://editor.swagger.io/?url=${openapiDetails.openapiUrl}`,
    },
    {
      title: "OpenAPI GUI",
      url: `https://mermade.github.io/openapi-gui/?url=${openapiDetails.openapiUrl}`,
    },
    {
      title: "Stoplight",
      url: `https://elements-demo.stoplight.io/?spec=${openapiDetails.openapiUrl}`,
    },
    {
      title: "Source",
      url: openapiDetails.openapiUrl,
    },
  ];

  return (
    <div className="p-20">
      <h1 className="text-3xl">{openapiDetails.document.info?.title}</h1>

      <div className="flex flex-row flex-wrap">
        {links.map((link) => {
          return (
            <a
              className="pr-6 text-blue-500 hover:text-blue-600"
              href={link.url}
              key={link.url}
            >
              {link.title}
            </a>
          );
        })}
        <button
          onClick={() => {
            revalidateOpenapi(openapiDetails.openapiUrl);
          }}
        >
          Refresh
        </button>
      </div>

      <div className="my-10">
        <Markdown>{openapiDetails.document.info.description}</Markdown>
      </div>

      <p className="">Operations:</p>

      <input
        type="text"
        placeholder="Search"
        className="p-2 m-2  bg-transparent"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ul className="py-10">
        {filteredOperations.map((item) => {
          return (
            <li
              className="list-disc list-inside"
              key={item.operation.operationId}
            >
              <a href={`/${openapiDetails.openapiId}/${item.id}`}>
                <MatchingText
                  search={search || ""}
                  text={`${item.id} - ${item.operation.summary}`}
                  defaultTextClassName=""
                  matchTextClassName="text-blue-500"
                />
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
