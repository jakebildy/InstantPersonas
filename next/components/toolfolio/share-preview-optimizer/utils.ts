export function GetDomainFromString(url: string) {
  if (!url) {
    return "";
  }

  const domainParts = url
    .replace("https://", "")
    .replace("http://", "")
    .split(".");

  let domain = domainParts[0] + (domainParts[1] ? "." + domainParts[1] : "");
  return domain;
}

export function b64toBlob({
  b64Data,
  contentType = "",
  sliceSize = 512,
}: {
  b64Data: string;
  contentType?: string;
  sliceSize?: number;
}) {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
}

/**
 * Splits a URL into its base URL and the last part of its path.
 *
 * @param {string} inputUrl - The URL to be split.
 * @returns {[string, string]} - A tuple where the first element is the base URL and the second element is the last path segment.
 */
export function splitUrl(inputUrl: string): [string, string] {
  // Ensure the URL has a protocol; if not, prepend 'http://'
  if (!inputUrl.match(/^https?:\/\//)) {
    inputUrl = "http://" + inputUrl;
  }

  // Parse the URL to access various components
  const parsedUrl = new URL(inputUrl);

  // Extract hostname (and port if any), protocol, pathname
  const protocol = parsedUrl.protocol;
  const host = parsedUrl.host;
  const path = parsedUrl.pathname;

  // Normalize path to remove any trailing slash for consistency
  const normalizedPath = path.replace(/\/$/, "");

  // Split the path into parts
  const pathParts = normalizedPath.split("/").filter((part) => part !== "");

  // Determine the last part of the path
  const lastPathSegment = pathParts.pop() || "";

  // Conditionally add a trailing slash to the base URL only if there are remaining path parts
  const baseUrl = `${protocol}//${host}${
    pathParts.length > 0
      ? "/" + pathParts.join("/") + "/"
      : lastPathSegment
      ? "/"
      : ""
  }`;

  return [baseUrl, lastPathSegment];
}
