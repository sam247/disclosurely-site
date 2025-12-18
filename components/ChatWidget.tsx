"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { useChatSupport } from "@/hooks/useChatSupport";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [emailCaptured, setEmailCaptured] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { messages, isLoading, error, sendMessage, clearConversation } = useChatSupport();

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Show email capture after first message if not already captured
  useEffect(() => {
    if (messages.length > 0 && !emailCaptured && !showEmailCapture) {
      setShowEmailCapture(true);
    }
  }, [messages.length, emailCaptured, showEmailCapture]);

  const handleSendMessage = async (message: string) => {
    if (!message.trim() || isLoading) return;

    await sendMessage(message, {
      userEmail: email || undefined,
      userName: name || undefined,
    });

    // Capture email after first message if provided
    if (email && !emailCaptured) {
      setEmailCaptured(true);
      setShowEmailCapture(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const input = inputRef.current;
    if (input && input.value.trim()) {
      handleSendMessage(input.value);
      input.value = "";
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
    // Load conversation from localStorage if exists
    const savedConversationId = localStorage.getItem("chat_conversation_id");
    if (savedConversationId && messages.length === 0) {
      // Conversation will be loaded on first message
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleNewConversation = () => {
    clearConversation();
    setShowEmailCapture(false);
    setEmailCaptured(false);
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={handleOpen}
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label="Open chat"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-0 right-0 z-50 flex h-[100vh] w-full flex-col border-t border-gray-200 bg-white shadow-2xl transition-all sm:bottom-6 sm:right-6 sm:h-[650px] sm:w-[420px] sm:rounded-lg sm:border">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 bg-blue-600 px-4 py-3">
            <div>
              <h3 className="text-lg font-semibold text-white">Chat with us</h3>
              <p className="text-xs text-blue-100">We're here to help</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleNewConversation}
                className="rounded px-2 py-1 text-xs text-blue-100 hover:bg-blue-700"
                title="New conversation"
              >
                New
              </button>
              <button
                onClick={handleClose}
                className="rounded p-1 text-white hover:bg-blue-700 focus:outline-none"
                aria-label="Close chat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4">
            {messages.length === 0 && (
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <MessageCircle className="mx-auto mb-3 h-12 w-12 text-gray-400" />
                  <p className="text-sm text-gray-600">
                    Hi! I'm here to help answer questions about Disclosurely.
                  </p>
                  <p className="mt-2 text-sm text-gray-500">
                    Ask me anything about our features, pricing, or how to get started.
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.role === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.message}</p>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="rounded-lg bg-gray-100 px-4 py-2">
                    <Loader2 className="h-4 w-4 animate-spin text-gray-600" />
                  </div>
                </div>
              )}

              {error && (
                <div className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-800">
                  {error}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Email Capture (shown after first message) */}
          {showEmailCapture && !emailCaptured && (
            <div className="border-t border-gray-200 bg-gray-50 p-3">
              <p className="mb-2 text-xs font-medium text-gray-700">
                Get updates on your conversation
              </p>
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="Your name (optional)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-8 text-sm"
                />
                <Input
                  type="email"
                  placeholder="Your email (optional)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-8 text-sm"
                />
                <Button
                  onClick={() => {
                    if (email) {
                      setEmailCaptured(true);
                      setShowEmailCapture(false);
                    } else {
                      setShowEmailCapture(false);
                    }
                  }}
                  size="sm"
                  className="h-8 w-full text-xs"
                >
                  Continue
                </Button>
              </div>
            </div>
          )}

          {/* Input Area */}
          <form onSubmit={handleSubmit} className="border-t border-gray-200 p-3">
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                type="text"
                placeholder="Type your message..."
                disabled={isLoading}
                className="flex-1 text-sm"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />
              <Button
                type="submit"
                disabled={isLoading}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 sm:hidden"
          onClick={handleClose}
          aria-hidden="true"
        />
      )}
    </>
  );
}

