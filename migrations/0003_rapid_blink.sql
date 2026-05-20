DROP INDEX "embedding_vector_idx";--> statement-breakpoint
ALTER TABLE "documents" ALTER COLUMN "embedding" SET DATA TYPE vector(768);