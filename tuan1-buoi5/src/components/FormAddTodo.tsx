import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import type { TodoType } from '@/App';

export default function FormAddTodo({ setTodos }: { setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>; }) {
  const PRIORITY = [
    {
      value: 'low',
      label: 'Thấp',
    },
    {
      value: 'medium',
      label: 'Trung bình',
    },
    {
      value: 'high',
      label: 'Cao',
    },
  ];
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TodoType>({
    mode: 'onBlur',
    defaultValues: {
      priority: 'medium',
      dueDate: new Date().toISOString().split('T')[0],
    },
  });

  const onSubmit: SubmitHandler<TodoType> = (data) => {
    if (!data.title) return;
    setTodos((todos) => [
      {
        id: new Date().valueOf(),
        title: data.title,
        description: data.description,
        completed: false,
        priority: data.priority,
        dueDate: data.dueDate,
      },
      ...todos,
    ]);
  };
  return (
    <form
      className="mb-5 grid grid-cols-2 gap-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <Input
          type="text"
          placeholder="Nhập công việc..."
          {...register('title', { required: 'Vui lòng nhập công việc!' })}
        />
        {errors.title && (
          <p className="text-red-500 text-xs p-1">{errors.title.message}</p>
        )}
      </div>
      <Input
        type="text"
        placeholder="Nhập mô tả..."
        {...register('description')}
      />
      <Input
        type="date"
        placeholder="Nhập ngày hết hạn..."
        defaultValue={new Date().toISOString().split('T')[0]}
        {...register('dueDate')}
      />
      <Controller
        control={control}
        name="priority"
        render={({ field }) => (
          <RadioGroup
            className="flex gap-10 justify-center w-full"
            defaultValue="medium"
            {...field}
          >
            {PRIORITY.map((item) => (
              <div
                className="flex items-center justify-center gap-2"
                key={item.value}
              >
                <RadioGroupItem
                  value={item.value}
                  id={`r-${item.value}`}
                  onClick={() => field.onChange(item.value)}
                />
                <Label htmlFor={`r-${item.value}`}>{item.label}</Label>
              </div>
            ))}
          </RadioGroup>
        )}
      />
      <Button className="col-span-2" type="submit">
        Thêm
      </Button>
    </form>
  );
}
