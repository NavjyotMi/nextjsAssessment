import { supabase } from "@/library/supabaseClient";
import {} from "next";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const id = context.params.id;

  const userId = req.headers.get("x-user-id");

  const { error } = await supabase
    .from("notes")
    .delete()
    .eq("id", id)
    .eq("user_id", userId);

  if (error) {
    return NextResponse.json({ error: error.message });
  }

  return NextResponse.json({ message: "Note deleted successfully" });
}

export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const id = context.params.id;

  const { title, content, tag } = await req.json();
  const userId = req.headers.get("x-user-id");

  const summary = `${content.slice(0, 100)}.....`;
  const updateData = {
    title: title,
    content: content,
    summary: summary,
    ...(tag && { tag }),
  };

  const { error } = await supabase
    .from("notes")
    .update(updateData)
    .eq("id", id)
    .eq("user_id", userId);

  if (error) {
    return NextResponse.json({ error: error.message });
  }

  return NextResponse.json({ message: "Note updated successfully" });
}
