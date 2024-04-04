// import OpenAI from 'openai';
// import { OpenAIStream, StreamingTextResponse } from 'ai';
// import { createAI } from 'ai/rsc';
 
// // Create an OpenAI API client (that's edge friendly!)
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });
 
// // IMPORTANT! Set the runtime to edge
// export const runtime = 'edge';
 
// export async function POST(req: Request) {
//   const { messages } = await req.json();
 
//   // Ask OpenAI for a streaming chat completion given the prompt
//   const response = await openai.chat.completions.create({
//     model: 'gpt-3.5-turbo',
//     stream: true,
//     messages: [ 
//     {
//     role: "system",
//     content: "This is an AI designed to assist with the creation of User Personas. Please provide details about your target user or ask for help on how to start."
//     },
//     ...messages],
//   });
 
  
//   // Convert the response into a friendly text-stream
//   const stream = OpenAIStream(response);
//   // Respond with the stream
//   return new StreamingTextResponse(stream);
// }

// export const AI = createAI({
//   actions: {
//     submitUserMessage
//   },
//   // Each state can be any shape of object, but for chat applications
//   // it makes sense to have an array of messages. Or you may prefer something like { id: number, messages: Message[] }
//   initialUIState,
//   initialAIState
// });