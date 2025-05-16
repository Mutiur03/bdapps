"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Paperclip, Send, FileText, ImageIcon, DollarSign } from "lucide-react";
import { MakeOfferDialog } from "@/components/investor/make-offer-dialog";

interface ChatInterfaceProps {
  recipientId: string;
  recipientType: "investor" | "udayee";
  userType: "investor" | "udayee";
}

export function ChatInterface({
  recipientId,
  recipientType,
  userType,
}: ChatInterfaceProps) {
  const [message, setMessage] = useState("");
  const [isOfferDialogOpen, setIsOfferDialogOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock data - in a real app, this would come from an API
  const recipient = {
    id: recipientId,
    name: recipientType === "udayee" ? "Rahul Ahmed" : "Ayesha Khan",
    avatar: "/placeholder.svg?height=40&width=40",
    startup: recipientType === "udayee" ? "EcoSolutions" : undefined,
    company: recipientType === "investor" ? "Green Ventures" : undefined,
  };

  const [messages, setMessages] = useState([
    {
      id: "1",
      sender: recipientType,
      text:
        recipientType === "udayee"
          ? "Hello! Thank you for your interest in EcoSolutions. How can I help you today?"
          : "Hi there! I'm interested in learning more about your startup. Could you tell me about your progress so far?",
      timestamp: "10:30 AM",
    },
    {
      id: "2",
      sender: userType,
      text:
        recipientType === "udayee"
          ? "Hi Rahul! I'm interested in your waste management solution. Could you share more details about your technology?"
          : "Hello Ayesha! We've completed our market research and built a prototype. We're currently testing it in two neighborhoods in Dhaka.",
      timestamp: "10:32 AM",
    },
    {
      id: "3",
      sender: recipientType,
      text:
        recipientType === "udayee"
          ? "Of course! Our solution uses IoT sensors to monitor waste levels in bins and optimize collection routes. We also have a mobile app that encourages citizens to participate in recycling through gamification."
          : "That sounds promising! What kind of investment are you looking for at this stage?",
      timestamp: "10:35 AM",
    },
  ]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      sender: userType,
      text: message,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages([...messages, newMessage]);
    setMessage("");

    // Simulate reply after a delay
    setTimeout(() => {
      const replyMessage = {
        id: (Date.now() + 1).toString(),
        sender: recipientType,
        text:
          recipientType === "udayee"
            ? "Thanks for your question! Let me provide some more details..."
            : "That's great to hear! I'd be interested in discussing potential investment opportunities.",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, replyMessage]);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] overflow-hidden">
      {/* Chat Header */}
      <Card className="rounded-b-none border-b-0">
        <CardHeader className="py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage
                  src={recipient.avatar || "/placeholder.svg"}
                  alt={recipient.name}
                />
                <AvatarFallback>
                  {recipient.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-base">{recipient.name}</CardTitle>
                <p className="text-xs text-muted-foreground">
                  {recipient.startup || recipient.company}
                </p>
              </div>
            </div>

            {userType === "investor" && (
              <Button
                variant="outline"
                className="text-emerald-600 border-emerald-600 hover:bg-emerald-50 flex items-center gap-2"
                onClick={() => setIsOfferDialogOpen(true)}
              >
                <DollarSign className="h-4 w-4" />
                Make an Offer
              </Button>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* Chat Messages */}
      <Card className="flex-1 rounded-none border-y-0 overflow-hidden">
        <CardContent className="p-4 h-full overflow-hidden">
          <div className="h-full overflow-y-auto pr-1">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.sender === userType ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg px-4 py-2 ${
                      msg.sender === userType
                        ? "bg-emerald-600 text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p
                      className={`text-xs mt-1 ${
                        msg.sender === userType
                          ? "text-emerald-100"
                          : "text-gray-500"
                      }`}
                    >
                      {msg.timestamp}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chat Input */}
      <Card className="rounded-t-none border-t-0">
        <CardContent className="p-3">
          <form
            onSubmit={handleSendMessage}
            className="flex items-center space-x-2"
          >
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
            >
              <Paperclip className="h-5 w-5" />
            </Button>
            <div className="relative flex-1">
              <Input
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="pr-20"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-foreground"
                >
                  <ImageIcon className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-foreground"
                >
                  <FileText className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Button
              type="submit"
              size="icon"
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
              disabled={!message.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Make Offer Dialog */}
      {userType === "investor" && (
        <MakeOfferDialog
          open={isOfferDialogOpen}
          onOpenChange={setIsOfferDialogOpen}
          startup={{
            id: recipientId,
            name: "EcoSolutions",
            founder: "Rahul Ahmed",
            milestones: [
              {
                id: "m3",
                title: "Pilot Testing",
                amount: "৳7,000",
                status: "in_progress",
              },
              {
                id: "m4",
                title: "MVP Launch",
                amount: "৳7,000",
                status: "planned",
              },
            ],
          }}
        />
      )}
    </div>
  );
}
