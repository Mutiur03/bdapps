"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, Search, ArrowUpRight, Mail } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

// Initialize socket instance
let socketInstance: Socket | null = null;

if (typeof window !== "undefined" && !socketInstance) {
  socketInstance = io({
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    timeout: 20000,
  });
}

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
  const [currentAdminId, setCurrentAdminId] = useState<string | null>(null);

  useEffect(() => {
    // Get current admin ID from session/auth
    const getCurrentAdmin = async () => {
      try {
        const response = await axios.get('/api/admin/me');
        if (response.data.role === 'admin') {
          setCurrentAdminId(response.data.id.toString());
        }
      } catch (error) {
        console.error('Error getting current admin:', error);
      }
    };

    getCurrentAdmin();
  }, []);

  useEffect(() => {
    if (!socketInstance || !currentAdminId) return;

    const handleConnect = () => {
      console.log("Admin messages socket connected");
      socketInstance?.emit("join", { adminId: currentAdminId });
    };

    const handleMessageListUpdate = (updateData: any) => {
      console.log("Message list update received in admin:", updateData);

      setConversations((prevConversations) => {
        const existingConversationIndex = prevConversations.findIndex(
          conv => conv.id === updateData.projectId
        );

        if (existingConversationIndex >= 0) {
          const updatedConversations = [...prevConversations];
          const conv = updatedConversations[existingConversationIndex];

          // Determine if this is a new message
          const isNewMessage = updateData.lastMessage &&
            (!conv.lastMessage ||
              new Date(updateData.lastMessage.timestamp).getTime() > new Date(conv.lastMessage.timestamp).getTime());

          let newUnreadCount = conv.unreadCount;
          let hasUnread = conv.hasUnread;

          if (isNewMessage) {
            // Check if message is from user to this admin - be more flexible with data structure
            const isSenderUser = updateData.senderUserId || updateData.senderUser?.id || updateData.user?.id;
            const isReceiverThisAdmin = updateData.receiverAdminId?.toString() === currentAdminId?.toString() ||
              updateData.receiverAdmin?.id?.toString() === currentAdminId?.toString();
            const isSenderThisAdmin = updateData.senderAdminId?.toString() === currentAdminId?.toString() ||
              updateData.senderAdmin?.id?.toString() === currentAdminId?.toString();

            console.log("Message update check:", {
              isSenderUser: !!isSenderUser,
              isReceiverThisAdmin,
              isSenderThisAdmin,
              currentAdminId,
              updateData
            });

            if (isSenderUser && isReceiverThisAdmin && !isSenderThisAdmin) {
              newUnreadCount = (conv.unreadCount || 0) + 1;
              hasUnread = true;
              console.log("Incrementing unread count for user message to:", newUnreadCount);
            }
          }
          else if (updateData.markAsRead && (updateData.readByAdminId?.toString() === currentAdminId?.toString() || updateData.readByAdmin?.id?.toString() === currentAdminId?.toString())) {
            newUnreadCount = 0;
            hasUnread = false;
            console.log("Marking messages as read, resetting unread count");
          }

          updatedConversations[existingConversationIndex] = {
            ...conv,
            lastMessage: updateData.lastMessage || conv.lastMessage,
            hasUnread: hasUnread,
            unreadCount: newUnreadCount
          };

          return updatedConversations.sort((a, b) => {
            const aTime = a.lastMessage ? new Date(a.lastMessage.timestamp).getTime() : 0;
            const bTime = b.lastMessage ? new Date(b.lastMessage.timestamp).getTime() : 0;
            return bTime - aTime;
          });
        } else if (updateData.lastMessage) {
          // Check if this is a new conversation from user to this admin
          const isSenderUser = updateData.senderUserId || updateData.senderUser?.id || updateData.user?.id;
          const isReceiverThisAdmin = updateData.receiverAdminId?.toString() === currentAdminId?.toString() ||
            updateData.receiverAdmin?.id?.toString() === currentAdminId?.toString();

          if (isSenderUser && isReceiverThisAdmin) {
            // Add new conversation only if user is messaging this admin
            const newConversation: Conversation = {
              id: updateData.projectId,
              title: updateData.project?.title || "Project",
              user: {
                id: (updateData.senderUser?.id || updateData.user?.id || "unknown").toString(),
                name: updateData.senderUser?.name || updateData.user?.name || "User",
                startup: updateData.project?.title || "Project",
                profile_picture: updateData.senderUser?.profile_picture || updateData.user?.profile_picture || ""
              },
              lastMessage: updateData.lastMessage,
              hasUnread: true,
              unreadCount: 1
            };

            return [newConversation, ...prevConversations].sort((a, b) => {
              const aTime = a.lastMessage ? new Date(a.lastMessage.timestamp).getTime() : 0;
              const bTime = b.lastMessage ? new Date(b.lastMessage.timestamp).getTime() : 0;
              return bTime - aTime;
            });
          }
        }

        return prevConversations;
      });
    };

    const handleMessagesMarkedRead = (data: any) => {
      console.log("Messages marked as read notification:", data);

      // Only clear unread count if this admin marked the messages as read
      if (data.adminId === currentAdminId) {
        setConversations((prevConversations) => {
          return prevConversations.map((conv) => {
            if (conv.id === data.projectId) {
              return {
                ...conv,
                hasUnread: false,
                unreadCount: 0,
                lastMessage: conv.lastMessage ? {
                  ...conv.lastMessage,
                  isRead: true
                } : null
              };
            }
            return conv;
          });
        });
      }
    };

    // Enhanced typing indicator handling
    const handleTypingUpdate = (data: any) => {
      // You can add typing indicators here if needed
      console.log("Typing update:", data);
    };

    socketInstance.on("connect", handleConnect);
    socketInstance.on("messageListUpdate", handleMessageListUpdate);
    socketInstance.on("messagesMarkedRead", handleMessagesMarkedRead);
    socketInstance.on("typingUpdate", handleTypingUpdate);

    if (socketInstance.connected) {
      handleConnect();
    }

    return () => {
      socketInstance?.off("connect", handleConnect);
      socketInstance?.off("messageListUpdate", handleMessageListUpdate);
      socketInstance?.off("messagesMarkedRead", handleMessagesMarkedRead);
      socketInstance?.off("typingUpdate", handleTypingUpdate);
    };
  }, [currentAdminId]);

  const fetchConversations = async () => {
    try {
      const res = await axios.get("/api/admin/conversations");
      console.log("Admin conversations data:", res.data);
      setConversations(res.data);
    } catch (error) {
      console.error("Error fetching conversations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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
                            {conversation.user?.name || "Unknown User"}{conversation.title ? ` - ${conversation.title}` : ""}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            {conversation.title || "Unknown Startup"}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {(conversation.hasUnread || (conversation.unreadCount && conversation.unreadCount > 0)) && (
                            <span
                              className="text-xs w-6 h-6 rounded-full flex items-center justify-center font-medium"
                              style={{
                                background: "var(--primary)",
                                color: "var(--primary-foreground)",
                              }}
                            >
                              {conversation.unreadCount && conversation.unreadCount > 99 ? '99+' : conversation.unreadCount || 1}
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
