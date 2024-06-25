import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <div>
      <Link to="/todo">Visit Todos</Link>
    </div>
  );
}
