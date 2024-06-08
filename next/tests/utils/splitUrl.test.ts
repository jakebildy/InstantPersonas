import { splitUrl } from "@/components/toolfolio/share-preview-optimizer/utils";

describe("splitUrl", () => {
  test("splits basic URL with resource", () => {
    expect(splitUrl("https://www.example.com/test/quiz")).toEqual([
      "https://www.example.com/test/",
      "quiz",
    ]);
  });

  test("handles URL without a protocol", () => {
    expect(splitUrl("www.domain.com")).toEqual(["http://www.domain.com", ""]);
  });

  test("handles URL with trailing slash", () => {
    expect(splitUrl("https://www.domain.com/")).toEqual([
      "https://www.domain.com",
      "",
    ]);
  });

  test("handles domain only", () => {
    expect(splitUrl("domain.com")).toEqual(["http://domain.com", ""]);
  });

  test("splits URL with path ending in slash", () => {
    expect(splitUrl("www.example.com/some/path/")).toEqual([
      "http://www.example.com/some/",
      "path",
    ]);
  });

  test("splits URL with query parameters", () => {
    expect(splitUrl("https://www.example.com/search?query=test")).toEqual([
      "https://www.example.com/",
      "search",
    ]);
  });

  test("splits URL with hash fragment", () => {
    expect(splitUrl("https://www.example.com/info#section")).toEqual([
      "https://www.example.com/",
      "info",
    ]);
  });

  test("splits URL with both query parameters and hash fragment", () => {
    expect(
      splitUrl("https://www.example.com/shop/item?color=blue#details"),
    ).toEqual(["https://www.example.com/shop/", "item"]);
  });

  test("handles URL with port and path", () => {
    expect(splitUrl("https://www.example.com:8080/settings/profile")).toEqual([
      "https://www.example.com:8080/settings/",
      "profile",
    ]);
  });

  test("handles URL with username and password", () => {
    expect(splitUrl("https://user:pass@www.example.com/settings")).toEqual([
      "https://www.example.com/",
      "settings",
    ]);
  });

  test("handles URL with a complex path", () => {
    expect(
      splitUrl("https://www.example.com/some/very/deep/nested/path/"),
    ).toEqual(["https://www.example.com/some/very/deep/nested/", "path"]);
  });
});
