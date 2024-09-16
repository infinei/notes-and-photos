"use client";

import React, { useRef } from "react";
import { fakeData as fakeDataTextNotes } from "@/assets/fakeData";
import TextNote from "../components/TextNote";

// const NOTE_PAGE_HEIGHT = 1000; // pixels
// const NOTE_PAGE_WIDTH = 800;

const NotePage = () => {
  const notesContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="notes-container relative h-full w-full overflow-auto"
      ref={notesContainerRef}
    >
      {fakeDataTextNotes.map((note) => (
        <TextNote {...note} key={note.$id} />
      ))}
    </div>
  );
};

export default NotePage;
