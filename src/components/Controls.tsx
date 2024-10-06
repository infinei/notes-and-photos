import AddButton from "./AddButton";
import Color from "./Color";
import colors from "../assets/colors";

const Controls = () => {
  return (
    <div
      id="controls"
      className="fixed top-1/2 ml-4 flex -translate-y-1/2 flex-col items-center justify-center gap-4 rounded-full bg-slate-800 p-1"
      style={{ zIndex: 1000 }}
    >
      <AddButton />
      {Object.keys(colors).map((k) => (
        <Color key={k} color={k} />
      ))}
    </div>
  );
};

export default Controls;
