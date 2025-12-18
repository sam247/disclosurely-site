"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { X, Send, Loader2 } from "lucide-react";
import { useChatSupport } from "@/hooks/useChatSupport";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [emailCaptured, setEmailCaptured] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadMessage, setLeadMessage] = useState("");
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [showGetStarted, setShowGetStarted] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { messages, isLoading, error, sendMessage, clearConversation } = useChatSupport();

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // Show "Get Started" prompt after user has sent 2+ messages and received responses
  useEffect(() => {
    const userMessages = messages.filter((m) => m.role === "user");
    const assistantMessages = messages.filter((m) => m.role === "assistant");
    
    // Show after 2+ user messages and at least 1 assistant response
    if (userMessages.length >= 2 && assistantMessages.length >= 1 && !showGetStarted && !showLeadForm && !leadSubmitted) {
      setShowGetStarted(true);
    }
  }, [messages, showGetStarted, showLeadForm, leadSubmitted]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Don't auto-show email capture - only show when user requests to speak to human

  const handleSendMessage = async (message: string) => {
    if (!message.trim() || isLoading) return;

    // Check if user is asking to speak to a human
    const lowerMessage = message.toLowerCase();
    const wantsHuman = 
      lowerMessage.includes('speak to human') ||
      lowerMessage.includes('talk to human') ||
      lowerMessage.includes('speak to someone') ||
      lowerMessage.includes('talk to someone') ||
      lowerMessage.includes('human support') ||
      lowerMessage.includes('contact sales') ||
      lowerMessage.includes('speak to sales');

    // Check if user wants to book a demo
    const wantsBooking = 
      lowerMessage.includes('book a demo') ||
      lowerMessage.includes('book demo') ||
      lowerMessage.includes('schedule a demo') ||
      lowerMessage.includes('schedule demo') ||
      lowerMessage.includes('book a call') ||
      lowerMessage.includes('schedule a call') ||
      lowerMessage.includes('demo') && (lowerMessage.includes('book') || lowerMessage.includes('schedule'));

    await sendMessage(message, {
      userEmail: email || undefined,
      userName: name || undefined,
    });

    // Show booking form if they asked to book a demo
    if (wantsBooking && !showBookingForm && !bookingSubmitted) {
      setShowBookingForm(true);
      setShowGetStarted(false);
    }
    // Show lead form if they asked to speak to human (but not if booking)
    else if (wantsHuman && !emailCaptured && !showLeadForm && !wantsBooking) {
      setShowLeadForm(true);
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
    setShowLeadForm(false);
    setLeadSubmitted(false);
    setShowGetStarted(false);
    setShowBookingForm(false);
    setBookingSubmitted(false);
    setBookingDate("");
    setBookingTime("");
  };

  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !leadMessage.trim() || isSubmittingLead) return;

    setIsSubmittingLead(true);
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name || "Chat User",
          email,
          message: leadMessage,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to submit lead");
      }

      setLeadSubmitted(true);
      setShowLeadForm(false);
      setEmailCaptured(true);
    } catch (error) {
      console.error("Lead submission error:", error);
      alert("Failed to submit. Please try again.");
    } finally {
      setIsSubmittingLead(false);
    }
  };

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name || !bookingDate || !bookingTime || isSubmittingBooking) return;

    setIsSubmittingBooking(true);
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message: `Demo Booking Request\n\nPreferred Date: ${bookingDate}\nPreferred Time: ${bookingTime}\n\nRequested via chat widget.`,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to submit booking");
      }

      setBookingSubmitted(true);
      setShowBookingForm(false);
      setEmailCaptured(true);
    } catch (error) {
      console.error("Booking submission error:", error);
      alert("Failed to submit booking. Please try again.");
    } finally {
      setIsSubmittingBooking(false);
    }
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
          <Image
            src="/assets/chat.png"
            alt="Chat"
            width={24}
            height={24}
            className="h-6 w-6"
          />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-0 right-0 z-50 flex h-[100vh] w-full flex-col border-t border-gray-200 bg-white shadow-2xl transition-all sm:bottom-6 sm:right-6 sm:h-[650px] sm:w-[420px] sm:rounded-lg sm:border">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 bg-blue-600 px-4 py-3">
            <div className="flex flex-col">
              <Image
                src="/lovable-uploads/c46ace0e-df58-4119-b5e3-8dcfa075ea2f.png"
                alt="Disclosurely"
                width={120}
                height={32}
                className="h-6 w-auto brightness-0 invert"
              />
              <span className="mt-1 text-xs text-blue-100">AI Chat Support</span>
            </div>
            <button
              onClick={handleClose}
              className="rounded p-1 text-white hover:bg-blue-700 focus:outline-none"
              aria-label="Close chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4">
            {messages.length === 0 && (
              <div className="flex h-full items-center justify-center">
                <div className="text-center px-4">
                  <div className="mb-6 flex justify-center">
                    <Image
                      src="/assets/chat.png"
                      alt="Chat"
                      width={48}
                      height={48}
                      className="h-12 w-12 brightness-0 opacity-60"
                    />
                  </div>
                  <p className="text-sm text-gray-600">
                    Hi! I'm here to help answer questions about Disclosurely.
                  </p>
                  <p className="mt-2 text-sm text-gray-500">
                    Ask me anything about our features, pricing, or how Disclosurely can work for your business?
                  </p>
                  <div className="mt-6 grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        const input = inputRef.current;
                        if (input) {
                          input.value = "Start free trial";
                          handleSendMessage("Start free trial");
                        }
                      }}
                      className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-blue-700"
                    >
                      Start Free Trial
                    </button>
                    <button
                      onClick={() => {
                        const input = inputRef.current;
                        if (input) {
                          input.value = "See pricing";
                          handleSendMessage("See pricing");
                        }
                      }}
                      className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50"
                    >
                      See Pricing
                    </button>
                    <button
                      onClick={() => {
                        const input = inputRef.current;
                        if (input) {
                          input.value = "Book a demo";
                          handleSendMessage("Book a demo");
                        }
                      }}
                      className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50"
                    >
                      Book Demo
                    </button>
                    <button
                      onClick={() => {
                        const input = inputRef.current;
                        if (input) {
                          input.value = "View features";
                          handleSendMessage("View features");
                        }
                      }}
                      className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50"
                    >
                      View Features
                    </button>
                  </div>
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

            {/* Get Started Prompt - Shown after user has engaged */}
            {showGetStarted && !showLeadForm && !leadSubmitted && !showBookingForm && !bookingSubmitted && (
              <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-4">
                <p className="mb-3 text-sm font-medium text-gray-900">
                  Ready to get started?
                </p>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <a
                    href="https://app.disclosurely.com/auth/signup"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setShowGetStarted(false)}
                    className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-blue-700"
                  >
                    Start Free Trial
                  </a>
                  <button
                    onClick={() => {
                      const input = inputRef.current;
                      if (input) {
                        input.value = "Book a demo";
                        handleSendMessage("Book a demo");
                        setShowGetStarted(false);
                      }
                    }}
                    className="flex-1 rounded-lg border border-blue-600 bg-white px-4 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50"
                  >
                    Book Demo
                  </button>
                </div>
                <button
                  onClick={() => setShowGetStarted(false)}
                  className="mt-2 text-xs text-gray-500 hover:text-gray-700"
                >
                  Not ready yet
                </button>
              </div>
            )}
          </div>

          {/* Booking Form - Shown when user requests to book a demo */}
          {showBookingForm && !bookingSubmitted && (
            <div className="border-t border-gray-200 bg-gray-50 p-3">
              <p className="mb-2 text-xs font-medium text-gray-700">
                Book a Demo
              </p>
              <p className="mb-3 text-xs text-gray-500">
                Fill out the form below and we'll get back to you to confirm your demo time.
              </p>
              <form onSubmit={handleSubmitBooking} className="space-y-2">
                <Input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="h-8 text-sm"
                />
                <Input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-8 text-sm"
                />
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Input
                      type="date"
                      placeholder="Preferred date"
                      value={bookingDate}
                      onChange={(e) => {
                        const selectedDate = e.target.value;
                        if (selectedDate) {
                          const date = new Date(selectedDate);
                          const dayOfWeek = date.getDay();
                          // 0 = Sunday, 6 = Saturday
                          if (dayOfWeek === 0 || dayOfWeek === 6) {
                            alert("Please select a weekday (Monday - Friday)");
                            setBookingDate("");
                            return;
                          }
                        }
                        setBookingDate(selectedDate);
                      }}
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className="h-8 text-sm"
                    />
                    <p className="mt-1 text-xs text-gray-500">Mon - Fri only</p>
                  </div>
                  <div>
                    <select
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                      required
                      className="flex h-8 w-full rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="">Select time</option>
                      <option value="09:30">9:30 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="10:30">10:30 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="11:30">11:30 AM</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="12:30">12:30 PM</option>
                      <option value="13:00">1:00 PM</option>
                      <option value="13:30">1:30 PM</option>
                      <option value="14:00">2:00 PM</option>
                      <option value="14:30">2:30 PM</option>
                    </select>
                    <p className="mt-1 text-xs text-gray-500">UK GMT time</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    onClick={() => {
                      setShowBookingForm(false);
                    }}
                    size="sm"
                    variant="outline"
                    className="h-8 flex-1 text-xs"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmittingBooking || !email || !name || !bookingDate || !bookingTime}
                    size="sm"
                    className="h-8 flex-1 text-xs bg-blue-600 hover:bg-blue-700"
                  >
                    {isSubmittingBooking ? (
                      <Loader2 className="h-3 w-3 animate-spin" />
                    ) : (
                      "Book Demo"
                    )}
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Booking Submitted Success */}
          {bookingSubmitted && (
            <div className="border-t border-gray-200 bg-green-50 p-3">
              <p className="mb-2 text-xs font-medium text-green-800">
                ✓ Demo booking requested! We'll confirm your time via email soon.
              </p>
              <p className="mb-3 text-xs text-green-700">
                In the meantime, why not start a free trial to explore Disclosurely?
              </p>
              <a
                href="https://app.disclosurely.com/auth/signup"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full rounded-lg bg-blue-600 px-4 py-2 text-center text-xs font-medium text-white transition-colors hover:bg-blue-700"
              >
                Start Free Trial
              </a>
            </div>
          )}

          {/* Lead Form - Only shown when user requests to speak to human */}
          {showLeadForm && !leadSubmitted && (
            <div className="border-t border-gray-200 bg-gray-50 p-3">
              <p className="mb-2 text-xs font-medium text-gray-700">
                Request to speak with our team
              </p>
              <p className="mb-3 text-xs text-gray-500">
                Fill out the form below and we'll get back to you via email.
              </p>
              <form onSubmit={handleSubmitLead} className="space-y-2">
                <Input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="h-8 text-sm"
                />
                <Input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-8 text-sm"
                />
                <Input
                  type="text"
                  placeholder="Your message"
                  value={leadMessage}
                  onChange={(e) => setLeadMessage(e.target.value)}
                  required
                  className="h-8 text-sm"
                />
                <div className="flex gap-2">
                  <Button
                    type="button"
                    onClick={() => {
                      setShowLeadForm(false);
                    }}
                    size="sm"
                    variant="outline"
                    className="h-8 flex-1 text-xs"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmittingLead || !email || !leadMessage.trim()}
                    size="sm"
                    className="h-8 flex-1 text-xs bg-blue-600 hover:bg-blue-700"
                  >
                    {isSubmittingLead ? (
                      <Loader2 className="h-3 w-3 animate-spin" />
                    ) : (
                      "Send"
                    )}
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Lead Submitted Success */}
          {leadSubmitted && (
            <div className="border-t border-gray-200 bg-green-50 p-3">
              <p className="mb-2 text-xs font-medium text-green-800">
                ✓ Thank you! We'll get back to you via email soon.
              </p>
              <p className="mb-3 text-xs text-green-700">
                In the meantime, why not start a free trial to see Disclosurely in action?
              </p>
              <a
                href="https://app.disclosurely.com/auth/signup"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full rounded-lg bg-blue-600 px-4 py-2 text-center text-xs font-medium text-white transition-colors hover:bg-blue-700"
              >
                Start Free Trial
              </a>
            </div>
          )}

          {/* Persistent CTA Footer */}
          {messages.length > 0 && !showLeadForm && !leadSubmitted && !showBookingForm && !bookingSubmitted && (
            <div className="border-t border-gray-200 bg-gray-50 px-3 py-2">
              <a
                href="https://app.disclosurely.com/auth/signup"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full rounded-lg bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-blue-700"
              >
                Start Free Trial - No Credit Card Required
              </a>
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

