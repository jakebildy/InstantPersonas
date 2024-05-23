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
    <div className="rounded-md relative w-full gap-4 flex flex-col p-4">
      <Button
        variant={"blue"}
        onClick={() => handleCopyCode(htmlCode ?? "")}
        className="flex gap-2 flex-1 peer order-2 group"
      >
        <CopyIcon className="group-hover:text-slate-100 text-white" /> Copy to
        Clipboard
      </Button>

      <ScrollArea className="order-1 text-xs text-black/70 peer-hover:opacity-25 transition-all duration-200 ease-out w-full p-2 bg-white rounded-md overflow-hidden shadow-md">
        <CodeInput code={htmlCode ?? "No code"} theme="slack-ochin" />
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <div className="order-3  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden z-50 transition-all duration-200 ease-linear peer-hover:grid place-items-center gap-2 cursor-pointer">
        <CopyIcon className="animate-pulse h-4 w-4" tabIndex={0} />
        <p className="w-full md:w-[350px] text-center text-xs text-black/60">
          Click to copy code
        </p>
      </div>
    </div>
  );
}
