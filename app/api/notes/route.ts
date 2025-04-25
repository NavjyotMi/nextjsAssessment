// app/api/notes/route.ts
import { supabase } from "@/library/supabaseClient";
import { NextResponse } from "next/server";

// GET all notes
export async function GET(req: Request) {
  const userId = req.headers.get("x-user-id");

  try {
    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .eq("user_id", userId);
    if (error) {
      console.error("Error fetching notes:", error.message);
      return new NextResponse("Error fetching notes", { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error:", error);
    return new NextResponse("Error fetching notes", { status: 500 });
  }
}

// POST a new note
export async function POST(req: Request) {
  const body = await req.json();
  const { title, content, tag, user_id } = body;

  if (!user_id) return NextResponse.json({ message: "No user Id" });

  if (!title || !content) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const summary = `${content.slice(0, 100)}.....`;
  // Generate summary from content
  console.log("The summary is", summary);
  const { error } = await supabase
    .from("notes")
    .insert([
      {
        title,
        content,
        summary,
        tag: tag || null,
        user_id,
      },
    ])
    .select("*");

  if (error) {
    console.log("Error inserting note:", error.message);
    return NextResponse.json(
      { error: "Error inserting note" },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: "Success", status: 201 });
}
