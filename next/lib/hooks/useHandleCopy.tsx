import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { capitalizeFirstLetter } from "@/lib/utils";

// Handle copying the code to the clipboard with toast notifications
export const useHandleCopy = () => {
  function handleCopy({ type, text }: { type: string; text: string }) {
    const parsedText = text.replace(/\\n/g, "\n");
    // Check if the text is empty or just whitespace
    if (!text || text.trim() === "") {
      toast({
        variant: "destructive",
        title: `Uh oh! Missing ${capitalizeFirstLetter(type)}.`,
        description: `Looks like there was no ${type} to copy.`,
        action: <ToastAction altText="Try again">Try again?</ToastAction>,
      });
      // Log the error for debugging purposes, instead of throwing an error
      console.error(`No ${type} to copy. Received text:`, parsedText);
      return; // Exit the function here
    }

    // Attempt to copy to clipboard
    try {
      window.navigator.clipboard.writeText(parsedText);
      toast({
        title: `${capitalizeFirstLetter(type)} Copied to Clipboard`,
        description: (
          <ScrollArea className="h-[200px] w-full">
            <pre className="text-wrap whitespace-pre break-words">
              {parsedText}
            </pre>
          </ScrollArea>
        ),
      });
    } catch (error) {
      // Handle Clipboard API errors
      toast({
        variant: "destructive",
        title: "Copy Failed",
        description: `Failed to copy ${type} to clipboard.`,
      });
      // Log the error for debugging purposes
      console.error("Error copying to clipboard:", error);
    }
  }

  return { handleCopy };
};
