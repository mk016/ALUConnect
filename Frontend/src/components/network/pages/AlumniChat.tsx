import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, MessageSquare, UserCircle } from "lucide-react";

const chatRooms = [
  {
    name: "Tech Alumni 2023",
    participants: 24,
    lastMessage: "Discussion about latest AI trends",
    lastActive: "2 mins ago"
  },
  {
    name: "Business Network",
    participants: 18,
    lastMessage: "Upcoming networking event details",
    lastActive: "5 mins ago"
  },
  {
    name: "Engineering Graduates",
    participants: 32,
    lastMessage: "Job opportunities in renewable energy",
    lastActive: "15 mins ago"
  }
];

export default function AlumniChat() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Alumni Chat Rooms</h1>
          <p className="text-muted-foreground mt-1">
            Connect and chat with fellow alumni in different groups
          </p>
        </div>
        <Button className="gap-2">
          <MessageSquare className="h-4 w-4" />
          Create Chat Room
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input className="pl-10" placeholder="Search chat rooms..." />
        </div>
        <Button variant="outline">Join Room</Button>
      </div>

      <div className="grid gap-4">
        {chatRooms.map((room, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">{room.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <UserCircle className="h-4 w-4" />
                    <span>{room.participants} participants</span>
                    <span>•</span>
                    <span>Last active {room.lastActive}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{room.lastMessage}</p>
                </div>
                <Button variant="outline" size="sm">Join Chat</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 