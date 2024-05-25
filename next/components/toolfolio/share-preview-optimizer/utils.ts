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
