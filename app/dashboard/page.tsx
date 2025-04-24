"use client";
// import axios from "axios";
import React from "react";
import NoteForm from "@/Component/NotesForm";
import NotesList from "@/Component/getNotes";
export default function dashboard() {
  //   if (error) {
  //     return <div>{error}</div>;
  //   }
  return (
    <div>
      <NoteForm />
      <NotesList />
    </div>
  );
}
