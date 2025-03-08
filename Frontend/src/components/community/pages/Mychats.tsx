import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Building2, Clock, GraduationCap, MessageSquare, PanelRight, Plus, Search, Send, User, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const contacts = [
    {
        id: 1,
        name: "Alex Johnson",
        avatar: "https://source.unsplash.com/random/200x200/?portrait,man,1",
        status: "online",
        lastActive: "",
        unread: 2,
        type: "alumni", // alumni, student, college
        lastMessage: "Thanks for the advice on the internship!",
        messages: [
            { id: 1, text: "Hi there! I saw you work at Google.", time: "10:30 AM", sender: "user" },
            { id: 2, text: "Yes, I'm a software engineer there. How can I help?", time: "10:32 AM", sender: "contact" },
            { id: 3, text: "I'm interested in internships. Any advice?", time: "10:35 AM", sender: "user" },
            { id: 4, text: "Definitely! Start by building some projects, and I can refer you.", time: "10:40 AM", sender: "contact" },
            { id: 5, text: "Thanks for the advice on the internship!", time: "10:42 AM", sender: "user" },
        ]
    },
    {
        id: 2,
        name: "Emma Taylor",
        avatar: "https://source.unsplash.com/random/200x200/?portrait,woman,1",
        status: "offline",
        lastActive: "2 hours ago",
        unread: 0,
        type: "alumni",
        lastMessage: "The alumni event last week was great.",
        messages: [
            { id: 1, text: "Hey Emma, did you attend the alumni mixer?", time: "Yesterday", sender: "user" },
            { id: 2, text: "Yes! It was a great networking opportunity.", time: "Yesterday", sender: "contact" },
            { id: 3, text: "I met some interesting people from the class of 2015.", time: "Yesterday", sender: "contact" },
            { id: 4, text: "The alumni event last week was great.", time: "Yesterday", sender: "user" },
        ]
    },
    {
        id: 3,
        name: "Maya Rodriguez",
        avatar: "https://source.unsplash.com/random/200x200/?portrait,woman,2",
        status: "online",
        lastActive: "",
        unread: 0,
        type: "student",
        lastMessage: "Looking forward to your guidance on my project.",
        messages: [
            { id: 1, text: "Hello! I'm working on a finance project.", time: "2 days ago", sender: "contact" },
            { id: 2, text: "Hi Maya, what's the project about?", time: "2 days ago", sender: "user" },
            { id: 3, text: "It's about portfolio optimization strategies.", time: "2 days ago", sender: "contact" },
            { id: 4, text: "I'd be happy to review it once you have a draft.", time: "2 days ago", sender: "user" },
            { id: 5, text: "Looking forward to your guidance on my project.", time: "2 days ago", sender: "contact" },
        ]
    },
    {
        id: 4,
        name: "Stanford University",
        avatar: "https://source.unsplash.com/random/200x200/?university,logo",
        status: "online",
        lastActive: "",
        unread: 1,
        type: "college",
        lastMessage: "We're hosting an alumni networking event next month.",
        messages: [
            { id: 1, text: "Dear Alumni, we hope you're doing well.", time: "1 day ago", sender: "contact" },
            { id: 2, text: "We're hosting an alumni networking event next month.", time: "1 day ago", sender: "contact" },
            { id: 3, text: "Please save the date: June 15th at 6 PM.", time: "1 day ago", sender: "contact" },
        ]
    }
];

