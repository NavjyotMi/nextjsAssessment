import { supabase } from "@/library/supabaseClient";
import {} from "next";
import { NextRequest, NextResponse } from "next/server";
NextRequest;
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  const userId = req.headers.get("x-user-id");

  const { error } = await supabase.from("notes").delete().eq("id", id);

  if (error) {
    console.log("Error deleting note:", error.message);
    return NextResponse.json({ error: error.message });
  }

  return NextResponse.json({ message: "Note deleted successfully" });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  const userId = req.headers.get("x-user-id");

  const { error } = await supabase.from("notes").delete().eq("id", id);

  if (error) {
    console.log("Error deleting note:", error.message);
    return NextResponse.json({ error: error.message });
  }

  return NextResponse.json({ message: "Note deleted successfully" });
}
