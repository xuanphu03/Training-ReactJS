import { Button } from "@/components/ui/button";
import { db } from "@/firebase/config";
import {
  arrayRemove,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { Ellipsis, Link, MessageCircle, ThumbsUp } from "lucide-react";
import React from "react";

interface StatusProps {
  senderId: string;
  text: string;
  createdAt: Date;
}

interface OpenStateTypes {
  id: Date;
  isOpen: boolean;
}

export default function Status() {
  const ActionButton = [
    { id: 1, name: "Like", icon: <ThumbsUp /> },
    { id: 2, name: "Comment", icon: <MessageCircle /> },
    { id: 3, name: "Share", icon: <Link /> },
  ];

  const [contents, setContents] = React.useState<StatusProps[]>([]);
  const [isOpenTab, setIsOpenTab] = React.useState<OpenStateTypes>({
    id: new Date(),
    isOpen: false,
  });
  const email = localStorage.getItem("user") || "guest";

  React.useEffect(() => {
    const unSub = onSnapshot(doc(db, "status", "posts"), (res) => {
      setContents(() => res.data()?.messages.reverse() || []);
    });

    return () => {
      unSub();
    };
  }, [setContents, email]);

  const formatDate = (date: Date) => {
    const dateObj = date as unknown as { seconds: number; nanoseconds: number };
    const dateChange = new Date(
      dateObj.seconds * 1000 + dateObj.nanoseconds / 1e6,
    );
    console.log(dateChange);
    return `${dateChange.getHours()}:${dateChange.getMinutes()}:${dateChange.getSeconds()} ${dateChange.getDate()}/${dateChange.getMonth() + 1}/${dateChange.getFullYear()}`;
  };

  function isEqual(obj1: StatusProps, obj2: StatusProps) {
    return (
      obj1.senderId === obj2.senderId &&
      obj1.text === obj2.text &&
      obj1.createdAt.toString() === obj2.createdAt.toString()
    );
  }

  const handleDeleteStatus = async (content: StatusProps) => {
    const docRef = doc(db, "status", "posts");
    const querySnapshot = await getDoc(docRef);

    const status = querySnapshot
      .data()
      ?.messages.find((item: StatusProps) => isEqual(item, content));
    await updateDoc(docRef, {
      messages: arrayRemove(status),
    });
  };

  return (
    <div>
      {contents.map((content: StatusProps) => (
        <div
          key={content.createdAt.toString()}
          className="relative mx-auto my-2 max-w-[60%] rounded-md border p-2"
        >
          <div className="mb-2 flex items-center gap-2">
            <p className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-2xl font-bold text-white uppercase">
              {content.senderId[0]}
            </p>
            <div>
              <p className="font-bold">{content.senderId}</p>
              <p className="text-sm font-thin">
                {formatDate(content.createdAt)}
              </p>
            </div>
          </div>

          <div
            className="px-12 py-4"
            dangerouslySetInnerHTML={{ __html: content.text }}
          />

          <div className="grid grid-cols-3 border-t pt-2 text-center">
            {ActionButton.map((action) => (
              <Button
                key={action.id}
                variant="outline"
                className="mx-2 flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-500"
              >
                {action.icon}
                <p className='hidden md:block'>{action.name}</p>
              </Button>
            ))}
          </div>
          <Ellipsis
            onClick={() =>
              setIsOpenTab((prev) => ({
                id: content.createdAt,
                isOpen: !prev.isOpen,
              }))
            }
            className="absolute top-2 right-5 size-7 cursor-pointer rounded-full p-1 hover:bg-slate-200"
          />
          {isOpenTab.isOpen && isOpenTab.id === content.createdAt && (
            <div className="absolute top-10 right-5 z-10 flex w-40 flex-col rounded-md border bg-white shadow-md">
              <Button variant="ghost" className="rounded-t-md">
                Lưu bài viết
              </Button>
              {content.senderId === email && (
                <Button
                  variant="ghost"
                  onClick={() => handleDeleteStatus(content)}
                  className="rounded-b-md text-red-500"
                >
                  Xóa bài viết
                </Button>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
