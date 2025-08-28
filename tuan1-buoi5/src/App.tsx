import { useState } from 'react';
import ListTodo from './components/ListTodo';
import FormAddTodo from './components/FormAddTodo';
import SearchTodo from './components/SearchTodo';

export type TodoType = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
};

function App() {
  const [todos, setTodos] = useState<TodoType[]>([
    {
      id: 1,
      title: 'Học ReactJS',
      description: 'Đọc tài liệu về useState và useEffect',
      completed: false,
      priority: 'high',
      dueDate: '2025-08-30',
    },
    {
      id: 2,
      title: 'Đi chợ',
      description: 'Mua rau, thịt, cá',
      completed: true,
      priority: 'medium',
      dueDate: '2025-08-27',
    },
    {
      id: 3,
      title: 'Tập thể dục',
      description: 'Chạy bộ 30 phút buổi sáng',
      completed: false,
      priority: 'low',
      dueDate: '2025-08-26',
    },
    {
      id: 4,
      title: 'Làm project',
      description: 'Hoàn thành chức năng đăng nhập cho app',
      completed: false,
      priority: 'high',
      dueDate: '2025-09-01',
    },
    {
      id: 5,
      title: 'Đọc sách',
      description: 'Đọc xong chương 3 Clean Code',
      completed: false,
      priority: 'medium',
      dueDate: '2025-08-29',
    },
  ]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleChecked = (todo: TodoType) => {
    setTodos((todos) =>
      todos
        .map((t) => (t.id === todo.id ? { ...t, completed: !t.completed } : t))
        .sort((a, b) => Number(a.completed) - Number(b.completed))
    );
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto">
        <div className="p-10 text-center">
          <h1 className="font-bold uppercase text-3xl">Todo list</h1>
          <p>
            Đây là ứng dụng quản lý công việc đơn giản sử dụng React và
            TypeScript.
          </p>
        </div>

        <div className="p-10 border border-gray-200 rounded-lg shadow-md max-w-6xl mx-auto">
          <FormAddTodo setTodos={setTodos} />
          <SearchTodo setSearchTerm={setSearchTerm} />
          <ListTodo
            todos={todos}
            handleChecked={handleChecked}
            searchTerm={searchTerm}
            setTodos={setTodos}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
