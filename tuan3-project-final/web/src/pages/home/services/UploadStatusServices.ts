// chatService.ts
import { db } from "@/firebase/config";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

export const sendStatus = async (
  sender: string,
  text: string,
) => {
  await updateDoc(doc(db, "status", "posts"), {
    messages: arrayUnion({
      senderId: sender,
      text,
      createdAt: new Date(),
    }),
  });
};
