import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, Search, ArrowUpRight, Mail } from "lucide-react";
import Link from "next/link";

export function InvestorMessages() {
  // Mock data - in a real app, this would come from an API
  const conversations = [
    {
      id: "1",
      udayee: {
        id: "ud1",
        name: "Rahul Ahmed",
        startup: "EcoSolutions",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      lastMessage: {
        text: "Thank you for your interest in our startup! I'd be happy to provide more details about our technology.",
        timestamp: "1 hour ago",
        isRead: true,
        sentByMe: false,
      },
      hasUnread: false,
    },
    {
      id: "2",
      udayee: {
        id: "ud2",
        name: "Nusrat Khan",
        startup: "HealthTech",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      lastMessage: {
        text: "We've completed the market research phase and are now moving to prototype development.",
        timestamp: "Yesterday",
        isRead: false,
        sentByMe: false,
      },
      hasUnread: true,
      unreadCount: 3,
    },
    {
      id: "3",
      udayee: {
        id: "ud3",
        name: "Tanvir Rahman",
        startup: "EduConnect",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      lastMessage: {
        text: "I've sent you the financial projections for the next 12 months. Let me know if you need anything else.",
        timestamp: "2 days ago",
        isRead: true,
        sentByMe: false,
      },
      hasUnread: false,
    },
    {
      id: "4",
      udayee: {
        id: "ud4",
        name: "Fahmida Akter",
        startup: "AgriTech Solutions",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      lastMessage: {
        text: "Thanks for considering our startup. I'd be happy to schedule a call to discuss the investment opportunity.",
        timestamp: "5 days ago",
        isRead: true,
        sentByMe: true,
      },
      hasUnread: false,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Messages
        </h1>
        <p className="text-muted-foreground">
          Communicate with startup founders
        </p>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input className="pl-10" placeholder="Search messages..." />
        </div>
      </div>

      <div className="space-y-4">
        {conversations.map((conversation) => (
          <Link
            key={conversation.id}
            href={`/investor/chat/${conversation.udayee.id}`}
          >
            <Card
              className={`hover:shadow-md transition-shadow ${
                conversation.hasUnread ? "border-l-4 border-l-primary" : ""
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12 border border-border">
                    <AvatarImage
                      src={conversation.udayee.avatar || "/placeholder.svg"}
                      alt={conversation.udayee.name}
                    />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {conversation.udayee.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-foreground">
                          {conversation.udayee.name}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {conversation.udayee.startup}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                          {conversation.lastMessage.timestamp}
                        </span>
                        {conversation.hasUnread && (
                          <span className="bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                            {conversation.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                    <p
                      className={`text-sm ${
                        conversation.hasUnread
                          ? "font-medium text-foreground"
                          : "text-muted-foreground"
                      } line-clamp-1`}
                    >
                      {conversation.lastMessage.sentByMe && (
                        <span className="text-primary font-medium">You: </span>
                      )}
                      {conversation.lastMessage.text}
                    </p>
                    <div className="pt-1 flex justify-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 text-xs text-primary hover:text-primary-foreground hover:bg-primary/10 flex items-center gap-1"
                      >
                        Open Chat
                        <ArrowUpRight className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {conversations.length === 0 && (
        <Card className="py-12">
          <CardContent className="flex flex-col items-center justify-center text-center p-6">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium text-lg text-foreground">
              No Messages Yet
            </h3>
            <p className="text-sm text-muted-foreground mt-2 max-w-md">
              When you contact startup founders, your conversations will appear
              here.
            </p>
            <Button className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90">
              Browse Startups
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
