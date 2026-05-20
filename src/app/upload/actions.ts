"use server";

import pdf from "pdf-parse";
import { db } from "@/lib/db-config";
import { documents } from "@/lib/db-schema";
import { generateEmbeddings } from "@/lib/embed";
import { chunkContent } from "@/lib/chunking";

export async function processFilePdfFile(formData: FormData) {
    try {
        const file = formData.get("pdf") as File | null;
        if (!file) {
            return { success: false, error: "No file uploaded." };
        }
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const data = await pdf(buffer);
        if (!data.text || data.text.trim().length === 0) {
            return { success: false, error: "The uploaded PDF contains no text." };
        }

        const chunks = await chunkContent(data.text);
        const embeddings = await generateEmbeddings(chunks);
        const records = chunks.map((chunk, index) => ({
            content: chunk,
            embedding: embeddings[index],
        }));
        await db.insert(documents).values(records);

        return { success: true , message: `Successfully processed PDF file with ${records.length} chunks.`};
    } catch (error) {
        
        console.error("Error processing PDF file:", error);
        return { success: false, error: "Failed to process PDF file." };
    }
    
}