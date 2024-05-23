"use client";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CodeInput } from "./code-block";

// Handle copying the code to the clipboard with toast notifications
export const useHandleCopyCode = () => {
  function handleCopyCode(text: string) {
    // Check if the text is empty or just whitespace
    if (!text || text.trim() === "") {
      toast({
        variant: "destructive",
        title: "Uh oh! Missing code.",
        description: "Looks like there was no code to copy.",
        action: <ToastAction altText="Try again">Try again?</ToastAction>,
      });
      // Log the error for debugging purposes, instead of throwing an error
      console.error("No code to copy. Received text:", text);
      return; // Exit the function here
    }

    // Attempt to copy to clipboard
    try {
      window.navigator.clipboard.writeText(text);
      toast({
        title: "Code Copied to Clipboard",
        // description: (
        //   <ScrollArea className="h-[200px] w-full">
        //     <CodeInput code={text} />
        //   </ScrollArea>
        // ),
      });
    } catch (error) {
      // Handle Clipboard API errors
      toast({
        variant: "destructive",
        title: "Copy Failed",
        description: "Failed to copy code to clipboard.",
      });
      // Log the error for debugging purposes
      console.error("Error copying to clipboard:", error);
    }
  }

  return { handleCopyCode };
};
