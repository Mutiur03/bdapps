"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { MessageSquare, Search, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import safeUrl from "@/lib/safeURL";
import { io, Socket } from "socket.io-client";

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

export function UdayeeMessages() {

  interface Conversation {
    id: string;
    title?: string;
    project?: {
      id: string;
      title?: string;
    };
    admin: {
      id: string;
      name: string;
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

  const [conversations, setConversations] = useState<Conversation[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [searchTerm, setSearchTerm] = useState("");
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    // Get current user ID from session/auth
    const getCurrentUser = async () => {
      try {
        const response = await axios.get('/api/user/me');
        if (response.data.role === 'user') {
          setCurrentUserId(response.data.id.toString());
        }
      } catch (error) {
        console.error('Error getting current user:', error);
      }
    };

    getCurrentUser();
  }, []);

  useEffect(() => {
    if (!socketInstance || !currentUserId) return;

    const handleConnect = () => {
      console.log("User messages socket connected");
      socketInstance?.emit("join", { userId: currentUserId });
    };

    const handleMessageListUpdate = (updateData: any) => {
      // Similar logic as admin-messages for updating last message and unread count
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

          let newUnreadCount = conv.unreadCount || 0;
          let hasUnread = conv.hasUnread;

          if (isNewMessage) {
            // Check if message is from admin to this user
            const isSenderAdmin = updateData.senderAdminId || updateData.senderAdmin?.id || updateData.admin?.id;
            const isReceiverThisUser = updateData.receiverUserId?.toString() === currentUserId?.toString() ||
              updateData.receiverUser?.id?.toString() === currentUserId?.toString();

            if (isSenderAdmin && isReceiverThisUser) {
              newUnreadCount = (conv.unreadCount || 0) + 1;
              hasUnread = true;
            }
          } else if (updateData.markAsRead && (updateData.readByUserId?.toString() === currentUserId?.toString() || updateData.readByUser?.id?.toString() === currentUserId?.toString())) {
            newUnreadCount = 0;
            hasUnread = false;
          }

          // Fix sentByMe logic - check if the sender is the current user
          let lastMessage = updateData.lastMessage || conv.lastMessage;
          if (lastMessage && updateData.lastMessage) {
            const senderId = updateData.senderUserId || updateData.senderUser?.id;
            lastMessage = {
              ...lastMessage,
              sentByMe: senderId?.toString() === currentUserId?.toString()
            };
          }

          updatedConversations[existingConversationIndex] = {
            ...conv,
            lastMessage: lastMessage,
            hasUnread: hasUnread,
            unreadCount: newUnreadCount
          };

          return updatedConversations.sort((a, b) => {
            const aTime = a.lastMessage ? new Date(a.lastMessage.timestamp).getTime() : 0;
            const bTime = b.lastMessage ? new Date(b.lastMessage.timestamp).getTime() : 0;
            return bTime - aTime;
          });
        } else if (updateData.lastMessage) {
          // New conversation from admin to this user
          const isSenderAdmin = updateData.senderAdminId || updateData.senderAdmin?.id || updateData.admin?.id;
          const isReceiverThisUser = updateData.receiverUserId?.toString() === currentUserId?.toString() ||
            updateData.receiverUser?.id?.toString() === currentUserId?.toString();

          if (isSenderAdmin && isReceiverThisUser) {
            // Fix sentByMe for new conversations
            const senderId = updateData.senderUserId || updateData.senderUser?.id;
            const lastMessage = {
              ...updateData.lastMessage,
              sentByMe: senderId?.toString() === currentUserId?.toString()
            };

            const newConversation: Conversation = {
              id: updateData.projectId,
              project: updateData.project ? {
                id: updateData.project.id || updateData.projectId,
                title: updateData.project.title || "Untitled Project"
              } : undefined,
              admin: {
                id: (updateData.senderAdmin?.id || updateData.senderAdminId || "unknown").toString(),
                name: updateData.senderAdmin?.name || "Admin",
                profile_picture: updateData.senderAdmin?.profile_picture || ""
              },
              lastMessage: lastMessage,
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

    // Enhanced typing indicator handling
    const handleTypingUpdate = (data: any) => {
      // You can add typing indicators here if needed
      console.log("Typing update:", data);
    };

    socketInstance.on("connect", handleConnect);
    socketInstance.on("messageListUpdate", handleMessageListUpdate);
    socketInstance.on("typingUpdate", handleTypingUpdate);

    if (socketInstance.connected) {
      handleConnect();
    }

    return () => {
      socketInstance?.off("connect", handleConnect);
      socketInstance?.off("messageListUpdate", handleMessageListUpdate);
      socketInstance?.off("typingUpdate", handleTypingUpdate);
    };
  }, [currentUserId]);

  const fetchConversations = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/user/project/msg");
      console.log("User conversations data:", response.data);

      // Enhanced debugging to understand data structure
      if (response.data && response.data.length > 0) {
        console.log("First conversation keys:", Object.keys(response.data[0]));
        console.log("Sample conversation:", JSON.stringify(response.data[0], null, 2));

        // Check for different possible project field names
        const firstConv = response.data[0];
        console.log("Checking project fields:", {
          project: firstConv.project,
          Project: firstConv.Project,
          projectData: firstConv.projectData,
          projectName: firstConv.projectName,
          title: firstConv.title
        });
      }

      setConversations(response.data)
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
      conv.admin?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.project?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const MessageSkeleton = () => (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="flex-1 space-y-2">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <Skeleton className="h-4 w-32" />
              </div>
              <Skeleton className="h-6 w-6 rounded-full" />
            </div>
            <div className="space-y-1">
              <Skeleton className="h-3 w-48" />
              <Skeleton className="h-3 w-20" />
            </div>
            <div className="pt-1 flex justify-end">
              <Skeleton className="h-7 w-20" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
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
        <p className="text-muted-foreground">Communicate for your investment</p>
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
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <MessageSkeleton key={i} />
            ))}
          </div>
        ) : (
          filteredConversations.map((conversation) => (
            <Link
              key={conversation.id}
              href={`/udayee/chat/${conversation.id}/${conversation.admin?.id || 'unknown'}`}
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
                        src={safeUrl(conversation?.admin?.profile_picture)}
                        alt={conversation?.admin?.name}
                        className="object-cover"
                      />
                      <AvatarFallback>
                        {conversation?.admin?.name
                          ? conversation?.admin?.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                          : "UN"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">
                            {conversation.admin?.name}
                            {conversation.project?.title && ` - ${conversation.project.title}`}
                          </h3>
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

      {!loading && conversations.length === 0 && (
        <Card className="py-12">
          <CardContent className="flex flex-col items-center justify-center text-center p-6">
            <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <MessageSquare className="h-6 w-6 text-gray-500" />
            </div>
            <h3 className="font-medium text-lg">No Messages Yet</h3>
            <p className="text-sm text-muted-foreground mt-2 max-w-md">
              When admin contact you about your startup, your conversations
              will appear here.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}