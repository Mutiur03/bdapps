"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, Search, ArrowUpRight, Mail } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";

export function AdminMessages() {
  interface Conversation {
    id: string;
    title: string;
    user: {
      id: string;
      name: string;
      startup: string;
      profile_picture: string;
    };
    lastMessage: {
      text: string;
      timestamp: string;
      isRead: boolean;
      sentByMe: boolean;
    } | null;
    hasUnread: boolean;
    unreadCount?: number;
  }

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await axios.get("/api/admin/messages");
        setConversations(res.data);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchConversations();
  }, []);

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1
          className="text-3xl font-bold tracking-tight"
          style={{ color: "var(--sidebar-primary)" }}
        >
          Messages
        </h1>
        <p className="text-muted-foreground">
          Communicate with startup founders
        </p>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-10"
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-8">Loading conversations...</div>
        ) : (
          filteredConversations.map((conversation) => (
            <Link
              key={conversation.id}
              href={`/admin/chat/${conversation.id}/${conversation.user?.id || "unknown"}`}
            >
              <Card
                className="hover:shadow-md transition-shadow"
                style={
                  conversation.hasUnread
                    ? { borderLeft: "4px solid var(--primary)" }
                    : {}
                }
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={conversation.user?.profile_picture || "/placeholder.svg"}
                        alt={conversation.user?.name || "User"}
                      />
                      <AvatarFallback>
                        {conversation.user?.name
                          ? conversation.user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                          : "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">
                            {conversation.user?.name || "Unknown User"}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            {conversation.title || "Unknown Startup"}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {conversation.hasUnread && (
                            <span
                              className="text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium"
                              style={{
                                background: "var(--primary)",
                                color: "var(--primary-foreground)",
                              }}
                            >
                              {conversation.unreadCount}
                            </span>
                          )}
                        </div>
                      </div>
                      {conversation.lastMessage && (
                        <div className="pt-1">
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            {conversation.lastMessage.sentByMe ? "You: " : ""}
                            {conversation.lastMessage.text}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(conversation.lastMessage.timestamp).toLocaleDateString()}
                          </p>
                        </div>
                      )}
                      <div className="pt-1 flex justify-end">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 text-xs hover:bg-[var(--muted)] flex items-center gap-1"
                          style={{ color: "var(--primary)" }}
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
          ))
        )}
      </div>

      {!loading && filteredConversations.length === 0 && (
        <Card className="py-12">
          <CardContent className="flex flex-col items-center justify-center text-center p-6">
            <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <Mail className="h-6 w-6 text-gray-500" />
            </div>
            <h3 className="font-medium text-lg">No Messages Yet</h3>
            <p className="text-sm text-muted-foreground mt-2 max-w-md">
              When you contact users, your conversations will appear here.
            </p>
            <Button
              className="mt-4"
              style={{
                background: "var(--primary)",
                color: "var(--primary-foreground)",
              }}
            >
              Browse Users
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
