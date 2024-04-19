export const tryParseUrlFromId = (openapiId: string) => {
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
