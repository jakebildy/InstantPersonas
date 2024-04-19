import { cn } from "@/lib/utils";
import React from "react";
import { DialogOverlay, DialogPortal } from "@/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import "../../App.css";
import api from "@/services/api.service";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const UserFeedbackDialog = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    onFeedbackSubmit: () => void;
  }
>(({ onFeedbackSubmit, className, children, ...props }, ref) => {
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
  const [submitting, setSubmitting] = React.useState(false);

  // const options = ["One", "Two to four", "5 to 10", "10 to 20", "20+"];

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
        <div className="flex flex-col h-full justify-between">
          <div className="flex-1 flex flex-col mb-5">
            <h2 className="text-green-500 text-xl font-bold mb-5">
              Can you describe the key deliverables you produce that are
              critical for both internal collaboration and external client
              engagement?
            </h2>
            <div className="w-full flex flex-col items-center gap-1.5 flex-1">
              <Label htmlFor="deliverables" className="sr-only">
                Can you describe the key deliverables you produce that are
                critical for both internal collaboration and external client
                engagement?
              </Label>
              <Textarea
                id="deliverables"
                placeholder="My most valuable core key deliverables are..."
                className="w-full flex-1 placeholder:text-slate-700 shadow-lg"
                value={selectedOptions[0]}
                onChange={(e) =>
                  setSelectedOptions([
                    e.target.value,
                    ...selectedOptions.slice(1),
                  ])
                }
              />
            </div>
          </div>
          {/* {...options.map((option) => (
            <div className="flex flex-row">
              <Checkbox.Root
                className="CheckboxRoot"
                defaultChecked
                id={option}
                checked={selectedOptions.includes(option)}
                onCheckedChange={
                  selectedOptions.includes(option)
                    ? () =>
                        setSelectedOptions(
                          selectedOptions.filter((o) => o !== option)
                        )
                    : () => setSelectedOptions([...selectedOptions, option])
                }
                style={
                  selectedOptions.includes(option)
                    ? {
                        backgroundColor: "green",
                        boxShadow: "none",
                        marginRight: "10px",
                        marginBottom: "10px",
                      }
                    : { marginRight: "10px", marginBottom: "10px" }
                }
              >
                <Checkbox.Indicator className="CheckboxIndicator">
                  <CheckIcon />
                </Checkbox.Indicator>
              </Checkbox.Root>
              <label className="Label" htmlFor={option}>
                {option}
              </label>
            </div>
          ))} */}
          <div className="flex space-x-4 w-full justify-end pt-2">
            <DialogPrimitive.Close asChild>
              <Button variant={"secondary"}>Close</Button>
            </DialogPrimitive.Close>
            <Button
              className="px-6"
              type="submit"
              onClick={async () => {
                if (!submitting) {
                  try {
                    setSubmitting(true);
                    const response = await fetch(
                      "https://hook.us1.make.com/nbx94dpphesjvgad4067yl0nyot2rscy",
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ options: selectedOptions }),
                      }
                    );
                    //? Uncomment to test loading state
                    // await new Promise((resolve) => setTimeout(resolve, 10000));
                    if (response.ok) {
                      console.log("Response sent successfully");
                      try {
                        console.log("pending set as onboarded");
                        const onboardedResponse = await api.auth.setOnBoarded();
                        console.log("set as onboarded finished");
                        if (onboardedResponse.ok) {
                          console.log("User set as onboarded");
                        }
                      } catch (error) {
                        console.error(
                          "Error setting user as onboarded:",
                          error
                        );
                      }
                    } else {
                      console.error(
                        "Failed to send response:",
                        response.status,
                        response.statusText
                      );
                    }
                  } catch (error) {
                    console.error(
                      "An error occurred while sending the response:",
                      error
                    );
                  }
                  setSubmitting(false);
                  onFeedbackSubmit();
                }
              }}
            >
              Submit
            </Button>
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
UserFeedbackDialog.displayName = "UserFeedbackDialog";
