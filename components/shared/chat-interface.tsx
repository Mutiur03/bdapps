"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { io, Socket } from "socket.io-client";
import axios from "axios";
import safeUrl from "@/lib/safeURL";
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

interface Message {
  id: string;
  content: string;
  sender: string;
  receiver: string;
  createdAt: string;
  image?: string;
}

interface MilestoneRequest {
  id: number;
  description: string;
  amount: number;
  status: string;
  createdAt: string;
  userId: number;
}

interface CurrentMilestone {
  id: number;
  title: string;
  description: string;
  amount: number;
  status: string;
  progress?: number;
  deadlineAt?: string;
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
      </div>
      <div>
        <h3 className="font-medium">{recipient?.name || "User"}</h3>
      </div>
    </div>
  );
};
const MilestoneRequestForm = ({
  isOpen,
  onClose,
  onSubmit
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (description: string, amount: number) => void;
}) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim() && amount.trim()) {
      onSubmit(description, Number(amount));
      setDescription("");
      setAmount("");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-background p-6 rounded-lg border border-border max-w-md w-full mx-4">
        <h3 className="text-lg font-semibold mb-4">Request Milestone</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Describe the milestone..."
              rows={3}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Amount ($)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Enter amount"
              min="0"
              step="0.01"
              required
            />
          </div>
          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-input rounded-md hover:bg-accent"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const MilestoneDetailModal = ({
  milestone,
  isOpen,
  onClose,
  userType,
  onComplete,
  onApprove,
  onDecline
}: {
  milestone: CurrentMilestone;
  isOpen: boolean;
  onClose: () => void;
  userType: string;
  onComplete?: (id: number) => void;
  onApprove?: (id: number, deadline?: string) => void;
  onDecline?: (id: number, reason?: string) => void;
}) => {
  const [declineReason, setDeclineReason] = useState("");
  const [showDeclineInput, setShowDeclineInput] = useState(false);
  const [deadline, setDeadline] = useState("");
  const [showApprovalForm, setShowApprovalForm] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setDeclineReason("");
      setShowDeclineInput(false);
      setDeadline("");
      setShowApprovalForm(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'planned':
        return 'bg-yellow-100 text-yellow-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-background p-6 rounded-lg border border-border max-w-md w-full mx-4">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold">Milestone Details</h3>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <p className="text-sm bg-muted p-2 rounded">{milestone.title}</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <p className="text-sm bg-muted p-2 rounded">{milestone.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Amount</label>
              <p className="text-sm bg-muted p-2 rounded font-medium">${milestone.amount}</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(milestone.status)}`}>
                {milestone.status.replace('_', ' ').toUpperCase()}
              </span>
            </div>
          </div>

          {milestone.deadlineAt && (
            <div>
              <label className="block text-sm font-medium mb-1">Deadline</label>
              <p className="text-sm bg-muted p-2 rounded">
                {new Date(milestone.deadlineAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          )}

          {showDeclineInput && (
            <div>
              <label className="block text-sm font-medium mb-1">Decline Reason (Optional)</label>
              <textarea
                value={declineReason}
                onChange={(e) => setDeclineReason(e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Reason for declining..."
                rows={3}
              />
            </div>
          )}

          {showApprovalForm && (
            <div>
              <label className="block text-sm font-medium mb-1">Set Deadline *</label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                min={new Date().toISOString().split('T')[0]}
                required
              />
              <p className="text-xs text-muted-foreground mt-1">
                Please set a deadline for this milestone approval
              </p>
            </div>
          )}

          <div className="flex justify-end gap-2 mt-6">
            <button
              onClick={() => {
                setShowApprovalForm(false);
                setShowDeclineInput(false);
                setDeadline("");
                setDeclineReason("");
                onClose();
              }}
              className="px-4 py-2 border border-input rounded-md hover:bg-accent"
            >
              {showApprovalForm || showDeclineInput ? 'Cancel' : 'Close'}
            </button>
            {userType === "admin" && milestone.status === "planned" && (
              <>
                {!showDeclineInput && !showApprovalForm ? (
                  <>
                    <button
                      onClick={() => setShowDeclineInput(true)}
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                      Decline
                    </button>
                    <button
                      onClick={() => setShowApprovalForm(true)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Approve
                    </button>
                  </>
                ) : showDeclineInput ? (
                  <button
                    onClick={() => {
                      onDecline && onDecline(milestone.id, declineReason);
                      setShowDeclineInput(false);
                      setDeclineReason("");
                      onClose();
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    Confirm Decline
                  </button>
                ) : showApprovalForm ? (
                  <button
                    onClick={() => {
                      if (!deadline || deadline.trim() === "") {
                        alert("Please set a deadline for this milestone before approving");
                        return;
                      }
                      onApprove && onApprove(milestone.id, deadline);
                      setShowApprovalForm(false);
                      setDeadline("");
                      onClose();
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    disabled={!deadline || deadline.trim() === ""}
                  >
                    Confirm Approval
                  </button>
                ) : null}
              </>
            )}
            {userType === "admin" && milestone.status === "in-progress" && onComplete && (
              <button
                onClick={() => {
                  onComplete(milestone.id);
                  onClose();
                }}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Mark Complete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const CurrentMilestoneDisplay = ({
  milestone,
  userType,
  onComplete,
  onClick
}: {
  milestone: CurrentMilestone;
  userType: string;
  onComplete?: (id: number) => void;
  onClick: () => void;
}) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'planned':
        return 'bg-yellow-100 text-yellow-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="border-b border-border p-3 bg-blue-50/30">
      <div
        className="bg-background p-3 rounded-md border border-border cursor-pointer hover:bg-accent/50 transition-colors"
        onClick={onClick}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h5 className="font-medium text-sm truncate">{milestone.title}</h5>
              <span className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${getStatusColor(milestone.status)}`}>
                {milestone.status.replace('_', ' ').toUpperCase()}
              </span>
            </div>
            <p className="text-xs text-muted-foreground truncate mt-1">{milestone.description}</p>
          </div>
          <div className="flex items-center gap-2 ml-2">
            <span className="text-sm font-medium whitespace-nowrap">${milestone.amount}</span>
            <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

