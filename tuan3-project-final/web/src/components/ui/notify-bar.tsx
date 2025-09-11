import { useNotification } from "@/context/useNotification";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function NotifyBar() {
  const { notification, setNotification } = useNotification();

  const router = useNavigate();
  if (!notification) return null;
  if (!notification.readed) {
    toast.custom((t) => (
      <div
        onClick={() => {
          setNotification({ ...notification, readed: true });
          toast.dismiss(t);
          router("/chat-box");
        }}
        className="relative w-2xs rounded-md border bg-white p-3 shadow-md"
      >
        <div className="max-w-5/6 space-y-3">
          <h4 className="text-sm font-bold">{notification.title}</h4>
          <p className="text-sm">{notification.message}</p>
        </div>
        <button
          className="absolute top-5 right-5"
          onClick={() => {
            setNotification({ ...notification, readed: true });
            toast.dismiss(t);
          }}
        >
          <X size={12} />
        </button>
      </div>
    ));
    setNotification({ ...notification, readed: true });
  }
  return null;
}
