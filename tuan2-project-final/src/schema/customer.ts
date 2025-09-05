import { z } from 'zod'

export const customerSchema = z.object({
  name: z.string().min(2, 'Tên phải có ít nhất 2 ký tự').max(100).nonempty(),
  email: z.string().email('Email không hợp lệ').nonempty(),
  phone: z.string().min(10, 'Số điện thoại phải có ít nhất 10 ký tự').max(15, 'Số điện thoại không hợp lệ').nonempty(),
});

export type Customer = z.infer<typeof customerSchema>;

export const userSchema = z.object({
  email: z.string().email('Email không hợp lệ').nonempty(),
  password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự').nonempty(),
});