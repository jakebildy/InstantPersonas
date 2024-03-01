export type TextQuestion = {
  category?: string;
  question: string;
  response_type: "text";
  placeholder?: string;
};

export type NumberQuestion = {
  category?: string;
  question: string;
  response_type: "number";
  placeholder?: string;
};

export type SelectQuestion = {
  category?: string;
  question: string;
  response_type: "select";
  options: string[];
  placeholder?: string;
};

export type SurveyQuestion = TextQuestion | NumberQuestion | SelectQuestion;

export const genericQuestions: SurveyQuestion[] = [
  {
    question: "What is the core problem your business aims to solve?",
    response_type: "text",
    placeholder: "We aim to solve...",
    category: "Mission & Vision",
  },
  {
    question: "How do you generate revenue?",
    response_type: "select",
    options: ["Subscription", "One-time purchase", "Freemium", "Ads"],
    placeholder: "Select a revenue model",
    category: "Business Model",
  },
  {
    question: "What is your Unique Selling Proposition (USP)?",
    response_type: "text",
    placeholder: "Our USP is...",
    category: "Market Differentiation",
  },
  {
    question: "Who is your target customer?",
    response_type: "text",
    placeholder: "Our target customer is...",
    category: "Market Analysis",
  },
  {
    question: "How big is your current team?",
    response_type: "number",
    placeholder: "Enter a number",
    category: "Team",
  },
  {
    question: "What stage is your company currently in?",
    response_type: "select",
    options: ["Idea", "Prototype", "Launch", "Growth", "Maturity"],
    placeholder: "Select a stage",
    category: "Company Stage",
  },
  {
    question: "Who are your main competitors?",
    response_type: "text",
    placeholder: "Our main competitors are...",
    category: "Market Analysis",
  },
  {
    question: "How do you acquire customers?",
    response_type: "text",
    placeholder: "We acquire customers through...",
    category: "Customer Acquisition",
  },
  {
    question: "What is your customer retention strategy?",
    response_type: "text",
    placeholder: "Our strategy is...",
    category: "Customer Retention",
  },
  {
    question: "What is your monthly burn rate?",
    response_type: "number",
    placeholder: "Enter a number",
    category: "Financials",
  },
  {
    question: "What are your key performance indicators (KPIs)?",
    response_type: "text",
    placeholder: "Our KPIs are...",
    category: "Metrics",
  },
  {
    question: "What are your expansion plans?",
    response_type: "text",
    placeholder: "We plan to...",
    category: "Growth",
  },
  {
    question: "What kind of partnerships are you looking for?",
    response_type: "text",
    placeholder: "We are looking for...",
    category: "Partnerships",
  },
  {
    question: "What regulatory challenges do you face?",
    response_type: "text",
    placeholder: "We face challenges in...",
    category: "Compliance",
  },
  {
    question: "How do you measure customer satisfaction?",
    response_type: "text",
    placeholder: "We measure by...",
    category: "Customer Relations",
  },
  {
    question: "What’s the technology stack your business relies on?",
    response_type: "text",
    placeholder: "We use...",
    category: "Technology",
  },
  {
    question: "What intellectual property does your business own?",
    response_type: "text",
    placeholder: "We own...",
    category: "Intellectual Property",
  },
  {
    question: "Do you have any major milestones in the next 12 months?",
    response_type: "text",
    placeholder: "We aim to...",
    category: "Milestones",
  },
  {
    question: "What are the risks your business faces?",
    response_type: "text",
    placeholder: "The risks are...",
    category: "Risk Management",
  },
  {
    question: "How much funding are you looking to raise?",
    response_type: "number",
    placeholder: "Enter a number",
    category: "Funding",
  },
  {
    question: "What industry does your business operate in?",
    response_type: "select",
    options: ["Technology", "Healthcare", "Retail", "Manufacturing", "Energy"],
    placeholder: "Select an industry",
    category: "Industry",
  },
  {
    question: "What is your primary marketing channel?",
    response_type: "select",
    options: [
      "Social Media",
      "SEO",
      "Email Marketing",
      "Influencers",
      "Offline",
    ],
    placeholder: "Select a channel",
    category: "Marketing",
  },
  {
    question: "What form of business entity are you?",
    response_type: "select",
    options: ["Sole Proprietorship", "Partnership", "Corporation", "LLC"],
    placeholder: "Select an entity",
    category: "Legal",
  },
  {
    question: "How did you initially fund your business?",
    response_type: "select",
    options: [
      "Bootstrapping",
      "Venture Capital",
      "Bank Loan",
      "Crowdfunding",
      "Personal Savings",
    ],
    placeholder: "Select a funding method",
    category: "Funding",
  },
  {
    question: "What sales channels do you use?",
    response_type: "select",
    options: ["Online", "Retail", "Direct Sales", "Wholesale", "Marketplace"],
    placeholder: "Select a channel",
    category: "Sales",
  },
  {
    question: "What’s your payment structure?",
    response_type: "select",
    options: [
      "Upfront Payment",
      "Monthly Subscription",
      "Revenue Sharing",
      "License Fee",
    ],
    placeholder: "Select a payment structure",
    category: "Financials",
  },
  {
    question: "What are your exit strategies?",
    response_type: "select",
    options: [
      "Acquisition",
      "IPO",
      "Merger",
      "Lifestyle Business",
      "Undecided",
    ],
    placeholder: "Select an exit strategy",
    category: "Growth",
  },
  {
    question: "What kind of feedback mechanism do you use?",
    response_type: "select",
    options: ["User Reviews", "Surveys", "Focus Groups", "Net Promoter Score"],
    placeholder: "Select a feedback mechanism",
    category: "Customer Relations",
  },
  {
    question: "How do you prioritize product features?",
    response_type: "select",
    options: [
      "Customer Demand",
      "Revenue Impact",
      "Feasibility",
      "Strategic Importance",
    ],
    placeholder: "Select a method",
    category: "Product Development",
  },
  {
    question: "What is your customer support medium?",
    response_type: "select",
    options: ["Email", "Live Chat", "Phone", "Self-Service"],
    placeholder: "Select a support medium",
    category: "Customer Support",
  },
  {
    question: "How many customers do you currently have?",
    response_type: "number",
    placeholder: "Enter a number",
    category: "Customer Base",
  },
  {
    question: "What’s the average customer acquisition cost (CAC)?",
    response_type: "number",
    placeholder: "Enter a number",
    category: "Financials",
  },
  {
    question: "What is the average lifetime value (LTV) of a customer?",
    response_type: "number",
    placeholder: "Enter a number",
    category: "Financials",
  },
  {
    question: "How many active users do you have monthly?",
    response_type: "number",
    placeholder: "Enter a number",
    category: "User Engagement",
  },
  {
    question: "What’s your year-over-year growth rate?",
    response_type: "number",
    placeholder: "Enter a percentage",
    category: "Growth Metrics",
  },
  {
    question: "How many full-time employees do you have?",
    response_type: "number",
    placeholder: "Enter a number",
    category: "Team",
  },
  {
    question: "What’s your Net Profit Margin?",
    response_type: "number",
    placeholder: "Enter a percentage",
    category: "Financials",
  },
  {
    question: "What's your monthly recurring revenue (MRR)?",
    response_type: "number",
    placeholder: "Enter a number",
    category: "Financials",
  },
  {
    question: "How many countries do you operate in?",
    response_type: "number",
    placeholder: "Enter a number",
    category: "Geography",
  },
  {
    question: "How many product lines or services do you offer?",
    response_type: "number",
    placeholder: "Enter a number",
    category: "Product/Service",
  },
];

export function isValidAnswer(value: any): boolean {
  // Check if value is null or undefined
  if (value === null || value === undefined) {
    return false;
  }
  // Check if value is a string and not an empty string
  if (typeof value === "string" && value.trim() !== "") {
    return true;
  }
  // Check if value is a number and not Nan
  if (typeof value === "number" && !isNaN(value)) {
    return true;
  }

  // If value is not a string or an empty string, consider it invalid
  return false;
}

export function isSurveyQuestionArray(input: any[]): input is SurveyQuestion[] {
  if (!Array.isArray(input) || input === null) {
    return false;
  }

  // Check if each element in the array is a valid SurveyQuestion
  return input.every((question) => {
    return (
      (question.response_type === "text" ||
        question.response_type === "number" ||
        question.response_type === "select") &&
      typeof question.question === "string" &&
      (question.category === undefined ||
        typeof question.category === "string") &&
      (question.placeholder === undefined ||
        typeof question.placeholder === "string") &&
      (question.response_type === "select"
        ? Array.isArray(question.options)
        : true)
    );
  });
}
