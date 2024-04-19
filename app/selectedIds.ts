export const selectedIds = process.env.SELECTED_OPENAPI_IDS?.split(",")
  .map((x) => x.trim())
  .filter((x) => x !== "");
