"use server";

import { chunkContent } from "@/lib/chunking";
import { db } from "@/lib/db-config";
import { documents } from "@/lib/db-schema";
import { generateEmbeddings } from "@/lib/embed";
import * as pdfjs from "pdfjs-dist/legacy/build/pdf.mjs";

async function extractTextFromPdf(buffer: ArrayBuffer): Promise<string> {
    const loadingTask = pdfjs.getDocument({ data: buffer });
    const pdfDoc = await loadingTask.promise;
    const pages: string[] = [];
    for (let i = 1; i <= pdfDoc.numPages; i++) {
        const page = await pdfDoc.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items
            .map((item) => ("str" in item ? item.str : ""))
            .join(" ");
        pages.push(pageText);
    }
    return pages.join("\n");
}

export async function processFilePdfFile(formData: FormData) {
    try {
        const file = formData.get("pdf") as File | null;
        if (!file) {
            return { success: false, error: "No file uploaded." };
        }
        if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
            return { success: false, error: "Please upload a valid PDF file." };
        }
        const bytes = await file.arrayBuffer();
        const text = await extractTextFromPdf(bytes);
        if (!text || text.trim().length === 0) {
            return { success: false, error: "The uploaded PDF contains no text." };
        }

        const chunks = await chunkContent(text);
        const embeddings = await generateEmbeddings(chunks);
        const records = chunks.map((chunk, index) => ({
            content: chunk,
            embedding: embeddings[index],
        }));
        await db.insert(documents).values(records);

        return { success: true, message: `Successfully processed PDF file with ${records.length} chunks.` };
    } catch (error) {
        console.error("Error processing PDF file:", error);
        return { success: false, error: "Failed to process PDF file." };
    }
}
