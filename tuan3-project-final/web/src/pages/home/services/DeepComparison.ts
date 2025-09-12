import type { StatusProps } from "../_components/Status";

export function isEqual(obj1: StatusProps, obj2: StatusProps) {
  return (
    obj1.senderId === obj2.senderId &&
    obj1.text === obj2.text &&
    obj1.createdAt.toString() === obj2.createdAt.toString()
  );
}