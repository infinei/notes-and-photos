"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import TextNoteType from "@/assets/note";
import { autoGrow, setInBounds, bringToTop, getColor } from "@/utils/noteUtils";
import DeleteButton from "./DeleteButton";
import { TextNoteContext } from "@/context/TextNoteContext";
import { updateNote } from "@/utils/apiUtils";

const TextNote = ({ textNote }: { textNote: TextNoteType }) => {
  const id = textNote._id;
  const [position, setPosition] = useState(textNote.position); // {x, y}
  const color = getColor(textNote.color);
  const body = textNote.body;

  const [saving, setSaving] = useState(false);
  const keyUpTimer = useRef<NodeJS.Timeout | null>(null);

  const mouseStartPos = { x: 0, y: 0 }; // to keep track of mouse movements
  let positionChanged = false; // to limit updates to database

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const noteRef = useRef<HTMLDivElement>(null);

  const { setSelectedTextNote } = useContext(TextNoteContext);

  useEffect(() => {
    autoGrow(textAreaRef.current!);
    bringToTop(noteRef.current!);
  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLElement>) => {
    console.log((e.target as HTMLElement).className);
    if ((e.target as HTMLElement).className !== "delete-button") {
      bringToTop(noteRef.current!);
      setSelectedTextNote(textNote);

      mouseStartPos.x = e.clientX;
      mouseStartPos.y = e.clientY;

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    // 1 - Calculate move direction
    const mouseMoveDir = {
      x: mouseStartPos.x - e.clientX,
      y: mouseStartPos.y - e.clientY,
    };

    // 2 - Update start position for next move.
    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;

    // 3 - Calculate new position and ensure it is in bounds.
    const newPosition = setInBounds(noteRef.current!, mouseMoveDir);

    // 4 - Update card top and left position.
    setPosition(newPosition);
    positionChanged = true;
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);

    // ensure position in bounds
    const newPosition = setInBounds(noteRef.current!);

    // update position in database upon mouse up if the position has changed
    if (positionChanged) {
      updateNote(id, "position", newPosition);
      positionChanged = false;
    }
  };

  const handleKeyUp = async () => {
    //1 - Initiate "saving" state
    setSaving(true);

    //2 - If we have a timer id, clear it so we can add another two seconds
    if (keyUpTimer.current) {
      clearTimeout(keyUpTimer.current);
    }

    //3 - Set timer to trigger save in 2 seconds
    keyUpTimer.current = setTimeout(() => {
      updateNote(id, "body", textAreaRef.current!.value);
      setSaving(false);
    }, 2000);
  };

  return (
    <div
      className="note pointer-events-auto absolute z-0 w-80 rounded shadow"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        backgroundColor: color.colorBody,
      }}
      ref={noteRef}
    >
      <div
        className="note-header flex cursor-pointer flex-row-reverse justify-between rounded-t p-1"
        style={{ backgroundColor: color.colorHeader }}
        onMouseDown={handleMouseDown}
      >
        <DeleteButton noteID={id} />
        {saving && (
          <div className="card-saving flex">
            <span style={{ color: color.colorText }}>Saving...</span>
          </div>
        )}
      </div>
      <div className="note-body">
        <textarea
          className="h-full w-full resize-none bg-transparent p-1 text-base outline-none"
          style={{ color: color.colorText }}
          defaultValue={body}
          ref={textAreaRef}
          onInput={() => autoGrow(textAreaRef.current!)}
          onFocus={() => {
            bringToTop(noteRef.current!);
            setSelectedTextNote(textNote);
          }}
          onKeyUp={handleKeyUp}
        ></textarea>
      </div>
    </div>
  );
};

export default TextNote;
