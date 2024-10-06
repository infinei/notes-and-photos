"use client";

import { TextNoteContext } from "@/context/TextNoteContext";
import TextNote from "./TextNote";
import { useContext, useRef } from "react";
import TextNoteType from "@/assets/note";
import Controls from "./Controls";

const NotePage = () => {
  const notesContainerRef = useRef<HTMLDivElement>(null);
  const { textNotes } = useContext(TextNoteContext);

  return (
    <div
      className="notes-container relative h-full w-full overflow-auto"
      ref={notesContainerRef}
    >
      <Controls />
      {textNotes.map((textNote: TextNoteType) => (
        <TextNote key={textNote._id} textNote={textNote} />
      ))}
    </div>
  );
};

export default NotePage;
