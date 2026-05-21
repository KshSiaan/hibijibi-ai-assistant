import {convertToModelMessages, streamText, tool, type UIMessage,type InferUITools, UIDataTypes, stepCountIs} from "ai"
import { google, GoogleGenerativeAIProviderOptions } from "@ai-sdk/google";
import z from "zod";
import { searchDocs } from "@/lib/search";


const tools = {
    searchKnowledgeBase: tool({
        description:"Search the knowledge base for relevant information.",
        inputSchema:z.object({
            query: z.string().describe("The search query to find relevant information in the knowledge base.")
        }),
        execute: async ({ query }) => {
            // Implementation for searching knowledge base
            try{
                const result = await searchDocs(query,3,0.5);

                if(result.length === 0){
                    return "No relevant information found in the knowledge base.";
                }
                const formattedResult = result.map((r,i)=>`[${i+1}] ${r.content} (similarity: ${r.similarity.toFixed(2)})`).join("\n\n");
                return formattedResult;
            }catch(error){
                console.error("Error executing searchKnowledgeBase tool:", error);
                throw new Error("Failed to execute searchKnowledgeBase tool");
            }
        }
        
    })
}

export type ChatTools = InferUITools<typeof tools>;
export type ChatMessage = UIMessage<never,UIDataTypes,ChatTools>;



export async function POST(request: Request) {
try {
    const { messages }:{messages:UIMessage[]} = await request.json();
    const result = streamText({
    model: google("gemma-4-31b-it"),
    messages: await convertToModelMessages(messages),
    providerOptions:{
        google:{
            thinkingConfig:{
                "thinkingLevel": "minimal"
            },
        }satisfies GoogleGenerativeAIProviderOptions
    },
    tools,
            system: "You are a helpful assistant for the company called 'Hibijibi' that provides information based on a knowledge base. Use the searchKnowledgeBase tool to find relevant information when needed. After the tool returns, always answer the user in plain text using the tool result. Do not make up information. If you don't know the answer, say you don't know. And do not flood the user with too much information. Be concise and to the point.",
            stopWhen: stepCountIs(2),

});
    return result.toUIMessageStreamResponse()
} catch (error) {
    console.error("Error in chat route:", error);
    return new Response("Internal Server Error", { status: 500 });
}
}