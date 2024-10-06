// get notes
export const getNotes = async () => {
  console.log(process.env.NEXT_PUBLIC_API_ENDPOINT + "/textNotes");
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_ENDPOINT! + "/textNotes",
  );
  const result = await response.json();

  return result.body;
};

// create new note
export const createNote = async (
  body: string = "",
  color: string = "color-yellow",
  position: { x: number; y: number } = { x: 0, y: 0 },
) => {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_ENDPOINT! + "/textNotes",
      {
        method: "POST",
        body: JSON.stringify({
          body: body,
          color: color,
          position: position,
        }),
      },
    );
    const { newNote } = await response.json();

    console.log("handleAddNote", newNote);
    return newNote;
  } catch (err) {
    console.log(err);
  }
};

// patch request to update data upon value change
export const updateNote = async (id: string, key: string, value: unknown) => {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_ENDPOINT! + "/textNotes",
      {
        method: "PATCH",
        body: JSON.stringify({
          id: id,
          key: key,
          value: value,
        }),
      },
    );
    console.log("response from api", response);
  } catch (err) {
    console.log(err);
  }
};

// delete note with id
export const deleteNote = async (id: string) => {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_ENDPOINT! + "/textNotes",
      {
        method: "DELETE",
        body: JSON.stringify({
          id: id,
        }),
      },
    );
    console.log("response from api", response);
  } catch (err) {
    console.log(err);
  }
};
