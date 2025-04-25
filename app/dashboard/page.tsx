"use client";

import React from "react";
import NoteForm from "@/Component/NotesForm";
// import NotesList from "@/Component/getNotes";
import NotesList from "@/Component/GetNotes";

export default function dashboard() {
  function handleLogout() {
    localStorage.removeItem("supabase_jwt");
    localStorage.removeItem("user_id");
    window.location.href = "/";
  }
  return (
    <div>
      <div className="flex justify-center items-center  p-4">
        <button
          onClick={handleLogout}
          className="px-6 py-2 bg-gray-800 text-white rounded-md shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 cursor-pointer"
        >
          Logout
        </button>
      </div>
      <NoteForm />
      <br></br>
      <NotesList />
    </div>
  );
}
