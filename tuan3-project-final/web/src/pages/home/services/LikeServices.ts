import { db } from "@/firebase/config";
import { arrayUnion, doc, getDoc } from "firebase/firestore";
import type { StatusProps } from "../_components/Status";
import { isEqual } from "./DeepComparison";
import { updateDoc } from "firebase/firestore";

export const LikeServices = async (content: StatusProps) => {
  const postRef = doc(db, "status", "posts");
  const querySnapshot = await getDoc(postRef);

  const data = querySnapshot
    .data()
    ?.status.find((item: StatusProps) => isEqual(item, content));

  console.log(data);

  await updateDoc(postRef, {
    status: {
      ...data,
      likes: arrayUnion(data.senderId),
    },
  });
};

