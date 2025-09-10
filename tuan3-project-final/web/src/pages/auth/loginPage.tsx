import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { LoginSchema, type LoginType } from "@/schema/schemas";
import { Link, useNavigate } from "react-router-dom";
import FieldInput from "./_components/FieldInput";
import { useDispatch } from "react-redux";
import { login } from "@/features/authAction";
import { useSelector } from "react-redux";
import type { RootState } from "@/stores/store";
import { useEffect } from "react";

export default function LoginPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();
  const user = useSelector((state: RootState) => state.auth)

  const router = useNavigate()
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
  });

  useEffect(() => {
    if (user.email) {
      router('/')
    }
  }, [user.email, router] )

  const onSubmit = (data: LoginType) => {
    dispatch(login(data.email, data.password));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto flex h-[80vh] max-w-xl flex-col items-center justify-center space-y-10"
    >
      <h1 className="text-center text-3xl font-bold">Đăng nhập</h1>
      <FieldInput
        register={register}
        errors={errors}
        field={"email"}
        title={"Email"}
      />

      <FieldInput
        register={register}
        errors={errors}
        field={"password"}
        title={"Mật khẩu"}
      />

      <Button className="w-full" type="submit">
        Đăng nhập
      </Button>

      <Link to="/register">Tạo tài khoản mới?</Link>
    </form>
  );
}
