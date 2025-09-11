import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { sendMessage } from "./services/ChatSevice";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/config";
import { cn } from "@/lib/utils";
import { useNotification } from "@/context/useNotification";

type Message = {
  senderId: string;
  text: string;
  createdAt: Date;
  read: boolean;
};

export default function Chatbox() {
  const [text, setText] = useState("");
  const email = localStorage.getItem("user") || "guest";
  const [chat, setChat] = useState<Message[] | []>([]);
  const { setNotification } = useNotification();

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", "room1"), (res) => {
      setChat(res.data()?.messages || []);
    });

    return () => {
      unSub();
    };
  }, [setNotification]);

  const handleSend = () => {
    if (text.trim()) {
      sendMessage("room1", email, text);
      setText("");
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  return (
    <div className="flex min-h-[90vh] py-10">
      <nav className="h-full flex-1 overflow-y-auto">
        <div className="flex cursor-pointer items-center gap-3 border-b-2 py-5">
          <p className="flex size-10 items-center justify-center rounded-full bg-black text-3xl font-bold text-white">
            P
          </p>
          <div>
            <p className="font-medium">XuanPhu</p>
            <p className="text-sm font-thin">Hello world</p>
          </div>
        </div>

        <div className="flex cursor-pointer items-center gap-3 border-b-2 py-5">
          <p className="flex size-10 items-center justify-center rounded-full bg-black text-3xl font-bold text-white">
            P
          </p>
          <div>
            <p className="font-medium">XuanPhu</p>
            <p className="text-sm font-thin">Hello world</p>
          </div>
        </div>

        <div className="flex cursor-pointer items-center gap-3 border-b-2 py-5">
          <p className="flex size-10 items-center justify-center rounded-full bg-black text-3xl font-bold text-white">
            P
          </p>
          <div>
            <p className="font-medium">XuanPhu</p>
            <p className="text-sm font-thin">Hello world</p>
          </div>
        </div>

        <div className="flex cursor-pointer items-center gap-3 border-b-2 py-5">
          <p className="flex size-10 items-center justify-center rounded-full bg-black text-3xl font-bold text-white">
            P
          </p>
          <div>
            <p className="font-medium">XuanPhu</p>
            <p className="text-sm font-thin">Hello world</p>
          </div>
        </div>

        <div className="flex cursor-pointer items-center gap-3 border-b-2 py-5">
          <p className="flex size-10 items-center justify-center rounded-full bg-black text-3xl font-bold text-white">
            P
          </p>
          <div>
            <p className="font-medium">XuanPhu</p>
            <p className="text-sm font-thin">Hello world</p>
          </div>
        </div>
      </nav>

      <section className="flex max-h-[80vh] flex-3 flex-col justify-between border-l-2">
        <div className="flex h-full flex-1 flex-col overflow-y-auto p-5">
          {chat.map((msg) => (
            <div
              key={msg.createdAt.toString()}
              className={cn(
                "my-2 flex max-w-[60%] flex-col gap-1 rounded-md p-2",
                msg.senderId === email
                  ? "self-end bg-blue-500 text-white"
                  : "self-start bg-gray-200",
              )}
            >
              {email === msg.senderId ? (
                ""
              ) : (
                <p className="text-xs font-bold">{msg.senderId}:</p>
              )}{" "}
              {msg.text}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
        <div className="flex gap-2">
          <Input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <Button type="submit" onClick={handleSend}>
            <Send />
          </Button>
        </div>
      </section>
    </div>
  );
}
