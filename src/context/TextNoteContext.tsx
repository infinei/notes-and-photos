"use client";

import TextNoteType from "@/assets/note";
import { getNotes } from "@/utils/apiUtils";
import { createContext, ReactNode, useEffect, useState } from "react";

export interface ITextNoteContext {
  textNotes: TextNoteType[];
  setTextNotes: React.Dispatch<React.SetStateAction<TextNoteType[]>>;
  selectedTextNote: TextNoteType;
  setSelectedTextNote: React.Dispatch<React.SetStateAction<TextNoteType>>;
}

export const TextNoteContext = createContext({} as ITextNoteContext);

const TextNoteProvider = ({ children }: { children: ReactNode }) => {
  const [textNotes, setTextNotes] = useState<TextNoteType[]>([]);
  const [selectedTextNote, setSelectedTextNote] = useState<TextNoteType>(
    {} as TextNoteType,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotes();
  }, []);

  async function loadNotes() {
    const notes = await getNotes();

    setTextNotes(notes);
    setLoading(false);
  }

  const contextData = {
    textNotes,
    setTextNotes,
    selectedTextNote,
    setSelectedTextNote,
  };

  return (
    <TextNoteContext.Provider value={contextData}>
      {loading ? <p>Loading...</p> : children}
    </TextNoteContext.Provider>
  );
};

export default TextNoteProvider;
