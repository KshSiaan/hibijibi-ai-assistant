"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import {
  Conversation,
  ConversationContent,
  ConversationDownload,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  MessageSquareIcon,
  SendIcon,
  SparklesIcon,
  UploadCloudIcon,
} from "lucide-react";
import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from "@/components/ai-elements/prompt-input";
import { useChat } from "@ai-sdk/react";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  const { messages, sendMessage, status } = useChat();

  const handleSubmit = ({ text }: { text: string; files: unknown[] }) => {
    if (!text.trim()) return;
    sendMessage({
      id: nanoid(),
      role: "user",
      parts: [{ type: "text", text }],
    });
  };

  return (
    <div className="w-full min-h-dvh bg-muted">
      <main className="container mx-auto bg-background h-dvh flex flex-col shadow-sm">
        {/* Header */}
        <header className="px-5 py-3 border-b flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2">
            <div className="size-7 rounded-md bg-primary flex items-center justify-center">
              <SparklesIcon className="size-4 text-primary-foreground" />
            </div>
            <span className="font-semibold tracking-tight text-sm">
              Hibijibi AI
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/upload">
                <UploadCloudIcon className="size-4 text-primary-foreground" />
              </Link>
            </Button>
            <Avatar className="size-8">
              <AvatarImage src="https://api.dicebear.com/9.x/dylan/svg?seed=George" />
              <AvatarFallback>G</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Conversation */}
        <div className="flex-1 overflow-hidden relative">
          <Conversation className="size-full">
            <ConversationContent>
              {messages.length === 0 ? (
                <div className="h-[70dvh] flex flex-col items-center justify-center gap-4  m-auto">
                  <ConversationEmptyState
                    description="Messages will appear here as the conversation progresses."
                    icon={<MessageSquareIcon className="size-6" />}
                    title="Start a conversation"
                  />
                </div>
              ) : (
                messages.map((message) => (
                  <div className="" key={message.id}>
                    {message.parts.map((part, index) => {
                      switch (part.type) {
                        case "text":
                          return (
                            <Message
                              from={message.role}
                              key={`${message.id}-${index}`}
                            >
                              <MessageContent>
                                <MessageResponse>{part.text}</MessageResponse>
                              </MessageContent>
                            </Message>
                          );
                        // Handle other part types (e.g., images, files) here
                        default:
                          return null;
                      }
                    })}
                  </div>
                ))
              )}
              {status === "streaming" ? (
                <Spinner />
              ) : status === "submitted" ? (
                <Shimmer duration={3} spread={3}>
                  Thinking...
                </Shimmer>
              ) : null}
            </ConversationContent>
            <ConversationScrollButton />
          </Conversation>
        </div>

        {/* Input */}
        <div className="px-4 py-3 border-t shrink-0">
          <PromptInput onSubmit={handleSubmit}>
            <PromptInputTextarea autoFocus placeholder="Message Nebula..." />
            <PromptInputFooter>
              <PromptInputTools />
              <PromptInputSubmit size="sm">
                <SendIcon />
                Submit
              </PromptInputSubmit>
            </PromptInputFooter>
          </PromptInput>
        </div>
      </main>
    </div>
  );
}
