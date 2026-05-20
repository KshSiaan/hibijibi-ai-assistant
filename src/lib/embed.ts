import { embed, embedMany } from "ai";
import { createHuggingFace } from '@ai-sdk/huggingface';

const huggingface = createHuggingFace({
    apiKey: process.env.HUGGINGFACE_API_KEY ?? '',
});
export async function generateEmbedding(text: string) {

    const input = text.replace(/\n/g, " ");
    const { embedding } = await embed({
        model: huggingface.embeddingModel("google/embeddinggemma-300m"),
        value: input,
    });

    return embedding;
}

export async function generateEmbeddings(texts: string[]) {
    const inputs = texts.map((text) => text.replace(/\n/g, " "));
    const { embeddings } = await embedMany({
        model: huggingface.embeddingModel("google/embeddinggemma-300m"),
        values: inputs,
    });
    return embeddings;
}

