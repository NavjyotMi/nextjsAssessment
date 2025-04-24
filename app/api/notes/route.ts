// app/api/notes/route.ts
import { NextResponse } from "next/server";

// GET all notes
export async function GET() {
  // pretend you fetch from DB
  console.log("is it hitting the api ");
  const notes = [
    { id: 1, title: "Note 1", content: "First note" },
    { id: 2, title: "Note 2", content: "Second note" },
  ];

  return NextResponse.json(notes);
}

// POST a new note
export async function POST(req: Request) {
  const body = await req.json();
  const { title, content } = body;

  if (!title || !content) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // pretend you save to DB
  const newNote = {
    id: Date.now(),
    title,
    content,
  };

  return NextResponse.json(newNote, { status: 201 });
}
