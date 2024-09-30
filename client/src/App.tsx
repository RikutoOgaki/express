import axios from "axios";
import { useEffect, useState } from "react";

type TodoTypes = {
  id: number,
  todo: string
}

export default function Home() {

  const [todos, setTodos] = useState<TodoTypes[]>([])

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
      <div>
        {todos.map((v) =>
          <p key={v.id}>{v.todo}</p>
        )}
      </div>
    </>
  )
}