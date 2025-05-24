"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { io, Socket } from "socket.io-client";
import axios from "axios";
import { safeUrl } from "@/app/udayee/projects/[id]/manage/page";
// Use a ref to store the socket instance to prevent recreating it on rerenders
let socketInstance: Socket | null = null;

// Initialize the socket only on the client side
if (typeof window !== "undefined" && !socketInstance) {
  socketInstance = io({
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    timeout: 20000,
  });
}

interface Message {
  id: string;
  content: string;
  sender: string;
  receiver: string;
  createdAt: string;
  image?: string;
}

interface ChatInterfaceProps {
  project: string;
  recipientId: string;
  recipientType: string;
  userType: string;
  currentUserId?: string;
}
const ChatHeader = ({ recipient }: { recipient: any }) => {
  return (
    <div className="p-4 border-b border-border flex items-center gap-3">
      <div className="w-10 h-10 rounded-full overflow-hidden bg-muted relative">
        {recipient?.profile_picture ? (
          <Image
            src={safeUrl(recipient.profile_picture)}
            alt={recipient.name || "User"}
            width={40}
            height={40}
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            {(recipient?.name?.charAt(0) || "U").toUpperCase()
            }
          </div>
        )}
        {recipient?.status && (
          <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${recipient.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
        )}
      </div>
      <div>
        <h3 className="font-medium">{recipient?.name || "User"}</h3>
        <p className="text-xs text-muted-foreground">
          {recipient?.status === 'online' ? "Online" : "Offline"}
        </p>
      </div>
    </div>
  );
};
const MessageInput = ({
  onSendMessage,
}: {
  onSendMessage: (text: string, image?: File) => void;
}) => {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() || image) {
      onSendMessage(message, image || undefined);
      setMessage("");
      setImage(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 border-t border-border">
      {image && (
        <div className="mb-2 relative">
          <Image
            src={URL.createObjectURL(image)}
            alt="Image preview"
            width={100}
            height={100}
            className="rounded-md"
          />
          <button
            onClick={() => setImage(null)}
            className="absolute top-1 right-1 bg-foreground rounded-full p-1 text-background text-xs"
            type="button"
          >
            ✕
          </button>
        </div>
      )}
      <div className="flex gap-2">
        <label className="cursor-pointer text-muted-foreground hover:text-foreground">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files && setImage(e.target.files[0])}
          />
        </label>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 px-4 py-2 rounded-full border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          placeholder="Type a message..."
        />
        <button
          type="submit"
          className="bg-primary text-primary-foreground rounded-full p-2 hover:opacity-90 disabled:opacity-50"
          disabled={!message.trim() && !image}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
        </button>
      </div>
    </form>
  );
};

