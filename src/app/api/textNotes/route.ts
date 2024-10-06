import { Db, MongoClient, ObjectId } from "mongodb";
import { NextRequest } from "next/server";

const client: MongoClient = new MongoClient(process.env.DB_CONNECTION_STRING!);
const db: Db = client.db("noteDB");
console.log("connected to db");

// retrieve note data
export async function GET() {
  const data = await db.collection("textNotes").find({}).toArray();
  return Response.json({ status: 200, body: data });
}

// idempotent create note
export async function PUT() {}

// non-idempotent create note
export async function POST(request: NextRequest) {
  const newData = await request.json();
  const newNote = await createTextNote(newData.body, newData.color, newData.position);

  return Response.json({ status: 200, newNote: newNote });
}

// update note
export async function PATCH(request: NextRequest) {
  const newData = await request.json();
  updateTextNotes(newData.id, newData.key, newData.value);
  return Response.json({ status: 200 });
}

// delete note
export async function DELETE(request: NextRequest) {
  const newData = await request.json();
  deleteTextNotes(newData.id);
  return Response.json({ status: 200 });
}

// creates text note, returns new note
const createTextNote = async (
  body: string,
  color: string,
  position: { x: number; y: number },
) => {
  try {
    const response = await db
      .collection("textNotes")
      .insertOne({ body: body, color: color, position: position });

    return {
      _id: response.insertedId,
      body: body,
      color: color,
      position: position,
    };
  } catch (err) {
    console.log(err);
  }
};

const updateTextNotes = async (id: string, key: string, value: unknown) => {
  try {
    const response = await db
      .collection("textNotes")
      .updateOne({ _id: new ObjectId(id) }, { $set: { [key]: value } });
    return response;
  } catch (err) {
    console.error(err);
  }
};

const deleteTextNotes = async (id: string) => {
  try {
    const response = await db
      .collection("textNotes")
      .deleteOne({ _id: new ObjectId(id) });
    return response;
  } catch (err) {
    console.error(err);
  }
};
