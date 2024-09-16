import NotePage from "./_pages/NotePage";

export default function Home() {
  return (
    <div
      className="h-screen w-screen bg-gradient-to-t"
      style={{
        backgroundColor: "#1c1e25",
        backgroundImage:
          "linear-gradient(#2B2C34 0.1em, transparent 0.1em),linear-gradient(90deg, #2B2C34 0.1em, transparent 0.1em)",
        backgroundSize: "4em 4em",
      }}
    >
      <NotePage />
    </div>
  );
}
