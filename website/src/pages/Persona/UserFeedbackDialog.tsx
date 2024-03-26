import { cn } from "@/lib/utils";
import React from "react";
import { DialogOverlay, DialogPortal } from "@/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export const UserFeedbackDialog = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    onFeedbackSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  }
>(({ onFeedbackSubmit, className, children, ...props }, ref) => {
  return (
    <DialogPortal>
      <DialogOverlay className="bg-black/75" />
      <DialogPrimitive.Content
        className={cn(
          "h-[50vh] min-h-[500px] fixed left-[50%] top-[50%] z-50 grid w-full max-w-4xl translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full",
          className
        )}
        ref={ref}
        {...props}
      >
        <form
          className="space-y-2 md:col-span-3 flex-1 flex flex-col"
          onSubmit={onFeedbackSubmit}
        >
          <h2 className="text-green-500 text-lg font-bold">
            What do you want to get out of Instant Personas?
          </h2>
          <p className="text-xs text-gray-600">
            Answer a quick question to help us improve your InstantPersonas!
          </p>

          <Textarea
            name="feedback"
            placeholder="I want to use Instant Personas to..."
            className=" h-full border-green-500"
          />

          <div className="flex space-x-4 w-full justify-end pt-2">
            <DialogPrimitive.Close asChild>
              <Button variant={"secondary"}>Close</Button>
            </DialogPrimitive.Close>
            <Button className="px-6" type="submit">
              Submit
            </Button>
          </div>
        </form>

        {children}
        <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  );
});
UserFeedbackDialog.displayName = "UserFeedbackDialog";
