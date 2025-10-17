import { useNavigate } from "react-router";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex max-w-xl mx-auto max-[615px]:mx-4 p-4 my-50 card bg-base-100 shadow-lg border border-base-200 justify-center items-center">
      <figure className="flex justify-content-center">
        <img
          className="max-w-[80%] shrink"
          src="/images/404.gif"
          alt="404_not_found_gif"
        />
      </figure>
      <p className="text-center text-2xl py-5">
        Diese Seite scheint nicht zu existieren!
      </p>
      <button
        onClick={() => navigate(-1 ?? "/")}
        className="btn btn-accent-content font-bold btn-sm gap-1 min-[300px]:px-20 max-[300px]:px-10"
      >
        {"<- Zurück"}
      </button>
    </div>
  );
}
