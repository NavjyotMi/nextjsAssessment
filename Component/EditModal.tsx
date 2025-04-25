"use client";

import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type EditNoteModalProps = {
  note: { id: number; title: string; content: string; tag: string };
  setIsOpen: (open: boolean) => void;
  open: boolean;
};

const updateNote = async (
  noteId: number,
  updatedData: { title: string; content: string; tag: string },
  userId: string
) => {
  const res = await fetch(`/api/notes/${noteId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", "X-User-Id": userId },
    body: JSON.stringify(updatedData),
  });
};

export default function EditNoteModal({
  note,
  setIsOpen,
  open,
}: EditNoteModalProps) {
  const [title, setTitle] = useState(note.title);
  const [noteText, setNoteText] = useState(note.content);
  const [tag, setTag] = useState(note.tag);
  const [userId, setUserId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  // Use useEffect to safely access localStorage only on the client side
  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");
    setUserId(storedUserId);
  }, []); // Only run once when component mounts

  const mutation = useMutation({
    mutationFn: ({
      noteId,
      updatedData,
    }: {
      noteId: number;
      updatedData: any;
    }) => updateNote(noteId, updatedData, userId || ""), // Ensure userId is passed even if it's null
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] }); // Refetch the notes after update
    },
  });

  const handleSubmit = () => {
    if (!userId) {
      // Handle the case where userId is not available
      alert("User ID not found.");
      return;
    }

    console.log("Updated note:", { title, noteText, tag });
    mutation.mutate({
      noteId: note.id,
      updatedData: { title, content: noteText, tag },
    });

    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg w-96">
          <h2 className="text-2xl font-semibold mb-4">Edit Note</h2>

          <div className="mb-4">
            <strong>Title:</strong>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-2 w-full"
              placeholder="Title"
            />
          </div>
          <div className="mb-4">
            <strong>Content:</strong>
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              className="border p-2 w-full"
              placeholder="Note content"
            />
          </div>
          <div>
            <select
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="border p-2 w-full"
            >
              <option value="" disabled>
                Select a tag
              </option>
              {["important", "work", "personal"].map((t) => (
                <option key={t} value={t}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-between">
            <button
              onClick={handleCancel}
              className="bg-gray-300 text-black px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
