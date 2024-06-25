import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, Outlet } from "@remix-run/react";
import { queryClient } from "~/lib/query-client";
import { todosOptions } from "~/lib/queries/todos";

export const clientLoader = async () => {
  // You don't need Promise.all for every request, but loading in parallel is a good idea if
  // you're preloading a bunch of queries that don't rely on each other for their data
  return Promise.all([queryClient.ensureQueryData(todosOptions)]);
};

export default function Todos() {
  const todos = useSuspenseQuery(todosOptions);

  return (
    <div className="font-sans">
      <main className="flex h-dvh">
        <nav className="w-[350px] bg-black/5 overflow-x-hidden overflow-y-auto p-4">
          <ul className="space-y-3">
            {todos.data.map((todo) => (
              <li key={todo.id} className="whitespace-nowrap underline">
                <Link to={`/todo/${todo.id}`}>
                  {todo.title} - {todo.completed ? "done" : "not done"}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
