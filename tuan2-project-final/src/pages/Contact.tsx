import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { customerSchema, type Customer } from '@/schema/customer';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { Input } from '../components/ui/input';

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Customer>({
    resolver: zodResolver(customerSchema),
  });

  const onSubmit: SubmitHandler<Customer> = (data) => {
    console.log(data);
  };

  return (
    <section
      className="min-h-[90vh] w-full flex flex-col gap-5 items-center justify-center relative"
    >
      <h2 className="font-bold text-3xl z-10">Liên hệ</h2>
      <p className="mt-4 text-lg max-w-2xl mx-auto z-10">
        Nếu bạn muốn liên hệ với tôi, hãy gửi email đến
        <a href="mailto:xuanphu@example.com" className="text-purple-400">
          {' '}
          xuanphu@example.com
        </a>
        .
      </p>

      <Card className="w-full max-w-md z-10">
        <CardHeader>
          <h3 className="font-bold text-lg">Để lại thông tin liên hệ</h3>
        </CardHeader>
        <CardContent>
          <form
            className="space-y-4"
            action=""
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input {...register('name')} type="text" placeholder="Họ và tên" />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
            <Input {...register('email')} type="email" placeholder="Email" />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
            <Input
              {...register('phone')}
              type="text"
              placeholder="Số điện thoại"
            />
            {errors.phone && (
              <p className="text-red-500">{errors.phone.message}</p>
            )}
            <Button type="submit">Gửi</Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
