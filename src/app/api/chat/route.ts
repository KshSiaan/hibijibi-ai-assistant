import {convertToModelMessages, streamText, type UIMessage} from "ai"
import { google, GoogleGenerativeAIProviderOptions } from "@ai-sdk/google";
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
    }
    });
    return result.toUIMessageStreamResponse()
} catch (error) {
    console.error("Error in chat route:", error);
    return new Response("Internal Server Error", { status: 500 });
}
}