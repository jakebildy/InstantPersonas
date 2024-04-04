import { OpenAI } from "openai";
import { createAI, getMutableAIState, render } from "ai/rsc";
import { z } from "zod";
import { PersonaMessage } from "@/components/chat";
import UserPersona, { EXAMPLE_PERSONA } from "@/components/persona";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// An example of a spinner component. You can also import your own components,
// or 3rd party component libraries.
function Spinner() {
  return <div>Loading...</div>;
}

// An example of a flight card component.
//@ts-ignore
function PersonaCard({ persona }) {
  return (
    <div>
      <h2 style={{ fontWeight: "bold" }}>{persona.productOrService}</h2>
      <UserPersona
        name="Joe Mama"
        gender={"Male"}
        pictureURL={""}
        personalAttributes={[
          {
            label: "Age",
            description: "25-35",
            icon: "👨‍🦳",
          },
          {
            label: "Occupation",
            description: "Software Engineer",
            icon: "💻",
          },
          {
            label: "Location",
            description: "San Francisco, CA",
            icon: "🌉",
          },
        ]}
        sections={[
          {
            label: "Joe Mama",
            description:
              "Joe is a software engineer who works at a tech company in San Francisco. He enjoys playing video games in his free time and is passionate about technology.",
          },
          {
            label: "Motivations",
            description:
              "Joe is motivated by the desire to learn new technologies and improve his coding skills. He is always looking for ways to challenge himself and grow as a developer.",
          },
          {
            label: "Devices",
            description: "Laptop, Smartphone, Tablet",
          },
          {
            label: "Pains",
            description:
              "Joe struggles with imposter syndrome and often feels overwhelmed by the fast-paced nature of the tech industry.",
          },
        ]}
      />
    </div>
  );
}

// An example of a function that fetches flight information from an external API.
async function createPersona(productOrService: string) {
  return {
    productOrService: productOrService,
  };
}

//@ts-ignore
async function submitUserMessage(userInput: string) {
  "use server";

  //@ts-ignore
  const aiState = getMutableAIState<typeof AI>();

  // Update the AI state with the new user message.
  aiState.update([
    ...aiState.get(),
    {
      role: "user",
      content: userInput,
    },
  ]);

  // The `render()` creates a generated, streamable UI.
  //@ts-ignore
  const ui = render({
    model: "gpt-4-0125-preview",
    provider: openai,
    messages: [
      {
        role: "system",
        content:
          "You help the user create personas. Before creating a persona, ask the user about the customer motivations, goals, and pain points.",
      },
      ...aiState.get(),
    ],
    // `text` is called when an AI returns a text response (as opposed to a tool call).
    // Its content is streamed from the LLM, so this function will be called
    // multiple times with `content` being incremental.
    text: ({ content, done }) => {
      // When it's the final content, mark the state as done and ready for the client to access.
      if (done) {
        aiState.done([
          ...aiState.get(),
          {
            role: "assistant",
            content,
          },
        ]);
      }

      return <PersonaMessage message={content} />;
    },
    tools: {
      create_persona: {
        description:
          "When the user has provided a product or service, create a persona.",
        parameters: z
          .object({
            productOrService: z
              .string()
              .describe(
                "the product or service being offered (with an emoji to follow it, ex. Coffee Shop ☕️)"
              ),
          })
          .required(),
        render: async function* ({ productOrService }) {
          // Show a spinner on the client while we wait for the response.
          yield <Spinner />;

          // Fetch the flight information from an external API.
          const persona = await createPersona(productOrService);

          // Update the final AI state.
          aiState.done([
            ...aiState.get(),
            {
              role: "function",
              name: "create_persona",
              // Content can be any string to provide context to the LLM in the rest of the conversation.
              content: JSON.stringify(persona),
            },
          ]);

          // Return the flight card to the client.
          return <PersonaCard persona={persona} />;
        },
      },
    },
  });

  return {
    id: Date.now(),
    display: ui,
  };
}

// Define the initial state of the AI. It can be any JSON object.
const initialAIState: {
  role: "user" | "assistant" | "system" | "function";
  content: string;
  id?: string;
  name?: string;
}[] = [];

// The initial UI state that the client will keep track of, which contains the message IDs and their UI nodes.
const initialUIState: {
  id: number;
  display: React.ReactNode;
}[] = [];

// AI is a provider you wrap your application with so you can access AI and UI state in your components.
//@ts-ignore
export const AI = createAI({
  actions: {
    submitUserMessage,
  },
  // Each state can be any shape of object, but for chat applications
  // it makes sense to have an array of messages. Or you may prefer something like { id: number, messages: Message[] }
  initialUIState,
  initialAIState,
});
