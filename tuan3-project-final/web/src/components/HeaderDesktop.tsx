import { NAVIGATION } from "@/types/constain";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/stores/store";
import { logout } from "@/features/authAction";
import Logo from "./ui/logo";

export default function HeaderDesktop() {
  const router = useNavigate();
  const user = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  return (
    <header className="bg-background/95 sticky top-0 hidden w-full items-center border-b px-4 md:grid md:grid-cols-2 lg:grid-cols-3">
      <Logo className="md:hidden lg:block" />
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
      {!user.email ? (
        <Button className="justify-self-end" onClick={() => router("/login")}>
          Đăng nhập
        </Button>
      ) : (
        <div className="flex items-center justify-center gap-5 justify-self-end">
          <p>{user.email}</p>
          <Button onClick={() => dispatch(logout())}>Đăng xuất</Button>
        </div>
      )}
    </header>
  );
}
