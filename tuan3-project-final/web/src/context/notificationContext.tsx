import { db } from "@/firebase/config";
import { doc, onSnapshot } from "firebase/firestore";
import React, {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type Notification = {
  title: string;
  message: string;
  readed: boolean;
} | null;

interface NotificationContextType {
  notification: Notification;
  setNotification: React.Dispatch<React.SetStateAction<Notification>>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notification, setNotification] = useState<Notification>({
    title: "",
    message: "",
    readed: false,
  });

  const email = localStorage.getItem("user") || "guest";

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", "room1"), (res) => {
      if (res.data()?.messages.slice(-1)[0]?.senderId !== email) {
        setNotification(() => ({
          title: res.data()?.messages.slice(-1)[0]?.senderId,
          message: res.data()?.messages.slice(-1)[0]?.text,
          readed: res.data()?.messages.slice(-1)[0]?.readed,
        }));
      }
    });

    return () => {
      unSub();
    };
  }, [email, setNotification]);

  return (
    <NotificationContext.Provider value={{ notification, setNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