const ChatInterface = ({
  project,
  recipientId,
  recipientType,
  userType,
  currentUserId,
}: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recipient, setRecipient] = useState<any>({
    status: 'offline',
    name: "Loading...",
    profile_picture: null
  });
  const [socketConnected, setSocketConnected] = useState(false);
  const [connectionAttempted, setConnectionAttempted] = useState(false);
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const messageContainerRef = useRef<HTMLDivElement | null>(null);

  // Connect to socket and join appropriate room
  useEffect(() => {
    if (!socketInstance) return;

    // Handle socket connection events
    const handleConnect = () => {
      console.log("Socket connected with ID:", socketInstance?.id);
      setSocketConnected(true);

      // Join appropriate room based on user type
      if (currentUserId) {
        const joinData =
          userType === "user"
            ? { userId: currentUserId }
            : { investorId: currentUserId };

        console.log("Joining room with data:", joinData);
        socketInstance.emit("join", joinData);

        // Check recipient status
        socketInstance.emit("checkUserStatus", {
          userType: recipientType,
          userId: recipientId
        });
      }
    };

    const handleDisconnect = (reason: string) => {
      console.log("Socket disconnected:", reason);
      setSocketConnected(false);
    };

    const handleConnectError = (error: Error) => {
      console.error("Connection error:", error);
      setSocketConnected(false);
    };

    // Set up connection event listeners
    socketInstance.on("connect", handleConnect);
    socketInstance.on("disconnect", handleDisconnect);
    socketInstance.on("connect_error", handleConnectError);

    // Check if socket is already connected
    if (socketInstance.connected) {
      console.log("Socket already connected");
      setSocketConnected(true);

      // Join room if already connected
      if (currentUserId) {
        const joinData =
          userType === "user"
            ? { userId: currentUserId }
            : { investorId: currentUserId };

        console.log("Joining room with existing connection:", joinData);
        socketInstance.emit("join", joinData);
      }
    } else {
      console.log("Attempting to connect socket...");
      setConnectionAttempted(true);
      socketInstance.connect();
    }

    // Cleanup event listeners on unmount
    return () => {
      socketInstance?.off("connect", handleConnect);
      socketInstance?.off("disconnect", handleDisconnect);
      socketInstance?.off("connect_error", handleConnectError);
    };
  }, [currentUserId, userType, recipientId, recipientType]);

  useEffect(() => {
    if (!socketInstance) return;

    // Handle user status updates
    const handleUserStatus = (statusData: { type: string, id: string, status: 'online' | 'offline' }) => {
      console.log("User status update:", statusData);

      // Check if update is for our recipient
      if (statusData.type === recipientType && statusData.id === recipientId) {
        setRecipient(prev => ({
          ...prev,
          status: statusData.status
        }));
      }
    };

    // Handle response to our status check
    const handleStatusResponse = (statusData: { type: string, id: string, status: 'online' | 'offline' }) => {
      console.log("Status response:", statusData);

      if (statusData.type === recipientType && statusData.id === recipientId) {
        setRecipient(prev => ({
          ...prev,
          status: statusData.status
        }));
      }
    };

    socketInstance.on("userStatus", handleUserStatus);
    socketInstance.on("userStatusResponse", handleStatusResponse);

    return () => {
      socketInstance?.off("userStatus", handleUserStatus);
      socketInstance?.off("userStatusResponse", handleStatusResponse);
    };
  }, [recipientId, recipientType]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Get messages
        const res = await axios.get("/api/messages", {
          params: {
            projectId: project,
          },
        });
        setMessages(res.data);

        // Fetch recipient details - with debug logging
        if (recipientId) {
          console.log(`Fetching ${recipientType} details with ID: ${recipientId}`);
          try {
            const recipientRes = await axios.get(`/api/${recipientType}/${recipientId}`);
            console.log("Recipient data received:", recipientRes.data);

            if (recipientRes.data) {
              setRecipient(prev => ({
                ...prev,
                ...recipientRes.data,
                // Handle both camelCase and snake_case property names
                name: recipientRes.data.name || "Unknown",
                profile_picture: recipientRes.data.profile_picture || recipientRes.data.profile_picture,
              }));
            }
          } catch (e) {
            console.error(`Could not fetch ${recipientType} details:`, e);
            // Set a fallback name based on recipient type
            setRecipient(prev => ({
              ...prev,
              name: recipientType === 'user' ? 'User' : 'Investor'
            }));
          }
        }
      } catch (error) {
        console.error("Error fetching chat data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (recipientId) {
      fetchData();
    }
  }, [recipientId, recipientType, currentUserId, project]);

  // Debugging effect to monitor recipient state changes
  useEffect(() => {
    console.log("Recipient state updated:", recipient);
  }, [recipient]);

  useEffect(() => {
    if (messageContainerRef.current && messages.length > 0) {
      const scrollContainer = messageContainerRef.current;

      // Use requestAnimationFrame for smoother scrolling after DOM updates
      requestAnimationFrame(() => {
        // Add a small delay to ensure all content is rendered
        setTimeout(() => {
          scrollContainer.scrollTop = scrollContainer.scrollHeight;
        }, 200);
      });
    }
  }, [messages]);

  // Add a new effect specifically for handling initial load and refreshes
  useEffect(() => {
    if (!isLoading && messageContainerRef.current && messages.length > 0) {
      const scrollContainer = messageContainerRef.current;

      // Ensure scroll happens after loading is complete and DOM is updated
      const scrollToBottom = () => {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      };

      // Try multiple times with increasing delays to handle different rendering scenarios
      setTimeout(scrollToBottom, 100);
      setTimeout(scrollToBottom, 300);
      setTimeout(scrollToBottom, 500);
    }
  }, [isLoading, messages.length]);

  useEffect(() => {
    if (!socketInstance) return;

    const handleNewMessage = (newMessage: Message) => {
      console.log("Received new message:", newMessage);

      // Check if this message is relevant to the current chat
      const isRelevantMessage =
        (newMessage.sender === userType && newMessage.receiver === recipientType) ||
        (newMessage.sender === recipientType && newMessage.receiver === userType);

      if (isRelevantMessage) {
        setMessages((prev) => {
          // Check if message is already in the array (prevent duplicates)
          if (prev.some((msg) => msg.id === newMessage.id)) {
            return prev;
          }
          return [...prev, newMessage];
        });
      }
    };

    socketInstance.on("newMessage", handleNewMessage);

    return () => {
      socketInstance?.off("newMessage", handleNewMessage);
    };
  }, [userType, recipientType]);

  const handleSendMessage = async (text: string, image?: File) => {
    // Changed the connection check to be more permissive while still showing an error
    if (!socketInstance) {
      console.error("Socket instance not available");
      alert("Connection to chat server not available. Please refresh the page.");
      return;
    }

    // if (!socketConnected && connectionAttempted) {
    //   console.warn("Socket attempting to reconnect. Proceeding with sending message...");
    //   // We'll still try to send the message even if the socket isn't connected yet
    // }

    const messageData = {
      content: text,
      projectId: project,
      senderType: userType,
      receiverType: recipientType,
      senderUserId: userType === "user" ? Number(currentUserId) : null,
      senderInvestorId: userType === "investor" ? Number(currentUserId) : null,
      receiverUserId: recipientType === "user" ? Number(recipientId) : null,
      receiverInvestorId: recipientType === "investor" ? Number(recipientId) : null,
    };
    console.log("Sending message data:", messageData);

    // Add temporary message to the UI immediately
    const tempMessage: Message = {
      id: `temp-${Date.now()}`,
      content: text,
      sender: userType,
      receiver: recipientType,
      createdAt: new Date().toISOString(),
      image: image ? URL.createObjectURL(image) : undefined,
    };

    // Add temp message to UI
    setMessages(prev => [...prev, tempMessage]);

    // Emit message via socket
    socketInstance?.emit("message", messageData);

    // Listen for error response
    socketInstance?.once("messageError", (error) => {
      console.error("Failed to send message:", error);
      // Remove the temporary message if there was an error
      setMessages((prev) => prev.filter((msg) => msg.id !== tempMessage.id));
      alert("Failed to send message. Please try again.");
    });

    // Handle image upload if needed (you might need to implement this)
    // if (image) {
    //   // Example: Upload image to server
    //   try {
    //     const formData = new FormData();
    //     formData.append("image", image);
    //     formData.append("messageId", tempMessage.id);

    //     // You would need to implement this API endpoint
    //     // await axios.post('/api/upload-image', formData);

    //     console.log("Would upload image:", image.name);
    //   } catch (error) {
    //     console.error("Failed to upload image:", error);
    //   }
    // }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col h-[70vh] border border-border rounded-lg overflow-hidden">
        <div className="animate-pulse">
          <div className="p-4 border-b border-border flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-muted"></div>
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded w-24"></div>
              <div className="h-3 bg-muted rounded w-16"></div>
            </div>
          </div>
        </div>
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"
                }`}
            >
              <div className="w-8 h-8 rounded-full bg-muted mr-2"></div>
              <div
                className={`h-16 rounded-lg bg-muted ${i % 2 === 0 ? "w-64" : "w-48"
                  }`}
              ></div>
            </div>
          ))}
        </div>
        <div className="p-3 border-t border-border">
          <div className="flex gap-2">
            <div className="w-6 h-6 bg-muted rounded-full"></div>
            <div className="flex-1 h-10 bg-muted rounded-full"></div>
            <div className="w-10 h-10 bg-muted rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[70vh] border border-border rounded-lg overflow-hidden shadow-md">
      <ChatHeader recipient={recipient} />
      <div
        ref={messageContainerRef}
        className="flex-1 p-4 space-y-4 overflow-y-auto"
        style={{ scrollBehavior: "smooth" }}
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === userType
              ? "justify-end"
              : "justify-start"
              }`}
          >
            {message.sender !== userType && (
              <div className="w-8 h-8 rounded-full bg-muted mr-2 flex-shrink-0 overflow-hidden">
                {recipient?.profile_picture  ? (
                  <Image
                  src={safeUrl(recipient.profile_picture)}
                  alt={recipient.name || "User"}
                  width={40}
                  height={40}
                  className="object-cover"
                />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                    {recipient?.name?.charAt(0) || "U"}
                  </div>
                )}
              </div>
            )}

            <div
              className={`max-w-[70%] ${message.sender === userType
                ? "bg-primary text-primary-foreground"
                : "bg-accent text-accent-foreground"
                } rounded-lg p-3`}
            >
              {message.image && (
                <div className="mb-2">
                  <Image
                    src={message.image}
                    alt="Attachment"
                    width={200}
                    height={150}
                    className="rounded-md"
                  />
                </div>
              )}
              <p>{message.content}</p>
              <div className="text-right">
                <span
                  className={`text-xs ${message.sender === userType
                    ? "opacity-75"
                    : "opacity-75"
                    }`}
                >
                  {formatDistanceToNow(new Date(message.createdAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>
            </div>

            {message.sender === userType && (
              <div className="w-8 h-8 rounded-full bg-muted ml-2 flex-shrink-0">
                <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                  Me
                </div>
              </div>
            )}
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>

      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatInterface;
