import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

type SearchFormInputs = {
  search: string;
};

export default function SearchTodo({ setSearchTerm }: { setSearchTerm: (term: string) => void }) {
  const { register, handleSubmit } = useForm<SearchFormInputs>();

  const onSubmit = (data: SearchFormInputs) => {
    setSearchTerm(data.search);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2 my-4" >
      <Input
        type="text"
        placeholder="Tìm kiếm công việc..."
        {...register('search')}
      />
      <Button type="submit">Tìm kiếm</Button>
    </form>
  );
}
