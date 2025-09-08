import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { userSchema } from '@/schema/customer';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import login from '@/features/authAction';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/stores/store';

interface FormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth);
  const router = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = (data: FormData) => {
    // handle login logic here
    dispatch(login(data.email, data.password));
  };

  useEffect(() => {
    if (user.token) {
      router('/');
    }
  }, [user.token, router]);

  return (
    <div className="w-full">
      <Card className="max-w-lg mx-auto">
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5">
            <h1 className="text-4xl font-bold">LoginPage</h1>
            <div>
              <label>Email</label>
              <Input
                {...register('email')}
                type="email"
                placeholder="Enter your email"
              />
              {errors.email && (
                <span className="text-red-500">{errors.email.message}</span>
              )}
            </div>
            <div>
              <label>Password</label>
              <Input
                {...register('password')}
                type="password"
                placeholder="Enter your password"
              />
              {errors.password && (
                <span className="text-red-500">{errors.password.message}</span>
              )}
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
