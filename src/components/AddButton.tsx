import TextNoteType from "@/assets/note";
import PlusIcon from "@/assets/PlusIcon";
import { TextNoteContext } from "@/context/TextNoteContext";
import { createNote } from "@/utils/apiUtils";
import { useContext, useRef } from "react";

const AddButton = () => {
  const startingPos = useRef(10);
  const { setTextNotes } = useContext(TextNoteContext);

  const handleAddNote = async () => {
    const newNote = await createNote("", "color-yellow", {
      x: startingPos.current,
      y: startingPos.current,
    });
    startingPos.current += 10;
    setTextNotes((textNotes: TextNoteType[]) => [newNote, ...textNotes]);
  };

  return (
    <div
      id="add-btn"
      className="cursor-pointer rounded-full bg-slate-700"
      onClick={handleAddNote}
    >
      <PlusIcon size="36" color="white" />
    </div>
  );
};

export default AddButton;
