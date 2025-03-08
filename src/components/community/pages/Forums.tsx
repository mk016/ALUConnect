import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Send } from "lucide-react";

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
      { id: 5, text: "Thanks for the advice on the internship!", time: "Yesterday", sender: "user" },
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
      { id: 4, text: "The alumni event last week was great.", time: "10:42 AM", sender: "user" },
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
    lastMessage: "Yes! It was a great networking opportunity.",
    messages: [
      { id: 1, text: "Hello! I'm working on a finance project.", time: "2 days ago", sender: "contact" },
      { id: 2, text: "Hi Maya, what's the project about?", time: "2 days ago", sender: "user" },
      { id: 3, text: "It's about portfolio optimization strategies.", time: "2 days ago", sender: "contact" },
      { id: 4, text: "I'd be happy to review it once you have a draft.", time: "2 days ago", sender: "user" },
      { id: 5, text: "Yes! It was a great networking opportunity.", time: "10:50 AM", sender: "contact" },
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
      { id: 3, text: "I met some interesting people from the class of 2015.", time: "11:50 AM", sender: "contact" },
    ]
  }
];

export default function Forums() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Discussions</h1>
          <p className="text-muted-foreground mt-1">
            Engage in meaningful discussions with fellow alumni and students
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        {/* Map through all contacts and show a single message */}
        {contacts.map((contact) => {
          const lastMessage = contact.messages[contact.messages.length - 1];
          return (
            <div className="flex items-center">
                 <Avatar className="h-8 w-8 mr-2">
                   <AvatarImage src={contact.avatar} />
                   <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                 </Avatar>
            
            <div className={`max-w-[30%] bg-secondary text-secondary-foreground rounded-lg p-3`}>
                          <p className="text-sm">{lastMessage.text}</p>
                          <p className="text-xs mt-1 opacity-70 text-right">{lastMessage.time}</p>
                        </div>

            </div>
          );
        })}

        {/* Input and send button */}
        <div className="p-4 border-t border-border">
          <div className="flex">
            <Input
              placeholder="Type a message..."
              className="mr-2"
            />
            <Button disabled={true}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
