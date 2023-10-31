import { prisma } from "@/db";
import Link from "next/link";
import { redirect } from "next/navigation";

async function createTodo(data: FormData) {
    "use server"

    const title = data.get("title")?.valueOf();
    if (typeof title !== "string" || title.length === 0) {
        throw new Error("Invalid title");
    }
    await prisma.todo.create({ data: { title, complete: false } });
    redirect("/")
}

export default function Page() {
    return <>
        <header className="flex justify-between items-center mb-4">
            <h1 className="text-2xl">New</h1>
        </header>
        <form action={createTodo} className="flex gap-2 flex-col">
            <input type="text" name="title" className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 outline-none focus-within:bg-slate-700 bg-transparent" placeholder="Please enter a Todo" />
            <div className="flex justify-end items-center gap-1">
                <Link href=".." className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 outline-none focus-within:bg-slate-700">Cancel</Link>
                <button type="submit" className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 outline-none focus-within:bg-slate-700">Create</button>
            </div>
        </form>
    </>
}