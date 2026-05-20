DROP INDEX "embedding_vector_idx";--> statement-breakpoint
CREATE INDEX "embedding_vector_idx" ON "documents" USING ivfflat ("embedding" vector_cosine_ops);