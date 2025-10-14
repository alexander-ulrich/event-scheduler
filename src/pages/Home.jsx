import { useEffect } from "react";
import { useAuthContext } from "../contexts";

export default function Home() {
  const { token, setToken } = useAuthContext();
  useEffect(() => {}, [token]);
  return (
    <article>
      <p>Home</p>
    </article>
  );
}
