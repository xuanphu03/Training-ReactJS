import { NAVIGATION } from "@/types/constain";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/stores/store";
import { logout } from "@/features/authAction";
import { Menu } from "lucide-react";
import Logo from "./ui/logo";

export default function HeaderMobile() {
  const router = useNavigate();
  const user = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  return (
    <header className="bg-background/95 sticky top-0 z-50 flex w-full items-center justify-between border-b p-4 md:hidden">
      <Logo />
      <Menu />
      <div className="hidden">
        <div className="container mx-auto flex items-center justify-center gap-4 justify-self-end p-4 lg:col-start-2">
          {NAVIGATION.map((item, index) => (
            <div
              key={index}
              onClick={() => router(item.path)}
              className="cursor-pointer font-medium transition hover:underline hover:duration-500 hover:ease-in-out"
            >
              {item.title}
            </div>
          ))}
        </div>
        {!user? (
          <Button className="justify-self-end" onClick={() => router("/login")}>
            Đăng nhập
          </Button>
        ) : (
          <div className="flex items-center justify-center gap-5 justify-self-end">
            <p>{user.email}</p>
            <Button onClick={() => dispatch(logout())}>Đăng xuất</Button>
          </div>
        )}
      </div>
    </header>
  );
}
