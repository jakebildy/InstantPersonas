import { cn } from "@/lib/utils";
import React from "react";
import { DialogOverlay, DialogPortal } from "@/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const SubscriptionTrialDialog = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => {
  const navigate = useNavigate();
  return (
    <DialogPortal>
      <DialogOverlay className="bg-black/75" />
      <DialogPrimitive.Content
        className={cn(
          "fixed left-[50%] top-[50%] z-50 grid w-full max-w-2xl translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full",
          className
        )}
        ref={ref}
        {...props}
      >
        <div className="grid place-items-center md:grid-cols-5 gap-4">
          <div className="w-[200px] h-[200px] md:col-span-2">
            <img
              src="/affiliate.jpg"
              alt="free subscription"
              className="object-contain"
            />
          </div>
          <div className="space-y-4 md:col-span-3">
            <h2 className="text-lg font-bold text-gray-800">
              Take Your Chats Further: Try InstantPersona's Premium Access!
            </h2>
            <p className="text-sm text-gray-600">
              To use Persona Chat, you need to subscribe to our service, or
              check out our free 3 day trial.
            </p>
            <div className="flex space-x-4">
              <DialogPrimitive.Close asChild>
                <Button variant={"secondary"}>Close</Button>
              </DialogPrimitive.Close>
              <Button
                className="px-6"
                onClick={() => navigate("/subscription")}
              >
                Try Now!
              </Button>
            </div>
          </div>
        </div>
        {children}
        <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  );
});
SubscriptionTrialDialog.displayName = "SubscriptionTrialDialog";
