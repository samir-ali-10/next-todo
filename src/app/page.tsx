import { TodoItem } from "@/components/TodoItem";
import { prisma } from "@/db";
import { Prisma } from "@prisma/client";
import Link from "next/link";

function getTodos() {
  return prisma.todo.findMany();
}

async function toggleTodo(id: string, complete: boolean) {
  "use server"

  await prisma.todo.update({where: {id}, data: {complete}})

}

export default async function Home() {

  const todos = await getTodos();

  return <>
    <header className="flex justify-between items-center mb-4">
      <h1 className="text-2xl">Todos</h1>
      <Link className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 outline-none focus-within:bg-slate-700" href='/new'>New</Link>
    </header>
    <ul>
      {
        todos.map(todo => 
            <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo} />
          )
      }
    </ul>
  </>
}