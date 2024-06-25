import { queryOptions } from "@tanstack/react-query";

export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export const TODOS_QUERY_KEY = "todos";

export const todosOptions = queryOptions({
  queryFn: () =>
    fetch("https://jsonplaceholder.typicode.com/todos").then(
      (res) => res.json() as Promise<Todo[]>
    ),
  queryKey: [TODOS_QUERY_KEY],
});

export const todoOptions = (todoId: string) =>
  queryOptions({
    queryFn: () =>
      fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`).then(
        (res) => res.json() as Promise<Todo>
      ),
    queryKey: [TODOS_QUERY_KEY, todoId],
  });
