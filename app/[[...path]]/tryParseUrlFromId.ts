export const tryParseUrlFromId = (openapiId: string | undefined) => {
  if (!openapiId) {
    return undefined;
  }

  try {
    const urlObject = new URL("https://" + decodeURIComponent(openapiId));

    return urlObject.href;
  } catch (e) {
    return;
  }
};
