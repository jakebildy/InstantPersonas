import { Link, useLocation } from "react-router-dom";
// import PromptArea from "../../components/Templates/ToolsPage/PromptArea";
import { cn } from "../../lib/utilities";
import {
  BanknotesIcon,
  BookmarkIcon,
  BriefcaseIcon,
  FireIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/solid";
import { Logo } from "../../components/Logo";
import { useUser } from "../../contexts/UserContext";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UseFormReturn, useForm } from "react-hook-form";
import api from "@/services/api.service";

const onBoardingFormSchema = z.object({
  role: z.string({
    required_error: "Please select an role.",
  }),
  toolExpectations: z.string().optional(),
});

type OnBoardingFormValues = z.infer<typeof onBoardingFormSchema>;

export default function OnBoarding() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const currentTab = (queryParams.get("tab") as TabKeys) || "about";
  const { user } = useUser();
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (user?.onboarded) {
      navigate("/home");
    }
  }, [navigate, user]);

  // 1. Define your form.
  const form = useForm<OnBoardingFormValues>({
    resolver: zodResolver(onBoardingFormSchema),
    mode: "onChange",
  });

  // 2. Define a submit handler.
  async function onSubmit(values: OnBoardingFormValues) {
    // ✅ This will be type-safe and validated.
    const onBoardingResponse = {
      user: user,
      response: values,
    };
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
            body: JSON.stringify(onBoardingResponse),
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
            console.error("Error setting user as onboarded:", error);
          }
        } else {
          console.error(
            "Failed to send response:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("An error occurred while sending the response:", error);
      }
      setSubmitting(false);
    }
    console.log("About to navigate");
    navigate("/home");
    console.log("Navigation should have occurred");
  }

  // 3. Define a function to handle tab changes.
  const formTabConfig = {
    about: {
      title: "General Information",
      component: <AboutComponent form={form} />,
    },
    feedback: {
      title: "How We Can Help",
      component: <FeedbackComponent form={form} submitting={submitting} />,
    },
  };

  type TabKeys = keyof typeof formTabConfig;

  if (!user) {
    return (
      <>
        <div className="w-screen h-screen absolute top-0 left-0 backdrop-blur-md z-10 overflow-hidden flex justify-center bg-gray-400/25" />
        <Backdrop />
      </>
    );
  }

  return (
    <>
      <div className="w-screen h-screen absolute top-0 left-0 backdrop-blur-md z-10 overflow-hidden flex justify-center bg-gray-400/25">
        <div className="bg-white m-20 w-full p-10 rounded-lg shadow-lg flex flex-wrap justify-center overflow-y-auto">
          <div className="w-full max-w-4xl">
            <div className="sm:flex mb-14">
              {Object.keys(formTabConfig).map((key) => (
                <TabMarker
                  key={key}
                  active={key === currentTab}
                  title={formTabConfig[key as TabKeys].title}
                  className="select-none"
                />
              ))}
            </div>
            <h1 className="text-3xl">{formTabConfig[currentTab]?.title}</h1>
            <p className="text-gray-400 font-medium text-sm py-2 border-b border-gray-200">
              Help us personalize your experience with a couple questions.
            </p>
            <div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  {formTabConfig[currentTab]?.component}
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
      <Backdrop />
    </>
  );
}

type FormTabProps = {
  form: UseFormReturn<OnBoardingFormValues>;
  submitting?: boolean;
};

