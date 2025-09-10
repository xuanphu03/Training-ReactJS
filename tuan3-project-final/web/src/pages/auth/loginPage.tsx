import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { LoginSchema, type LoginType } from '@/schema/schemas';
import { Link } from 'react-router-dom';
import FieldInput from './_components/FieldInput';

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = (data: LoginType) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl mx-auto flex flex-col items-center justify-center space-y-10 h-[80vh]"
    >
      <h1 className="text-3xl font-bold text-center">Đăng nhập</h1>
      <FieldInput
        register={register}
        errors={errors}
        field={'email'}
        title={'Email'}
      />

      <FieldInput
        register={register}
        errors={errors}
        field={'password'}
        title={'Mật khẩu'}
      />

      <Button className="w-full" type="submit">
        Đăng nhập
      </Button>

      <Link to="/register">Tạo tài khoản mới?</Link>
    </form>
  );
}
