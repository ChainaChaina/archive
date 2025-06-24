export default function Home() {
  return (
    <div>
      <h1 style={{ fontFamily: "var(--font-montserrat)" }} className="text-3xl">
        Título com Montserrat
      </h1>
      <p style={{ fontFamily: "var(--font-roboto)" }}>
        Texto com Roboto.
      </p>
      <p style={{ fontFamily: "var(--font-oswald)" }}>
        Texto com Oswald.
      </p>
      <p style={{ fontFamily: "var(--font-monda)" }}>
        Texto com Monda.
      </p>
    </div>
  );
}