// Separate component for the content of the first tab
const AboutComponent = ({ form }: FormTabProps) => {
  const navigate = useNavigate();
  const nextTab = "feedback";
  const jobTitles: string[] = [
    "Business Consultant",
    "Marketing Manager",
    "Founder",
    "Product Manager",
    "Financial Analyst",
    "Other",
  ];

  const placeholder = "Choose a role";

  return (
    <div className="my-10" role="tabpanel" aria-labelledby="help-tab">
      <FormField
        control={form.control}
        name="role"
        render={({ field }) => (
          <FormItem>
            <FormDescription className="text-gray-400 text-xs py-2">
              1. Role
            </FormDescription>
            <FormLabel className="text-gray-900 text-md font-semibold my-2">
              Which Role Best Describes You?
            </FormLabel>

            <Select
              onValueChange={field.onChange}
              defaultValue={field.value != "" ? field.value : placeholder}
            >
              <FormControl>
                <SelectTrigger className="w-full max-w-lg">
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectGroup>
                  {jobTitles.map((title) => (
                    <SelectItem value={title} key={title}>
                      {title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* <Button type="submit">Submit</Button> */}
      <div className="w-full flex justify-end mt-20">
        {form.getFieldState("role").isDirty && (
          <Button onClick={() => navigate(`?tab=${nextTab}`)}>Next</Button>
        )}
      </div>
    </div>
  );
};

// Separate component for the content of the second tab
const FeedbackComponent = ({ form, submitting }: FormTabProps) => {
  const navigate = useNavigate();
  return (
    <div className="my-10" role="tabpanel" aria-labelledby="help-tab">
      <FormField
        control={form.control}
        name="toolExpectations"
        render={({ field }) => (
          <FormItem>
            <FormDescription className="text-gray-400 text-xs py-2">
              2. Help us Improve
            </FormDescription>
            <FormLabel className="text-gray-900 text-md font-semibold my-2">
              What do you want to get out of Instant Personas?
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder="I want to use Instant Personas to..."
                className="min-h-[200px] max-h-fit resize-none"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="w-full flex justify-between mt-20">
        <div className="flex">
          <button className="text-sm" onClick={() => navigate(`?tab=about`)}>
            Back
          </button>
        </div>
        <div className="flex gap-8">
          <button className="text-sm" type="submit">
            Skip
          </button>
          <Button type="submit" variant={submitting ? "disabled" : "green"}>
            {submitting ? (
              <span className="animate-pulse">Submitting...</span>
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

type TabMarkerProps = React.HTMLAttributes<HTMLDivElement> & {
  active: boolean;
  title: string;
};

const TabMarker = ({ active, title, className, ...props }: TabMarkerProps) => (
  <div className="flex items-center mr-4" {...props}>
    <div
      className={cn(
        active ? "bg-green-400" : "bg-gray-400",
        "w-2 h-2 min-h-2 min-w-2 rounded-full"
      )}
    />
    <h2
      className={cn(
        active ? "text-green-400 font-semibold" : "text-gray-400 font-normal",
        " text-sm px-2",
        className
      )}
    >
      {title}
    </h2>
  </div>
);

const Backdrop = () => {
  const { user, refreshUser } = useUser();
  useEffect(() => {
    refreshUser();
  }, []);
  const navigation = [
    { name: "Consulting Tools", href: "/tools", icon: BriefcaseIcon },
    { name: "History", href: "/history", icon: BookmarkIcon },
    { name: "Subscription", href: "/subscription", icon: BanknotesIcon },
    { name: "Become an Affiliate", href: "/affiliate", icon: FireIcon },
    {
      name: "Send Feedback",
      href: "https://forms.gle/7JRsj2FxffD3Uofm9",
      icon: PencilSquareIcon,
    },
  ];
  return (
    <div className="overflow-hidden">
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
        <div
          className="flex grow flex-col gap-y-5 overflow-y-auto bg-[#232325] px-3"
          style={{ fontFamily: "Jost" }}
        >
          <title>Instant Personas | Dashboard</title>
          <div className="flex h-16 shrink-0 items-center">
            <p className="text-xl font-bold text-white flex">
              <Logo className="h-7 w-8 bg-cover object-contain mr-2" />
              Instant Personas
            </p>
          </div>

          <nav className="flex flex-1 flex-col px-3">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className={cn(
                          item.name == "Consulting Tools"
                            ? "bg-white/20 text-white"
                            : "text-slate-200 hover:text-white hover:bg-black/70",
                          "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold select-none"
                        )}
                      >
                        <item.icon
                          className={cn(
                            item.name == "Consulting Tools"
                              ? "text-green-400"
                              : "text-slate-200 group-hover:text-white",
                            "h-6 w-6 shrink-0"
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              <li className="-mx-6 mt-auto">
                <a
                  href=""
                  className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-indigo-700"
                >
                  <span className="sr-only">Your profile</span>
                  <span aria-hidden="true">{user?.email}</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <h1 className="my-10 text-3xl font-bold tracking-tight text-gray-900 text-center">
        Consulting Tools
      </h1>
      {/* <PromptArea /> */}
    </div>
  );
};
