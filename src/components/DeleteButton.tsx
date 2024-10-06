import TextNoteType from "@/assets/note";
import TrashIcon from "@/assets/TrashIcon";
import { TextNoteContext } from "@/context/TextNoteContext";
import { deleteNote } from "@/utils/apiUtils";
import { useContext } from "react";

const DeleteButton = ({ noteID }: { noteID: string }) => {
  const { setTextNotes } = useContext(TextNoteContext);

  const handleDelete = () => {
    setTextNotes((textNotes: TextNoteType[]) =>
      textNotes.filter((note: TextNoteType) => note._id !== noteID),
    );
    deleteNote(noteID);
  };

  return (
    <div className="hover:animate-pulse hover:text-red-600">
      <div onClick={handleDelete} className="delete-button">
        <div className="pointer-events-none">
          <TrashIcon size="24" />
        </div>
      </div>
    </div>
  );
};

export default DeleteButton;
