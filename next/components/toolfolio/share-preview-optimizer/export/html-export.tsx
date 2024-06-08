import { useHandleCopyCode } from "@/components/ui/fcs/handle-copy-code";
import { OGPreviewMetadata } from "../social-share-tool";
import { GetDomainFromString } from "../utils";
import { Button } from "@/components/ui/button";
import { CopyIcon } from "@radix-ui/react-icons";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { CodeInput } from "@/components/ui/fcs/code-block";

export function HtmlExportPreview({
  url,
  title,
  description,
  image,
}: OGPreviewMetadata) {
  const domain = GetDomainFromString(url);
  const { handleCopyCode } = useHandleCopyCode();

  const htmlCode = `<!-- HTML Meta Tags -->
<title>${title}</title>
<meta name="description" content="${description}">

<!-- Facebook Meta Tags -->
<meta property="og:url" content="${url}">
<meta property="og:type" content="website">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:image" content="${image}">

<!-- Twitter Meta Tags -->
<meta name="twitter:card" content="summary_large_image">
<meta property="twitter:domain" content="${domain}">
<meta property="twitter:url" content="${url}">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${description}">
<meta name="twitter:image" content="${image}">

<!-- Meta Tags Generated & Optimized via https://www.instantpersonas.com -->`;

  return (
    <div className="relative flex w-full flex-col items-center gap-4 rounded-md p-4">
      <Button
        variant={"blue"}
        onClick={() => handleCopyCode(htmlCode ?? "")}
        className="group peer order-2 flex w-full flex-1 gap-2"
      >
        <CopyIcon className="text-white group-hover:text-slate-100" /> Copy to
        Clipboard
      </Button>

      <ScrollArea className="order-1 w-full overflow-hidden rounded-md bg-white p-2 text-xs text-black/70 shadow-md transition-all duration-200 ease-out peer-hover:opacity-25 lg:max-w-none">
        <CodeInput code={htmlCode ?? "No code"} theme="slack-ochin" />
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <div className="absolute left-1/2 top-1/2 z-50 order-3 hidden -translate-x-1/2 -translate-y-1/2 cursor-pointer place-items-center gap-2 transition-all duration-200 ease-linear peer-hover:grid">
        <CopyIcon className="h-4 w-4 animate-pulse" tabIndex={0} />
        <p className="w-full text-center text-xs text-black/60 md:w-[350px]">
          Click to copy code
        </p>
      </div>
    </div>
  );
}
