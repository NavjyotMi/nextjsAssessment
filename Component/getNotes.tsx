"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import EditNoteModal from "./EditModal";

type Note = {
  id: number;
  title: string;
  content: string;
  tag: string;
  user_id: string;
};

export default function NotesList() {
  const [summarizedNote, setSummarizedNote] = useState<string | null>(null);
  const [open, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const userId =
    typeof window !== "undefined" ? localStorage.getItem("user_id") : null;

  // Fetching notes using React Query
  const {
    data: notes,
    isLoading,
    isError,
    error,
  } = useQuery<Note[]>({
    queryKey: ["notes"],
    queryFn: async () => {
      const res = await axios.get("/api/notes", {
        headers: {
          "X-User-Id": userId,
        },
      });
      return res.data;
    },
    enabled: !!userId, // Only run query if jwt and userId are available
  });

  // Mutation for deleting notes
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const userId = localStorage.getItem("user_id");
      const res = await axios.delete(`/api/notes/${id}`, {
        headers: {
          "X-User-Id": userId,
        },
      });
      return res.data;
    },
    onSuccess: () => {
      // Invalidate query to refetch notes
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  // Summarize note content
  const handleSummarize = (content: string) => {
    const summary = content.split(".").slice(0, 1).join(".") + ".";
    setSummarizedNote(summary);
  };

  if (isLoading) return <p>Loading notes...</p>;
  if (isError) return <p>Error: {(error as Error).message}</p>;

  return (
    <div className="p-4 space-y-4">
      {notes && notes.length > 0 ? (
        notes.map((note) => (
          <div
            key={note.id}
            className="border p-4 rounded-xl shadow-sm bg-white"
          >
            <h3 className="font-semibold text-lg">{note.title}</h3>
            <p className="text-gray-700">{note.content}</p>
            <div className="flex gap-3 mt-3">
              <button
                onClick={() => setIsOpen(true)} // Set modal open
                className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md cursor-pointer"
              >
                Edit
              </button>
              {open && (
                <EditNoteModal
                  note={{
                    title: note.title,
                    content: note.content,
                    tag: note.tag,
                    id: note.id, // Use note.id here instead of note.user_id
                  }}
                  setIsOpen={setIsOpen}
                />
              )}
              <button
                onClick={() => deleteMutation.mutate(note.id)}
                className="px-3 py-1 text-sm bg-red-500 text-white rounded-md cursor-pointer"
              >
                Delete
              </button>
              <button
                onClick={() => handleSummarize(note.content)}
                className="px-3 py-1 text-sm bg-yellow-500 text-white rounded-md  cursor-pointer"
              >
                Summarize
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No notes available.</p>
      )}
      {summarizedNote && (
        <div className="mt-4 p-4 bg-yellow-100 rounded-md">
          <strong>Summary:</strong> {summarizedNote}
        </div>
      )}
    </div>
  );
}