export default function MyChats() {

    const [activeContact, setActiveContact] = useState<number | null>(null);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState("all");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (activeContact) {
            const contact = contacts.find(c => c.id === activeContact);
            if (contact) {
                setMessages(contact.messages);
            }
        }
    }, [activeContact]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleSendMessage = () => {
        if (message.trim() === "") return;

        const newMessage = {
            id: messages.length + 1,
            text: message,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            sender: "user"
        };

        setMessages([...messages, newMessage]);
        setMessage("");
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSendMessage();
        }
    };

    const filteredContacts = contacts.filter(contact => {
        const matchesSearch = contact.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = activeTab === "all" || contact.type === activeTab;
        return matchesSearch && matchesType;
    });

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">My Chats</h1>
                    <p className="text-muted-foreground mt-1">
                        Find all your chats in one place
                    </p>
                </div>
            </div>

            <div className="flex flex-col h-full">
              {activeContact ? (
                // Chat conversation view
                <>
                  <div className="p-4 border-b border-border flex items-center justify-between">
                    <div className="flex items-center">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="mr-2 p-1" 
                        onClick={() => setActiveContact(null)}
                      >
                        <PanelRight className="h-4 w-4" />
                      </Button>
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src={contacts.find(c => c.id === activeContact)?.avatar} />
                        <AvatarFallback>
                          {contacts.find(c => c.id === activeContact)?.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-sm">
                          {contacts.find(c => c.id === activeContact)?.name}
                        </div>
                        <div className="text-xs text-muted-foreground flex items-center">
                          {contacts.find(c => c.id === activeContact)?.status === 'online' ? (
                            <>
                              <span className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1.5"></span>
                              Online
                            </>
                          ) : (
                            <>
                              <Clock className="h-3 w-3 mr-1.5" />
                              {contacts.find(c => c.id === activeContact)?.lastActive}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    {/* <Button variant="ghost" size="sm" className="p-1">
                      <X className="h-4 w-4" onClick={() => setIsOpen(false)} />
                    </Button> */}
                  </div>
                  
                  <div className="flex-1 p-4 overflow-y-auto">
                    {messages.map((msg) => (
                      <div 
                        key={msg.id}
                        className={`mb-4 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        {msg.sender !== 'user' && (
                          <Avatar className="h-8 w-8 mr-2 mt-1 flex-shrink-0">
                            <AvatarImage src={contacts.find(c => c.id === activeContact)?.avatar} />
                            <AvatarFallback>
                              {contacts.find(c => c.id === activeContact)?.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div className={`max-w-[70%] ${msg.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'} rounded-lg p-3`}>
                          <p className="text-sm">{msg.text}</p>
                          <p className="text-xs mt-1 opacity-70 text-right">{msg.time}</p>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                  
                  <div className="p-4 border-t border-border">
                    <div className="flex">
                      <Input
                        placeholder="Type a message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="mr-2"
                      />
                      <Button onClick={handleSendMessage} disabled={message.trim() === ""}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                // Contact list view
                <>
                  <div className="p-4 border-b border-border flex justify-between items-center">
                    <h2 className="font-semibold">Messages</h2>
                    {/* <Button variant="ghost" size="sm" className="p-1">
                      <X className="h-4 w-4" onClick={() => setIsOpen(false)} />
                    </Button> */}
                  </div>
                  
                  <div className="p-4 border-b border-border">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        placeholder="Search contacts..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                  </div>
                  
                  <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
                    <div className="px-2 border-b border-border">
                      <TabsList className="w-full justify-start px-2 py-1 h-auto">
                        <TabsTrigger value="all" className="text-xs h-7 px-2">
                          <Users className="h-3.5 w-3.5 mr-1.5" />
                          All
                        </TabsTrigger>
                        <TabsTrigger value="alumni" className="text-xs h-7 px-2">
                          <User className="h-3.5 w-3.5 mr-1.5" />
                          Alumni
                        </TabsTrigger>
                        <TabsTrigger value="student" className="text-xs h-7 px-2">
                          <GraduationCap className="h-3.5 w-3.5 mr-1.5" />
                          Students
                        </TabsTrigger>
                        <TabsTrigger value="college" className="text-xs h-7 px-2">
                          <Building2 className="h-3.5 w-3.5 mr-1.5" />
                          Colleges
                        </TabsTrigger>
                      </TabsList>
                    </div>
                    
                    <TabsContent value="all" className="flex-1 overflow-y-auto mt-0 p-0">
                      <div className="divide-y divide-border">
                        {filteredContacts.length > 0 ? (
                          filteredContacts.map((contact) => (
                            <div 
                              key={contact.id}
                              className="flex items-center p-3 hover:bg-secondary/30 cursor-pointer transition-colors"
                              onClick={() => setActiveContact(contact.id)}
                            >
                              <div className="relative">
                                <Avatar className="h-10 w-10 mr-3">
                                  <AvatarImage src={contact.avatar} />
                                  <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                {contact.status === 'online' && (
                                  <span className="absolute bottom-0 right-3 h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-background"></span>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-baseline">
                                  <h3 className="font-medium text-sm truncate">{contact.name}</h3>
                                  <span className="text-xs text-muted-foreground">
                                    {contact.messages[contact.messages.length - 1]?.time || ""}
                                  </span>
                                </div>
                                <p className="text-xs text-muted-foreground truncate">{contact.lastMessage}</p>
                              </div>
                              {contact.unread > 0 && (
                                <div className="ml-2 bg-primary rounded-full h-5 w-5 flex items-center justify-center">
                                  <span className="text-xs text-primary-foreground">{contact.unread}</span>
                                </div>
                              )}
                            </div>
                          ))
                        ) : (
                          <div className="p-4 text-center text-muted-foreground">
                            No contacts match your search.
                          </div>
                        )}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="alumni" className="flex-1 overflow-y-auto mt-0 p-0">
                      <div className="divide-y divide-border">
                        {filteredContacts.length > 0 ? (
                          filteredContacts.map((contact) => (
                            <div 
                              key={contact.id}
                              className="flex items-center p-3 hover:bg-secondary/30 cursor-pointer transition-colors"
                              onClick={() => setActiveContact(contact.id)}
                            >
                              <div className="relative">
                                <Avatar className="h-10 w-10 mr-3">
                                  <AvatarImage src={contact.avatar} />
                                  <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                {contact.status === 'online' && (
                                  <span className="absolute bottom-0 right-3 h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-background"></span>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-baseline">
                                  <h3 className="font-medium text-sm truncate">{contact.name}</h3>
                                  <span className="text-xs text-muted-foreground">
                                    {contact.messages[contact.messages.length - 1]?.time || ""}
                                  </span>
                                </div>
                                <p className="text-xs text-muted-foreground truncate">{contact.lastMessage}</p>
                              </div>
                              {contact.unread > 0 && (
                                <div className="ml-2 bg-primary rounded-full h-5 w-5 flex items-center justify-center">
                                  <span className="text-xs text-primary-foreground">{contact.unread}</span>
                                </div>
                              )}
                            </div>
                          ))
                        ) : (
                          <div className="p-4 text-center text-muted-foreground">
                            No alumni contacts found.
                          </div>
                        )}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="student" className="flex-1 overflow-y-auto mt-0 p-0">
                      <div className="divide-y divide-border">
                        {filteredContacts.length > 0 ? (
                          filteredContacts.map((contact) => (
                            <div 
                              key={contact.id}
                              className="flex items-center p-3 hover:bg-secondary/30 cursor-pointer transition-colors"
                              onClick={() => setActiveContact(contact.id)}
                            >
                              <div className="relative">
                                <Avatar className="h-10 w-10 mr-3">
                                  <AvatarImage src={contact.avatar} />
                                  <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                {contact.status === 'online' && (
                                  <span className="absolute bottom-0 right-3 h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-background"></span>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-baseline">
                                  <h3 className="font-medium text-sm truncate">{contact.name}</h3>
                                  <span className="text-xs text-muted-foreground">
                                    {contact.messages[contact.messages.length - 1]?.time || ""}
                                  </span>
                                </div>
                                <p className="text-xs text-muted-foreground truncate">{contact.lastMessage}</p>
                              </div>
                              {contact.unread > 0 && (
                                <div className="ml-2 bg-primary rounded-full h-5 w-5 flex items-center justify-center">
                                  <span className="text-xs text-primary-foreground">{contact.unread}</span>
                                </div>
                              )}
                            </div>
                          ))
                        ) : (
                          <div className="p-4 text-center text-muted-foreground">
                            No student contacts found.
                          </div>
                        )}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="college" className="flex-1 overflow-y-auto mt-0 p-0">
                      <div className="divide-y divide-border">
                        {filteredContacts.length > 0 ? (
                          filteredContacts.map((contact) => (
                            <div 
                              key={contact.id}
                              className="flex items-center p-3 hover:bg-secondary/30 cursor-pointer transition-colors"
                              onClick={() => setActiveContact(contact.id)}
                            >
                              <div className="relative">
                                <Avatar className="h-10 w-10 mr-3">
                                  <AvatarImage src={contact.avatar} />
                                  <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                {contact.status === 'online' && (
                                  <span className="absolute bottom-0 right-3 h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-background"></span>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-baseline">
                                  <h3 className="font-medium text-sm truncate">{contact.name}</h3>
                                  <span className="text-xs text-muted-foreground">
                                    {contact.messages[contact.messages.length - 1]?.time || ""}
                                  </span>
                                </div>
                                <p className="text-xs text-muted-foreground truncate">{contact.lastMessage}</p>
                              </div>
                              {contact.unread > 0 && (
                                <div className="ml-2 bg-primary rounded-full h-5 w-5 flex items-center justify-center">
                                  <span className="text-xs text-primary-foreground">{contact.unread}</span>
                                </div>
                              )}
                            </div>
                          ))
                        ) : (
                          <div className="p-4 text-center text-muted-foreground">
                            No college contacts found.
                          </div>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                </>
              )}
            </div>


        </div>
    );
}