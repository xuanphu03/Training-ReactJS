import { Button } from '@/components/ui/button';
import { RegisterSchema, type RegisterType } from '@/schema/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import FieldInput from './_components/FieldInput';

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterType>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = (data: RegisterType) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl mx-auto flex flex-col items-center justify-center space-y-10 h-[80vh]"
    >
      <h1 className="text-3xl font-bold text-center">Đăng ký</h1>

      <FieldInput
        register={register}
        errors={errors}
        field="username"
        title="Tên người dùng"
      />
      <FieldInput
        register={register}
        errors={errors}
        field="email"
        title="Email"
      />
      <FieldInput
        register={register}
        errors={errors}
        field="password"
        title="Mật khẩu"
      />

      <Button className="w-full" type="submit">
        Đăng ký
      </Button>

      <Link to="/register">Đã có tài khoản</Link>
    </form>
  );
}
