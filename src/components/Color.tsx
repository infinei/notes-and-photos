import { useContext } from "react";
import colors from "../assets/colors";
import { TextNoteContext } from "@/context/TextNoteContext";
import { updateNote } from "@/utils/apiUtils";

const Color = ({ color }: { color: string }) => {
  const { textNotes, setTextNotes, selectedTextNote } =
    useContext(TextNoteContext);

  const changeColor = () => {
    console.log("Change color clicked:", color, selectedTextNote);

    try {
      const currentNoteIndex = textNotes.findIndex(
        (note) => note._id === selectedTextNote._id,
      );

      const updatedNote = {
        ...textNotes[currentNoteIndex],
        color: color,
      };

      const newNotes = [...textNotes];
      newNotes[currentNoteIndex] = updatedNote;
      setTextNotes(newNotes);

      updateNote(selectedTextNote._id, "color", color);
    } catch (err) {
      alert("You must select a note before changing colors");
    }
  };

  return (
    <div
      onClick={changeColor}
      className="color h-9 w-9 cursor-pointer rounded-full"
      style={{
        backgroundColor: colors[color as keyof typeof colors].colorHeader,
      }}
    ></div>
  );
};

export default Color;
