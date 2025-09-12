import { db } from "@/firebase/config";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

export const sendMessage = async (
  roomId: string,
  sender: string,
  text: string,
) => {
  await updateDoc(doc(db, "chats", roomId), {
    messages: arrayUnion({
      senderId: sender,
      text,
      createdAt: new Date(),
      read: false,
    }),
  });
};
