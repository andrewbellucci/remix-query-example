import { useSuspenseQuery } from "@tanstack/react-query";
import { ClientLoaderFunctionArgs, Link, useParams } from "@remix-run/react";
import { queryClient } from "~/lib/query-client";
import { todoOptions } from "~/lib/queries/todos";

export const clientLoader = async ({ params }: ClientLoaderFunctionArgs) => {
  return await queryClient.ensureQueryData(todoOptions(params.todoId!));
};

export default function Todo() {
  const params = useParams<{ todoId: string }>();
  const todo = useSuspenseQuery(todoOptions(params.todoId!));

  return (
    <>
      <header className="flex items-center justify-between">
        <h1 className="font-bold text-2xl">{todo.data.title}</h1>
        <div className="inline-flex bg-black text-white px-2 py-1">
          {todo.data.completed ? "done" : "not done"}
        </div>
      </header>
      <hr className="my-6" />
      <Link to="..">Back</Link>
    </>
  );
}
