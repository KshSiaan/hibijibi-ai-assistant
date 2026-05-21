"use server";

import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient(process.env.HF_TOKEN);
const MODEL = "google/embeddinggemma-300m";

export async function generateEmbedding(text: string): Promise<number[]> {
    const result = await client.featureExtraction({
        model: MODEL,
        inputs: text.replace(/\n/g, " "),
        provider: "hf-inference",
    });
    return Array.from(result as number[]);
}

export async function generateEmbeddings(texts: string[]): Promise<number[][]> {
    const results = await Promise.all(texts.map((t) => generateEmbedding(t)));
    return results;
}
