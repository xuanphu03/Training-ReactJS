import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import type { TodoType } from "@/App";

export default function ListTodo({ todos, handleChecked, setTodos, searchTerm }: { todos: TodoType[]; handleChecked: (todo: TodoType) => void; setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>; searchTerm: string; }) {
  return (
    <ul>
      {todos
        .sort((a, b) => Number(a.completed) - Number(b.completed))
        .filter((todo) => todo.title.includes(searchTerm))
        .map((todo) => (
          <li
            className="grid grid-cols-5 items-center mb-2 border-b border-gray-200"
            key={todo.id}
          >
            <div className="flex gap-3">
              <Checkbox
                className="self-center size-6"
                checked={todo.completed}
                onClick={() => handleChecked(todo)}
              />
              <p>{todo.title}</p>
            </div>
            <p>{todo.description}</p>
            <p className="text-center">{todo.priority}</p>
            <p className="text-center">{todo.dueDate}</p>
            <Button
              variant="destructive"
              size="sm"
              className="w-1/3 justify-self-end"
              onClick={() =>
                setTodos((todos) => todos.filter((t) => t.id !== todo.id))
              }
            >
              <Trash2 />
            </Button>
          </li>
        ))}
    </ul>
  );
}
