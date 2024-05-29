"use client";
import QuizBuilder, { QuizBuilderSchema } from "@/components/quiz/quiz-builder";

const COMMUNITY_MANAGER_TEST: QuizBuilderSchema = {
  title: "Community Manager Practice Exam",
  description:
    "Test your knowledge of digital marketing with this practice exam for Meta Blueprint's Community Manager certification.",
  questions: [
    {
      title: "Which Meta technology allows up to 1024 participants in a group?",
      choices: [
        { answer: "Facebook Groups" },
        { answer: "Messenger" },
        { answer: "Instagram" },
        { answer: "WhatsApp", correct: true },
      ],
    },
    {
      title:
        "What should be included in your community guidelines to encourage a positive culture?",
      choices: [
        { answer: "A list of prohibited behaviors" },
        {
          answer: "Affirmative statements that encourage positive interactions",
          correct: true,
        },
        { answer: "Strict penalties for rule violations" },
        { answer: "Detailed legal terms and conditions" },
      ],
    },
    {
      title:
        "What is one benefit of using Page Insights for community management?",
      choices: [
        { answer: "It allows unlimited posts" },
        {
          answer: "It provides aggregated demographic data about your audience",
          correct: true,
        },
        { answer: "It automates content creation" },
        { answer: "It ensures higher engagement rates" },
      ],
    },
    {
      title:
        "Which tool can community managers use to automate moderation tasks in Facebook groups?",
      choices: [
        { answer: "Messenger Rooms" },
        { answer: "WhatsApp Groups" },
        { answer: "Admin Assist", correct: true },
        { answer: "Instagram Stories" },
      ],
    },
    {
      title: "When creating a content strategy, what is the first step?",
      choices: [
        { answer: "Assessing content performance" },
        { answer: "Determining when to post" },
        { answer: "Defining what to post", correct: true },
        { answer: "Scheduling posts in advance" },
      ],
    },
    {
      title:
        "Which feature allows community managers to approve posts before they appear in a Facebook group?",
      choices: [
        { answer: "Pinned posts" },
        { answer: "Post approvals", correct: true },
        { answer: "Group Insights" },
        { answer: "Keyword alerts" },
      ],
    },
    {
      title:
        "How can community managers use Insights to measure content performance?",
      choices: [
        { answer: "By tracking the number of admin posts" },
        {
          answer: "By evaluating reach, engagement, and conversion metrics",
          correct: true,
        },
        { answer: "By counting the total number of likes" },
        { answer: "By comparing page views" },
      ],
    },
    {
      title: "What is the purpose of creating personas for your community?",
      choices: [
        { answer: "To limit the types of members allowed" },
        {
          answer: "To represent audience segments and guide content strategy",
          correct: true,
        },
        { answer: "To exclude inactive members" },
        { answer: "To enforce community guidelines" },
      ],
    },
    {
      title:
        "Which of the following is a key component of developing a community brand strategy?",
      choices: [
        { answer: "Community size" },
        { answer: "Visual identity", correct: true },
        { answer: "Number of posts per day" },
        { answer: "Community rules" },
      ],
    },
    {
      title:
        "What should community managers do to handle conflicts effectively?",
      choices: [
        { answer: "Ignore minor conflicts" },
        { answer: "Remove all conflicting content immediately" },
        {
          answer:
            "Act quickly to moderate or comment on conversations that may escalate",
          correct: true,
        },
        { answer: "Ban members involved in conflicts" },
      ],
    },
    {
      title: "What is one way to make community guidelines more effective?",
      choices: [
        { answer: "Post them once and never update" },
        { answer: "Make them strict and unchangeable" },
        {
          answer: "Encourage ideal behavior through positive statements",
          correct: true,
        },
        { answer: "Keep them vague and open to interpretation" },
      ],
    },
    {
      title:
        "Which tool can community managers use to measure the demographic data of their community on Facebook once they have at least 250 members?",
      choices: [
        { answer: "Page Insights" },
        { answer: "Group Insights", correct: true },
        { answer: "Messenger Rooms" },
        { answer: "WhatsApp Groups" },
      ],
    },
    {
      title:
        "What should be included in a launch strategy for a new community?",
      choices: [
        {
          answer:
            "A detailed plan with milestones and actions to reach community goals",
          correct: true,
        },
        { answer: "A single announcement post" },
        { answer: "Weekly contests and giveaways" },
        { answer: "A list of banned topics" },
      ],
    },
    {
      title:
        "Which feature helps community managers connect with their audience through multimedia content on Instagram?",
      choices: [
        { answer: "Messenger" },
        { answer: "Groups" },
        { answer: "Stories", correct: true },
        { answer: "Admin Assist" },
      ],
    },
    {
      title: "How can community managers foster trust within their community?",
      choices: [
        { answer: "By enforcing rules strictly without exceptions" },
        {
          answer: "By being transparent and consistent in communication",
          correct: true,
        },
        { answer: "By limiting member interactions" },
        { answer: "By keeping guidelines secret" },
      ],
    },
    {
      title: "What is one method to gather feedback from community members?",
      choices: [
        { answer: "Limit comments on posts" },
        { answer: "Use polls to ask specific questions", correct: true },
        { answer: "Ignore member suggestions" },
        { answer: "Reduce interaction opportunities" },
      ],
    },
    {
      title: "Which metric refers to how many people have seen your content?",
      choices: [
        { answer: "Engagement" },
        { answer: "Conversion" },
        { answer: "Reach", correct: true },
        { answer: "Impressions" },
      ],
    },
    {
      title:
        "What should community managers do to maintain a safe environment during conflicts?",
      choices: [
        { answer: "Close conversations immediately without explanation" },
        { answer: "Mute, remove, or ban members if necessary", correct: true },
        { answer: "Allow all comments to stay visible" },
        { answer: "Ignore the conflict until it resolves itself" },
      ],
    },
    {
      title:
        "How can community managers encourage participation from all members?",
      choices: [
        { answer: "Focus only on top contributors" },
        {
          answer: "Acknowledge both active and less active members",
          correct: true,
        },
        { answer: "Post content infrequently" },
        { answer: "Restrict posting to admins only" },
      ],
    },
    {
      title:
        "Which tool helps community managers plan and schedule content in advance?",
      choices: [
        { answer: "Content calendar", correct: true },
        { answer: "Group Insights" },
        { answer: "Admin Assist" },
        { answer: "Messenger Rooms" },
      ],
    },
    {
      title: "What is one way to increase organic growth in your community?",
      choices: [
        { answer: "Create ad campaigns" },
        { answer: "Invite people you know to join", correct: true },
        { answer: "Purchase followers" },
        { answer: "Use automated bots" },
      ],
    },
    {
      title:
        "Which content type often consists of multimedia assets such as pictures, animations, or GIFs?",
      choices: [
        { answer: "Plain text posts" },
        { answer: "Engaging content", correct: true },
        { answer: "Community guidelines" },
        { answer: "Terms of Service" },
      ],
    },
    {
      title:
        "How can community managers assess whether their community strategy needs to be updated?",
      choices: [
        { answer: "By ignoring member feedback" },
        { answer: "By regularly reviewing data and insights", correct: true },
        { answer: "By reducing content creation" },
        { answer: "By avoiding changes" },
      ],
    },
    {
      title:
        "What is the purpose of using a RACI chart in community management?",
      choices: [
        { answer: "To track content performance" },
        { answer: "To clarify team roles and responsibilities", correct: true },
        { answer: "To increase member engagement" },
        { answer: "To automate moderation tasks" },
      ],
    },
    {
      title:
        "Which type of data records descriptive, subjective, and non-quantifiable information?",
      choices: [
        { answer: "Quantitative data" },
        { answer: "Demographic data" },
        { answer: "Qualitative data", correct: true },
        { answer: "Engagement data" },
      ],
    },
    {
      title:
        "What is one benefit of establishing strategic partnerships for your community?",
      choices: [
        { answer: "Increased internal conflicts" },
        { answer: "Access to unique and exclusive benefits", correct: true },
        { answer: "Reduced member engagement" },
        { answer: "Decreased community reach" },
      ],
    },
    {
      title: "How can community managers use Admin Assist effectively?",
      choices: [
        {
          answer: "To automate daily moderation tasks based on specific rules",
          correct: true,
        },
        { answer: "To create content" },
        { answer: "To track user activity" },
        { answer: "To engage with members in real time" },
      ],
    },
    {
      title:
        "Which tool can help measure the success of a Facebook Page once it has at least 100 followers?",
      choices: [
        { answer: "Group Insights" },
        { answer: "Page Insights", correct: true },
        { answer: "Messenger Rooms" },
        { answer: "Admin Assist" },
      ],
    },
    {
      title:
        "What should be a community manager's first step when handling conflicts?",
      choices: [
        { answer: "Ignore the conflict" },
        { answer: "Immediately ban all involved members" },
        { answer: "Step in and moderate the conversation", correct: true },
        { answer: "Delete all related posts without explanation" },
      ],
    },
    {
      title:
        "How can community managers encourage positive interactions among members?",
      choices: [
        {
          answer: "By highlighting and rewarding top contributors",
          correct: true,
        },
        { answer: "By limiting member interactions" },
        { answer: "By posting infrequently" },
        { answer: "By enforcing strict penalties for minor infractions" },
      ],
    },
  ],
};

