import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form'
import style from './App.css'

type TodoTypes = {
  id: number,
  todo: string
}

type AddTodoType = {
  todo: string,
  editTodoName: string
}

export default function Home() {

  const { register, handleSubmit, reset } = useForm<AddTodoType>();
  const [todos, setTodos] = useState<TodoTypes[]>([]);
  const [isEdit, setIsEdit] = useState({ id: 0, todo: "" });

  // todo追加関数
  const addTodo = async (event: AddTodoType) => {
    const { todo } = event;
    console.log(todo);
    await axios
      .post('http://localhost:3000/add', {
        data: {
          todo,
        },
      })
      .then((response) => {
        console.log(response.data);
        const todo = response.data;
        setTodos((preTodos) => [todo, ...preTodos]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // todo削除関数
  const deleteTodo = async (id: number) => {
    await axios
      .delete('http://localhost:3000/delete', {
        data: {
          id,
        }
      })
      .then((response) => {
        console.log(response);
        const newTodos = todos.filter((todo) => todo.id !== id);
        setTodos(newTodos);
      })
      .catch((e) => {
        console.log(e.message);
        setTodos(todos);
      })
  };

  // todo更新関数
  const editTodo = async ({ editTodoName }: AddTodoType) => {
    await axios
      .put('http://localhost:3000/update', {
        data: {
          id: isEdit.id,
          todo: editTodoName,
        },
      })
      .then((response) => {
        console.log(response.data);
        const newTodos = todos.map((v) => {
          return v.id === response.data.id ? response.data : v;
        });
        setIsEdit({ id: 0, todo: "" });
        setTodos(newTodos);
        reset();
      })
  }

  useEffect(() => {
    axios
      .get("http://localhost:3000")  // ローカルのバックエンドサーバーのURLにgetメソッドでアクセス
      .then((response) => {
        console.log(response.data.todos)
        const { todos } = response.data
        setTodos(todos)
      })
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit(addTodo)}>
        <input {...register('todo')} type="text" />
        <button type="submit">add</button>
      </form>
      {todos.map((todo) => (
        <div key={todo.id} style={{ display: "flex" }}>
          {isEdit.id === todo.id ? (
            <form onSubmit={handleSubmit(editTodo)}>
              <input {...register("editTodoName")} type="text" />
              <button>send</button>
            </form>
          ) : (
            <>
              <p>{todo.todo}</p>
              <button
                onClick={() => setIsEdit({ id: todo.id, todo: todo.todo })}
              >
                edit
              </button>
            </>
          )}

          <button onClick={() => deleteTodo(todo.id)}>delete</button>
        </div>
      ))}
    </>
  )
}