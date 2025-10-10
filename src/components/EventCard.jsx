export default function EventCard({ event }) {
  return (
    <article className="card bg-base-100 w-96 shadow-sm border-2 border-accent">
      <div className="card-body">
        <h2 className="card-title">{event.title}</h2>
        <p className="font-semibold">
          <span>{event.date}</span>
          <span>{event.location}</span>
        </p>
        <p>{event.description}</p>
      </div>
    </article>
  );
}
