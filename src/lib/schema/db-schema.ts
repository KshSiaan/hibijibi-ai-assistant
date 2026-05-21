import {index, pgTable,serial,text,vector} from "drizzle-orm/pg-core"

export const documents = pgTable("documents",{
    id:serial("id").primaryKey(),
    content:text("content").notNull(),
    embedding:vector("embedding",{dimensions:768}).notNull()
},(table)=>[
    index("embedding_vector_idx").using("hnsw",table.embedding.op("vector_cosine_ops")),
]
);

export type InsertDocument = typeof documents.$inferInsert;
export type SelectDocument = typeof documents.$inferSelect;