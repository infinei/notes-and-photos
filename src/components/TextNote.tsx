"use client";

import React, { useEffect, useRef, useState } from "react";
import Note from "@/assets/note";
import TrashIcon from "@/assets/TrashIcon";
import { autoGrow, setInBounds, bringToTop } from "@/utils/noteUtils";

const TextNote = (note: Note) => {
  const [position, setPosition] = useState(JSON.parse(note.position));
  const color = JSON.parse(note.color);
  const body = JSON.parse(note.body);

  const mouseStartPos = { x: 0, y: 0 };

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const noteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    autoGrow(textAreaRef.current!);
  }, []);

  const mouseDown = (e: React.MouseEvent<HTMLElement>) => {
    bringToTop(noteRef.current!);

    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;

    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);
  };

  const mouseMove = (e: MouseEvent) => {
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
  };

  const mouseUp = () => {
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);
  };

  return (
    <div
      className="note z-0 pointer-events-auto absolute w-80 cursor-pointer rounded shadow"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        backgroundColor: color.colorBody,
      }}
      ref={noteRef}
    >
      <div
        className="note-header flex items-center justify-between rounded-t p-1"
        style={{ backgroundColor: color.colorHeader }}
        onMouseDown={mouseDown}
      >
        <TrashIcon size="24" />
      </div>
      <div className="note-body">
        <textarea
          className="h-full w-full resize-none bg-transparent p-1 text-base outline-none"
          style={{ color: color.colorText }}
          defaultValue={body}
          ref={textAreaRef}
          onInput={() => autoGrow(textAreaRef.current!)}
          onFocus={() => bringToTop(noteRef.current!)}
        ></textarea>
      </div>
    </div>
  );
};

export default TextNote;