const MessageInput = ({
  onSendMessage,
  userType,
  onRequestMilestone,
}: {
  onSendMessage: (text: string, image?: File) => void;
  userType: string;
  onRequestMilestone?: () => void;
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

        {userType === "user" && onRequestMilestone && (
          <button
            type="button"
            onClick={onRequestMilestone}
            className="text-muted-foreground hover:text-foreground"
            title="Request Milestone"
          >
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
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
        )}

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
  const [milestoneRequests, setMilestoneRequests] = useState<MilestoneRequest[]>([]);
  const [showMilestoneForm, setShowMilestoneForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [recipient, setRecipient] = useState<any>({
    name: "Loading...",
    profile_picture: null
  });
  const [socketConnected, setSocketConnected] = useState(false);
  const [currentMilestone, setCurrentMilestone] = useState<CurrentMilestone | null>(null);
  const [hasIncompleteMilestones, setHasIncompleteMilestones] = useState(false);
  const [showMilestoneDetail, setShowMilestoneDetail] = useState(false);
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const messageContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!socketInstance) return;

    const handleConnect = () => {
      console.log("Socket connected with ID:", socketInstance?.id);
      setSocketConnected(true);

      if (currentUserId) {
        const joinData = userType === "user"
          ? { userId: currentUserId }
          : { adminId: currentUserId };

        console.log("Joining room with data:", joinData);
        socketInstance.emit("join", joinData);
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

    const handleMilestoneUpdate = (updateData: any) => {
      console.log("Received milestone update:", updateData);

      if (updateData.projectId !== project) return;

      refreshMilestoneData();
    };

    socketInstance.on("connect", handleConnect);
    socketInstance.on("disconnect", handleDisconnect);
    socketInstance.on("connect_error", handleConnectError);
    socketInstance.on("milestoneUpdate", handleMilestoneUpdate);

    if (socketInstance.connected) {
      console.log("Socket already connected");
      setSocketConnected(true);

      if (currentUserId) {
        const joinData = userType === "user"
          ? { userId: currentUserId }
          : { adminId: currentUserId };

        console.log("Joining room with existing connection:", joinData);
        socketInstance.emit("join", joinData);
      }
    } else {
      console.log("Attempting to connect socket...");
      socketInstance.connect();
    }

    return () => {
      socketInstance?.off("connect", handleConnect);
      socketInstance?.off("disconnect", handleDisconnect);
      socketInstance?.off("connect_error", handleConnectError);
      socketInstance?.off("milestoneUpdate", handleMilestoneUpdate);
    };
  }, [currentUserId, userType, project]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get("/api/messages", {
          params: {
            projectId: project,
          },
        });
        setMessages(res.data);

        if (recipientId) {
          console.log(`Fetching ${recipientType} details with ID: ${recipientId}`);
          try {
            const recipientRes = await axios.get(`/api/${recipientType}/${recipientId}`);
            console.log("Recipient data received:", recipientRes.data);

            if (recipientRes.data) {
              setRecipient({
                ...recipientRes.data,
                name: recipientRes.data.name || "Unknown",
                profile_picture: recipientRes.data.profile_picture,
              });
            }
          } catch (e) {
            console.error(`Could not fetch ${recipientType} details:`, e);
            setRecipient({
              name: recipientType === 'user' ? 'User' : 'Admin'
            });
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

  useEffect(() => {
    console.log("Recipient state updated:", recipient);
  }, [recipient]);

  useEffect(() => {
    if (messageContainerRef.current && messages.length > 0) {
      const scrollContainer = messageContainerRef.current;

      requestAnimationFrame(() => {
        setTimeout(() => {
          scrollContainer.scrollTop = scrollContainer.scrollHeight;
        }, 200);
      });
    }
  }, [messages]);

  useEffect(() => {
    if (!isLoading && messageContainerRef.current && messages.length > 0) {
      const scrollContainer = messageContainerRef.current;

      const scrollToBottom = () => {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      };

      setTimeout(scrollToBottom, 100);
      setTimeout(scrollToBottom, 300);
      setTimeout(scrollToBottom, 500);
    }
  }, [isLoading, messages.length]);

  useEffect(() => {
    if (!socketInstance) return;

    const handleNewMessage = (newMessage: Message) => {
      console.log("Received new message:", newMessage);

      const isRelevantMessage =
        (newMessage.sender === userType && newMessage.receiver === recipientType) ||
        (newMessage.sender === recipientType && newMessage.receiver === userType);

      if (isRelevantMessage) {
        setMessages((prev) => {
          // Remove temporary message if this is the server response
          const filteredMessages = prev.filter(msg =>
            !(typeof msg.id === 'string' && msg.id.startsWith('temp-')) ||
            msg.content !== newMessage.content ||
            msg.sender !== newMessage.sender
          );

          // Check if message already exists (avoid duplicates)
          if (filteredMessages.some((msg) => msg.id === newMessage.id)) {
            return filteredMessages;
          }

          return [...filteredMessages, newMessage];
        });
      }
    };

    socketInstance.on("newMessage", handleNewMessage);

    return () => {
      socketInstance?.off("newMessage", handleNewMessage);
    };
  }, [userType, recipientType]);

  const handleSendMessage = async (text: string, image?: File) => {
    if (!socketInstance) {
      console.error("Socket instance not available");
      alert("Connection to chat server not available. Please refresh the page.");
      return;
    }

    // Create temporary message for immediate display
    const tempMessage: Message = {
      id: `temp-${Date.now()}`,
      content: text,
      sender: userType,
      receiver: recipientType,
      createdAt: new Date().toISOString(),
      image: image ? URL.createObjectURL(image) : undefined,
    };

    // Add message immediately to UI for instant feedback
    setMessages((prev) => [...prev, tempMessage]);

    const messageData = {
      content: text,
      projectId: project,
      senderType: userType,
      receiverType: recipientType,
      senderUserId: userType === "user" ? Number(currentUserId) : null,
      senderAdminId: userType === "admin" ? Number(currentUserId) : null,
      receiverUserId: recipientType === "user" ? Number(recipientId) : null,
      receiverAdminId: recipientType === "admin" ? Number(recipientId) : null,
      timestamp: new Date().toISOString()
    };
    console.log("Sending message data:", messageData);

    socketInstance?.emit("message", messageData);

    const messageListUpdateData = {
      projectId: project,
      senderUserId: userType === "user" ? Number(currentUserId) : null,
      senderAdminId: userType === "admin" ? Number(currentUserId) : null,
      receiverUserId: recipientType === "user" ? Number(recipientId) : null,
      receiverAdminId: recipientType === "admin" ? Number(recipientId) : null,
      senderType: userType,
      receiverType: recipientType,
      lastMessage: {
        text: text,
        timestamp: new Date().toISOString(),
        isRead: false,
        sentByMe: false
      },
      project: {
        title: "Project"
      },
      senderUser: userType === "user" ? {
        id: Number(currentUserId),
        name: "Current User",
        profile_picture: ""
      } : null,
      user: userType === "user" ? {
        id: Number(currentUserId),
        name: "Current User",
        profile_picture: ""
      } : null
    };

    console.log("Emitting messageListUpdate:", messageListUpdateData);
    socketInstance?.emit("messageListUpdate", messageListUpdateData);

    socketInstance?.emit("newMessage", {
      ...messageData,
      content: text
    });
  };

  useEffect(() => {
    const fetchMilestoneRequests = async () => {
      try {
        const res = await axios.get("/api/milestones", {
          params: {
            projectId: project,
            action: "requests"
          },
        });
        setMilestoneRequests(res.data);
      } catch (error) {
        console.error("Error fetching milestone requests:", error);
      }
    };

    fetchMilestoneRequests();
  }, [project]);

  useEffect(() => {
    const fetchMilestoneStatus = async () => {
      try {
        const res = await axios.get("/api/milestones", {
          params: { projectId: project },
        });
        const milestones = res.data;

        const incompleteMilestones = milestones.filter((m: any) =>
          m.status !== 'completed' && m.status !== 'declined'
        );

        setHasIncompleteMilestones(incompleteMilestones.length > 0);

        const activeMilestone = milestones
          .filter((m: any) => m.status === 'planned' || m.status === 'in-progress')
          .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];

        if (activeMilestone) {
          setCurrentMilestone({
            id: activeMilestone.id,
            title: activeMilestone.title,
            description: activeMilestone.description,
            amount: activeMilestone.amount,
            status: activeMilestone.status,
            progress: activeMilestone.progress,
            deadlineAt: activeMilestone.deadlineAt,
          });
        } else {
          setCurrentMilestone(null);
        }
      } catch (error) {
        console.error("Error fetching milestone status:", error);
      }
    };

    fetchMilestoneStatus();
  }, [project, milestoneRequests]);

  const refreshMilestoneData = async () => {
    try {
      const requestsRes = await axios.get("/api/milestones", {
        params: {
          projectId: project,
          action: "requests"
        },
      });
      setMilestoneRequests(requestsRes.data);

      const res = await axios.get("/api/milestones", {
        params: { projectId: project },
      });
      const milestones = res.data;

      const incompleteMilestones = milestones.filter((m: any) =>
        m.status !== 'completed' && m.status !== 'declined'
      );

      setHasIncompleteMilestones(incompleteMilestones.length > 0);

      const activeMilestone = milestones
        .filter((m: any) => m.status === 'planned' || m.status === 'in-progress')
        .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];

      if (activeMilestone) {
        setCurrentMilestone({
          id: activeMilestone.id,
          title: activeMilestone.title,
          description: activeMilestone.description,
          amount: activeMilestone.amount,
          status: activeMilestone.status,
          progress: activeMilestone.progress,
          deadlineAt: activeMilestone.deadlineAt,
        });
      } else {
        setCurrentMilestone(null);
      }
    } catch (error) {
      console.error("Error refreshing milestone data:", error);
    }
  };

  const handleMilestoneRequest = async (description: string, amount: number) => {
    try {
      await axios.post("/api/milestones", {
        action: "create",
        projectId: project,
        description,
        amount,
        userId: currentUserId,
      });

      if (socketInstance) {
        socketInstance.emit("milestoneRequest", {
          projectId: project,
          description,
          amount,
          userId: currentUserId,
        });
      }

      refreshMilestoneData();
    } catch (error) {
      console.error("Error creating milestone request:", error);
      alert("Failed to create milestone request");
    }
  };

  const handleApproveMilestone = async (requestId: number, deadline?: string) => {
    try {
      await axios.post("/api/milestones", {
        action: "approve",
        milestoneId: requestId,
        adminId: currentUserId,
        deadline: deadline,
      });

      if (socketInstance) {
        socketInstance.emit("milestoneApproval", {
          projectId: project,
          milestoneId: requestId,
          adminId: currentUserId,
          deadline: deadline,
        });
      }

      refreshMilestoneData();
    } catch (error) {
      console.error("Error approving milestone request:", error);
      alert("Failed to approve milestone request");
    }
  };

  const handleCompleteMilestone = async (milestoneId: number) => {
    try {
      await axios.post("/api/milestones", {
        action: "complete",
        milestoneId: milestoneId,
        adminId: currentUserId,
      });

      if (socketInstance) {
        socketInstance.emit("milestoneCompletion", {
          projectId: project,
          milestoneId: milestoneId,
          adminId: currentUserId,
        });
      }

      refreshMilestoneData();
    } catch (error) {
      console.error("Error completing milestone:", error);
      alert("Failed to complete milestone");
    }
  };

  const handleDeclineMilestone = async (milestoneId: number, reason?: string) => {
    try {
      await axios.post("/api/milestones", {
        action: "decline",
        milestoneId: milestoneId,
        adminId: currentUserId,
        reason: reason,
      });

      if (socketInstance) {
        socketInstance.emit("milestoneDecline", {
          projectId: project,
          milestoneId: milestoneId,
          adminId: currentUserId,
          reason: reason,
        });
      }

      refreshMilestoneData();
    } catch (error) {
      console.error("Error declining milestone:", error);
      alert("Failed to decline milestone");
    }
  };

  useEffect(() => {
    const fetchMilestoneStatus = async () => {
      try {
        const res = await axios.get("/api/milestones", {
          params: { projectId: project },
        });
        const milestones = res.data;

        const incompleteMilestones = milestones.filter((m: any) =>
          m.status !== 'completed' && m.status !== 'declined'
        );

        setHasIncompleteMilestones(incompleteMilestones.length > 0);

        const activeMilestone = milestones
          .filter((m: any) => m.status === 'planned' || m.status === 'in-progress')
          .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];

        if (activeMilestone) {
          setCurrentMilestone({
            id: activeMilestone.id,
            title: activeMilestone.title,
            description: activeMilestone.description,
            amount: activeMilestone.amount,
            status: activeMilestone.status,
            progress: activeMilestone.progress,
            deadlineAt: activeMilestone.deadlineAt,
          });
        } else {
          setCurrentMilestone(null);
        }
      } catch (error) {
        console.error("Error fetching milestone status:", error);
      }
    };

    fetchMilestoneStatus();
  }, [project, milestoneRequests]);

  useEffect(() => {
    const markMessagesAsRead = async () => {
      if (!currentUserId || !project) return;

      try {
        await axios.post('/api/messages/mark-read', {
          projectId: project,
          userType: userType
        });

        if (socketInstance && socketInstance.connected) {
          const markReadData = userType === 'user'
            ? { projectId: project, userId: currentUserId }
            : { projectId: project, adminId: currentUserId };

          console.log("Emitting markMessagesRead with data:", markReadData);
          socketInstance.emit('markMessagesRead', markReadData);
        }
      } catch (error) {
        console.error('Error marking messages as read:', error);
      }
    };

    if (!isLoading && messages.length > 0) {
      markMessagesAsRead();
    }
  }, [isLoading, messages.length, currentUserId, project, userType]);

  useEffect(() => {
    if (!socketInstance) return;

    const handleMessagesMarkedRead = (data: any) => {
      console.log("Messages marked as read:", data);
    };

    socketInstance.on("messagesMarkedRead", handleMessagesMarkedRead);

    return () => {
      socketInstance?.off("messagesMarkedRead", handleMessagesMarkedRead);
    };
  }, []);

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

      {currentMilestone && (
        <CurrentMilestoneDisplay
          milestone={currentMilestone}
          userType={userType}
          onComplete={userType === "admin" ? handleCompleteMilestone : undefined}
          onClick={() => setShowMilestoneDetail(true)}
        />
      )}

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
                {recipient?.profile_picture ? (
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

      <MessageInput
        onSendMessage={handleSendMessage}
        userType={userType}
        onRequestMilestone={
          userType === "user" && !hasIncompleteMilestones
            ? () => setShowMilestoneForm(true)
            : undefined
        }
      />

      <MilestoneRequestForm
        isOpen={showMilestoneForm}
        onClose={() => setShowMilestoneForm(false)}
        onSubmit={handleMilestoneRequest}
      />

      {currentMilestone && (
        <MilestoneDetailModal
          milestone={currentMilestone}
          isOpen={showMilestoneDetail}
          onClose={() => setShowMilestoneDetail(false)}
          userType={userType}
          onComplete={userType === "admin" ? handleCompleteMilestone : undefined}
          onApprove={userType === "admin" ? handleApproveMilestone : undefined}
          onDecline={userType === "admin" ? handleDeclineMilestone : undefined}
        />
      )}
    </div>
  );
};

export default ChatInterface;
