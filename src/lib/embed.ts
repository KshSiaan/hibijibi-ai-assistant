import { embed } from "ai";
import { createHuggingFace } from '@ai-sdk/huggingface';

export async function generateEmbedding(text: string) {
    const huggingface = createHuggingFace({
        apiKey: process.env.HUGGINGFACE_API_KEY ?? '',
    });

    const input = text.replace(/\n/g, " ");
    const { embedding } = await embed({
        model: huggingface.embeddingModel("google/gemma-embedding-exp-03-07"),
        value: input,
    });

    return embedding;
}