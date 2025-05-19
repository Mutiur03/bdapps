"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";

interface Message {
  id: string;
  text: string;
  senderId: string;
  recipientId: string;
  createdAt: string;
  image?: string;
}

interface ChatInterfaceProps {
  recipientId: string;
  recipientType: string;
  userType: string;
  currentUserId?: string;
}

// Chat Header Component
const ChatHeader = ({ recipient }: { recipient: any }) => {
  return (
    <div className="p-4 border-b border-border flex items-center gap-3">
      <div className="w-10 h-10 rounded-full overflow-hidden bg-muted">
        {recipient?.profilePicture ? (
          <Image
            src={recipient.profilePicture}
            alt={recipient.name || "User"}
            width={40}
            height={40}
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            {(recipient?.name?.charAt(0) || "U").toUpperCase()}
          </div>
        )}
      </div>
      <div>
        <h3 className="font-medium">{recipient?.name || "User"}</h3>
        <p className="text-xs text-muted-foreground">
          {recipient?.status || "Offline"}
        </p>
      </div>
    </div>
  );
};

// Message Input Component
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
  recipientId,
  recipientType,
  userType,
  currentUserId = "user-123",
}: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [recipient, setRecipient] = useState<any>(null);
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const messageContainerRef = useRef<HTMLDivElement | null>(null);

  // Fetch messages and recipient data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Simulate API call - replace with actual API calls
        setTimeout(() => {
          setRecipient({
            id: recipientId,
            name: `User ${recipientId.substring(0, 5)}`,
            status: "Online",
          });

          // Simulate message data
          setMessages([
            {
              id: "msg1",
              text: "Hello there!",
              senderId: currentUserId,
              recipientId: recipientId,
              createdAt: new Date(Date.now() - 3600000).toISOString(),
            },
            {
              id: "msg2",
              text: "Hi! How can I help you today?",
              senderId: recipientId,
              recipientId: currentUserId,
              createdAt: new Date(Date.now() - 3500000).toISOString(),
            },
            {
              id: "msg3",
              text: "I have a question about my account.",
              senderId: currentUserId,
              recipientId: recipientId,
              createdAt: new Date(Date.now() - 3400000).toISOString(),
            },
          ]);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching chat data:", error);
        setIsLoading(false);
      }
    };

    if (recipientId) {
      fetchData();
    }
  }, [recipientId, currentUserId]);

  // Modified auto-scroll to latest message
  useEffect(() => {
    if (messageContainerRef.current) {
      const scrollContainer = messageContainerRef.current;
      // Use a short timeout to ensure DOM updates are complete
      setTimeout(() => {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }, 100);
    }
  }, [messages]);

  const handleSendMessage = (text: string, image?: File) => {
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      text: text,
      senderId: currentUserId,
      recipientId: recipientId,
      createdAt: new Date().toISOString(),
      image: image ? URL.createObjectURL(image) : undefined,
    };

    setMessages([...messages, newMessage]);
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
              className={`flex ${
                i % 2 === 0 ? "justify-start" : "justify-end"
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-muted mr-2"></div>
              <div
                className={`h-16 rounded-lg bg-muted ${
                  i % 2 === 0 ? "w-64" : "w-48"
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
            className={`flex ${
              message.senderId === currentUserId
                ? "justify-end"
                : "justify-start"
            }`}
          >
            {message.senderId !== currentUserId && (
              <div className="w-8 h-8 rounded-full bg-muted mr-2 flex-shrink-0 overflow-hidden">
                {recipient?.profilePicture ? (
                  <Image
                    src={recipient.profilePicture}
                    alt="Profile"
                    width={32}
                    height={32}
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
              className={`max-w-[70%] ${
                message.senderId === currentUserId
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
              <p>{message.text}</p>
              <div className="text-right">
                <span
                  className={`text-xs ${
                    message.senderId === currentUserId
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

            {message.senderId === currentUserId && (
              <div className="w-8 h-8 rounded-full bg-muted ml-2 flex-shrink-0">
                {/* Current user avatar placeholder */}
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
