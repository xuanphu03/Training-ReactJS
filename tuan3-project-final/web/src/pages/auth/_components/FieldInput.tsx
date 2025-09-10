import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { FieldErrors, FieldValues, Path, UseFormRegister } from 'react-hook-form';

type FieldProps<T extends FieldValues> = {
  errors: FieldErrors<T>;
  register: UseFormRegister<T>;
  field: Path<T>;
  title: string;
};

export default function FieldInput<T extends FieldValues>({ errors, field, register, title }: FieldProps<T>) {
  return (
    <div className="space-y-2 w-full">
      <Label htmlFor={field}>{title}</Label>
      <Input id={field} {...register(field)} />
      {errors[field]?.message && (
        <span className="text-red-500">{String(errors[field]?.message)}</span>
      )}
    </div>
  );
}
