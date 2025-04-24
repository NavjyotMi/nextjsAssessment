// app/api/notes/route.ts
import { supabase } from "@/library/supabaseClient";
import { NextResponse } from "next/server";

// GET all notes
export async function GET(req: Request) {
  const userId = req.headers.get("x-user-id");
  console.log("User ID:", userId); // Log the user ID for debugging
  try {
    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .eq("user_id", userId);
    console.log(data);
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
  // const userId = req.headers.get("x-user-id");
  // console.log("User ID:", userId); // Log the user ID for debugging
  // const {title, content, tag}=req.body;
  // if (!userId) {
  //   return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
  // }

  // const body = await req.json();
  // const { title, content, tag } = body;

  // if (!title || !content) {
  //   return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  // }

  // const summary = content.slice(0, 40); // Generate summary from content

  // const { data, error } = await supabase.from("notes").insert([
  //   {
  //     title,
  //     content,
  //     summary,
  //     tag: tag || null,
  //     user_id: userId,
  //   },
  // ]);

  // if (error) {
  //   console.error("Error saving note:", error.message);
  //   return NextResponse.json({ error: "Error saving note" }, { status: 500 });
  // }

  // return NextResponse.json(data, { status: 201 });
  return NextResponse.json("done", { status: 201 });
}
