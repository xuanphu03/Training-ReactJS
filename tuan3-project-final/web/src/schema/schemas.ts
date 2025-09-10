import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email('Email không hợp lệ').nonempty(),
  password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự').nonempty(),
});

export type LoginType = z.infer<typeof LoginSchema>;

export const RegisterSchema = z.object({
  email: z.string().email('Email không hợp lệ').nonempty(),
  password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự').nonempty(),
  username: z.string().trim().nonempty("Nhập username"),
});

export type RegisterType = z.infer<typeof RegisterSchema>;
