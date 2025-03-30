import { useState, useEffect, useRef } from "react";
import { MessageCircle, Search, Phone, Video, MoreHorizontal, Send, Smile, Paperclip } from "lucide-react";

const Chat = () => {
  const [activeChat, setActiveChat] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);
  
  // Mock friends data with online status and unread messages
  const [friends, setFriends] = useState([
    { id: 1, name: "Sarah Johnson", avatar: "/api/placeholder/40/40", status: "online", lastSeen: "now", unread: 2, 
      messages: [
        { sender: "Sarah Johnson", text: "Hey, how's the project going?", time: "10:30 AM", isRead: true },
        { sender: "Sarah Johnson", text: "Did you finish the dashboard?", time: "10:32 AM", isRead: true },
        { sender: "You", text: "Working on it right now. Should be done by EOD.", time: "10:35 AM", isRead: true },
        { sender: "Sarah Johnson", text: "Great! Can you send me a preview?", time: "10:36 AM", isRead: false },
        { sender: "Sarah Johnson", text: "Also, are we meeting tomorrow?", time: "10:37 AM", isRead: false },
      ]
    },
    { id: 2, name: "Michael Chen", avatar: "/api/placeholder/40/40", status: "offline", lastSeen: "2h ago", unread: 0,
      messages: [
        { sender: "You", text: "Hi Michael, do you have the financial report?", time: "Yesterday", isRead: true },
        { sender: "Michael Chen", text: "Yes, I'll email it to you in a moment.", time: "Yesterday", isRead: true },
        { sender: "Michael Chen", text: "Just sent it. Let me know if you need anything else.", time: "Yesterday", isRead: true },
      ]
    },
    { id: 3, name: "Jessica Williams", avatar: "/api/placeholder/40/40", status: "online", lastSeen: "now", unread: 0,
      messages: [
        { sender: "Jessica Williams", text: "Are we still on for the client meeting at 3?", time: "9:15 AM", isRead: true },
        { sender: "You", text: "Yes, I've prepared all the materials.", time: "9:20 AM", isRead: true },
        { sender: "Jessica Williams", text: "Perfect! I'll see you in the conference room.", time: "9:22 AM", isRead: true },
      ]
    },
    { id: 4, name: "David Brown", avatar: "/api/placeholder/40/40", status: "busy", lastSeen: "30m ago", unread: 1,
      messages: [
        { sender: "David Brown", text: "Can you help me with the API integration?", time: "11:45 AM", isRead: true },
        { sender: "You", text: "Sure, what's the issue you're facing?", time: "11:50 AM", isRead: true },
        { sender: "David Brown", text: "I'm getting authentication errors. Can we hop on a quick call?", time: "Just now", isRead: false },
      ]
    },
    { id: 5, name: "Emily Davis", avatar: "/api/placeholder/40/40", status: "away", lastSeen: "5m ago", unread: 0,
      messages: [
        { sender: "Emily Davis", text: "The client loved our presentation!", time: "Yesterday", isRead: true },
        { sender: "You", text: "That's great news! What feedback did they give?", time: "Yesterday", isRead: true },
        { sender: "Emily Davis", text: "They especially liked the new design direction. They want to move forward with it.", time: "Yesterday", isRead: true },
      ]
    },
  ]);

  useEffect(() => {
    if (activeChat) {
      scrollToBottom();
      
      // Mark messages as read when chat is opened
      setFriends(prevFriends => 
        prevFriends.map(friend => 
          friend.id === activeChat.id 
            ? {
                ...friend,
                unread: 0,
                messages: friend.messages.map(msg => ({ ...msg, isRead: true }))
              }
            : friend
        )
      );
    }
  }, [activeChat]);

  useEffect(() => {
    scrollToBottom();
  }, [activeChat?.messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const filteredFriends = friends.filter(friend => 
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sendMessage = () => {
    if (message.trim() === "" || !activeChat) return;
    
    const newMessage = {
      sender: "You",
      text: message,
      time: "Just now",
      isRead: true
    };
    
    setFriends(prevFriends => 
      prevFriends.map(friend => 
        friend.id === activeChat.id 
          ? { ...friend, messages: [...friend.messages, newMessage] }
          : friend
      )
    );
    
    setMessage("");
    
    // Simulate a reply (50% chance)
    if (Math.random() > 0.5) {
      setTimeout(() => {
        const replies = [
          "Got it, thanks!",
          "I'll look into that right away.",
          "Can you provide more details?",
          "Let's discuss this further in our next meeting.",
          "Thanks for the update!"
        ];
        
        const replyMessage = {
          sender: activeChat.name,
          text: replies[Math.floor(Math.random() * replies.length)],
          time: "Just now",
          isRead: true
        };
        
        setFriends(prevFriends => 
          prevFriends.map(friend => 
            friend.id === activeChat.id 
              ? { ...friend, messages: [...friend.messages, replyMessage] }
              : friend
          )
        );
      }, 1000 + Math.random() * 2000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "online": return "bg-green-500";
      case "busy": return "bg-red-500";
      case "away": return "bg-yellow-500";
      case "offline": return "bg-gray-400";
      default: return "bg-gray-400";
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r flex flex-col">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-blue-600">Barclays Chat</h1>
          <div className="mt-3 relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-8 pr-4 py-2 bg-gray-100 rounded-lg text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <div className="p-3">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Recent Chats</h2>
          </div>
          
          {filteredFriends.map(friend => (
            <div 
              key={friend.id}
              className={`p-3 flex items-center cursor-pointer hover:bg-gray-50 transition-colors ${activeChat?.id === friend.id ? 'bg-blue-50' : ''}`}
              onClick={() => setActiveChat(friend)}
            >
              <div className="relative">
                <img 
                  src={friend.avatar} 
                  alt={friend.name} 
                  className="w-10 h-10 rounded-full"
                />
                <span className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${getStatusColor(friend.status)}`}></span>
              </div>
              
              <div className="ml-3 flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-gray-900">{friend.name}</h3>
                  <span className="text-xs text-gray-500">{friend.messages[friend.messages.length - 1].time}</span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-sm text-gray-500 truncate w-36">
                    {friend.messages[friend.messages.length - 1].text}
                  </p>
                  {friend.unread > 0 && (
                    <span className="bg-blue-500 text-white text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center">
                      {friend.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Chat Area */}
      {activeChat ? (
        <div className="flex-1 flex flex-col">
          <div className="p-3 bg-white border-b flex justify-between items-center">
            <div className="flex items-center">
              <div className="relative">
                <img 
                  src={activeChat.avatar} 
                  alt={activeChat.name} 
                  className="w-8 h-8 rounded-full"
                />
                <span className={`absolute bottom-0 right-0 h-2 w-2 rounded-full border-2 border-white ${getStatusColor(activeChat.status)}`}></span>
              </div>
              <div className="ml-3">
                <h3 className="font-medium text-gray-900">{activeChat.name}</h3>
                <p className="text-xs text-gray-500">
                  {activeChat.status === "online" ? "Online" : `Last seen ${activeChat.lastSeen}`}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button className="text-gray-500 hover:text-gray-700">
                <Phone className="h-5 w-5" />
              </button>
              <button className="text-gray-500 hover:text-gray-700">
                <Video className="h-5 w-5" />
              </button>
              <button className="text-gray-500 hover:text-gray-700">
                <MoreHorizontal className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            {activeChat.messages.map((msg, index) => (
              <div 
                key={index} 
                className={`mb-4 flex ${msg.sender === "You" ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender !== "You" && (
                  <img 
                    src={activeChat.avatar} 
                    alt={activeChat.name} 
                    className="h-8 w-8 rounded-full mr-2 mt-1"
                  />
                )}
                <div 
                  className={`max-w-xs rounded-lg px-3 py-2 ${
                    msg.sender === "You" 
                      ? 'bg-blue-500 text-white rounded-tr-none' 
                      : 'bg-white border rounded-tl-none'
                  }`}
                >
                  <p>{msg.text}</p>
                  <div className={`text-xs mt-1 flex justify-end ${
                    msg.sender === "You" ? 'text-blue-100' : 'text-gray-400'
                  }`}>
                    {msg.time}
                    {msg.sender === "You" && (
                      <span className="ml-1">
                        {msg.isRead ? "✓✓" : "✓"}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="bg-white border-t p-3">
            <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
              <button className="text-gray-500 mr-2">
                <Smile className="h-5 w-5" />
              </button>
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 bg-transparent border-0 focus:ring-0 focus:outline-none text-sm"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyPress}
              />
              <button className="text-gray-500 mx-2">
                <Paperclip className="h-5 w-5" />
              </button>
              <button 
                onClick={sendMessage} 
                className="text-white bg-blue-500 rounded-full p-1.5 hover:bg-blue-600"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="flex justify-center">
              <MessageCircle className="h-16 w-16 text-gray-300" />
            </div>
            <h3 className="mt-2 text-xl font-medium text-gray-900">Select a conversation</h3>
            <p className="mt-1 text-gray-500">Choose a friend from the sidebar to start chatting</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;