export default function CommunityManagerPage() {
  return (
    <section className="bg-white ">
      <title>Free Practice Exam - Meta Blueprint Community Manager</title>
      <meta
        name="description"
        content="Free practice exam for Meta Blueprint Community Manager certification."
      />
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
          <h2 className="mb-4 text-4xl lg:text-5xl tracking-tight font-extrabold text-gray-900 ">
            Practice Test - Community Manager
          </h2>
          <p className="font-light text-gray-500 sm:text-xl ">
            Build your marketing knowledge with these practice exams for Meta
            Blueprint certifications.
          </p>
        </div>

        <QuizBuilder schema={COMMUNITY_MANAGER_TEST} variant={"blue"} />
        <div className="grid gap-8 lg:grid-cols-2"></div>
        <p className="font-light text-gray-500 sm:text-xl mt-4 text-center">
          We help you understand your target audience and market more
          succesfully.
        </p>
        <p className="font-light text-gray-500 sm:text-xl mt-4 text-center">
          Learn how to supercharge your marketing by creating detailed personas{" "}
          <a className="text-blue-600" href="https://instantpersonas.com/">
            here
          </a>
          .
        </p>

        <div className="text-xs text-center text-gray-500 font-light">
          We&apos;re not associated with Meta. This is not an official exam but
          is designed to help you prepare for the real thing.
        </div>
      </div>
    </section>
  );
}
