export function GetDomainFromString(url: string) {
  try {
    const domain = new URL(url).hostname;
    return domain;
  } catch (error) {
    const domain = url.split("/")[2];
    return domain;
  }
}
