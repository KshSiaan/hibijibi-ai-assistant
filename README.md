# Hibijibi AI Assistant

> A learning-focused RAG (Retrieval-Augmented Generation) AI assistant project built with modern AI tooling and web technologies.

## Overview

**Hibijibi AI** is a personal experimental AI assistant project created for learning and exploration purposes.  
The project was mainly built to explore the architecture and workflow behind modern RAG applications.

It is designed as a showcase project for friends, collaborators.

The assistant integrates vector search, embeddings, conversational AI, authentication, and document-based querying into a single application.

## Features

- RAG-based AI assistant
- Document querying with embeddings
- Secure authentication for protected uploads
- Vector storage using NeonDB
- Conversational AI workflow
- Modern UI with shadcn/ui
- Built using Next.js
- Experimental AI integrations and SDK usage

## Tech Stack

### Frontend
- Next.js
- shadcn/ui
- AI Elements (Vercel)

### AI & RAG
- LangChain
- Gemma 4 (gemma-4-31b-it)
- Google AI Embeddings (google/embeddinggemma-300m)
- Hugging Face / HF Interface
- AI SDK

### Database
- NeonDB (Vector Storage)

### Authentication
- BetterAuth

## Environment Variables

Create a `.env.local` file and include the following:
```env
HUGGINGFACE_TOKEN=your_huggingface_token
GOOGLE_AI_API_KEY=your_google_ai_api_key
```
