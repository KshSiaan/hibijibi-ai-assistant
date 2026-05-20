CREATE TABLE "documents" (
	"id" serial PRIMARY KEY NOT NULL,
	"content" text NOT NULL,
	"embedding" vector(2048) NOT NULL
);
--> statement-breakpoint
CREATE INDEX "embedding_vector_idx" ON "documents" USING hnsw ("embedding" vector_cosine_ops);