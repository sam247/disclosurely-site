"use client";

import { useState, useCallback } from "react";

interface ChatMessage {
  id: string;
  message: string;
  role: "user" | "assistant";
  timestamp: Date;
}

interface ChatResponse {
  conversationId: string;
  response: string;
  messageId: string;
}

interface ChatError {
  error: string;
}

export function useChatSupport() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("chat_conversation_id");
    }
    return null;
  });

  const saveConversationId = useCallback((id: string) => {
    setConversationId(id);
    if (typeof window !== "undefined") {
      localStorage.setItem("chat_conversation_id", id);
    }
  }, []);

  const sendMessage = useCallback(
    async (
      message: string,
      options?: {
        userEmail?: string;
        userName?: string;
        userId?: string;
      }
    ) => {
      if (!message.trim()) return;

      setIsLoading(true);
      setError(null);

      // Add user message to UI immediately
      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        message,
        role: "user",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "send_message",
            message,
            conversationId: conversationId || undefined,
            userId: options?.userId,
            userEmail: options?.userEmail,
            userName: options?.userName,
          }),
        });

        if (!response.ok) {
          const errorData: ChatError = await response.json().catch(() => ({
            error: "Failed to get response",
          }));
          throw new Error(errorData.error || "Failed to send message");
        }

        const data: ChatResponse = await response.json();

        // Save conversation ID if we got a new one
        if (data.conversationId && data.conversationId !== conversationId) {
          saveConversationId(data.conversationId);
        }

        // Add assistant response to UI
        const assistantMessage: ChatMessage = {
          id: data.messageId,
          message: data.response,
          role: "assistant",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "An error occurred";
        setError(errorMessage);
        // Remove the user message on error so they can retry
        setMessages((prev) => prev.filter((msg) => msg.id !== userMessage.id));
      } finally {
        setIsLoading(false);
      }
    },
    [conversationId, saveConversationId]
  );

  const clearConversation = useCallback(() => {
    setMessages([]);
    setError(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("chat_conversation_id");
    }
    setConversationId(null);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearConversation,
    conversationId,
  };
}

