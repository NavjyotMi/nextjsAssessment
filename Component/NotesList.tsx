"use client";

import React, { useState, useEffect } from "react";
import EditNoteModal from "./EditModal";
import Summarization from "./Summarization";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type Note = {
  id: number;
  title: string;
  content: string;
  tag: string;
  user_id: string;
  summary: string;
  updatedAt: string;
};

interface NoteItemProps {
  note: Note;
}

const NoteItem = ({ note }: NoteItemProps) => {
  const [open, setIsOpen] = useState<boolean>(false);
  const [summarizedNote, setSummarizedNote] = useState<boolean>(false);
  const [seeContent, setSeeContent] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null); // State to store userId
  const queryClient = useQueryClient();

  useEffect(() => {
    // Check for user_id in localStorage only when on the client-side
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("user_id");
      if (storedUserId) {
        setUserId(storedUserId);
      } else {
        console.error("User is not authenticated, no user_id in localStorage.");
        // Handle redirection or show a message if necessary
      }
    }
  }, []);

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      if (!userId) {
        throw new Error("User is not authenticated");
      }

      const res = await axios.delete(`/api/notes/${id}`, {
        headers: {
          "X-User-Id": userId, // Pass the user ID in headers for authentication
        },
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  function handleEdit() {
    setSummarizedNote(false);
    setIsOpen(true);
  }

  // Summarize note content
  const handleSummarize = () => {
    setSummarizedNote(!summarizedNote);
  };
  const handleSeeContent = () => {
    setSeeContent(!seeContent);
  };

  return (
    <div
      key={note.id}
      className="border p-6 rounded-lg shadow-md bg-white hover:bg-gray-50 transition-all duration-200"
    >
      <div>
        <h3 className="font-semibold text-xl text-gray-800">
          {note.title}
          {note.tag && (
            <span className="ml-2 px-3 py-1 text-sm bg-blue-200 text-blue-800 rounded-full">
              {note.tag}
            </span>
          )}
        </h3>
      </div>

      {seeContent ? (
        <p className="text-gray-600 mt-2">{note.content}</p>
      ) : (
        <p className="text-gray-600 mt-2">{note.summary}</p>
      )}
      <div className="flex gap-4 mt-4">
        <button
          onClick={handleSeeContent}
          className="px-4 py-2 text-sm text-white bg-gray-700 hover:bg-gray-600 rounded-md transition-colors duration-200 cursor-pointer"
        >
          Open
        </button>
        <button
          onClick={handleEdit}
          className="px-4 py-2 text-sm text-white bg-gray-700 hover:bg-gray-600 rounded-md transition-colors duration-200 cursor-pointer"
        >
          Edit
        </button>
        <button
          onClick={() => {
            if (userId) {
              deleteMutation.mutate(note.id);
            } else {
              alert("You must be logged in to delete notes.");
            }
          }}
          className="px-4 py-2 text-sm text-white bg-gray-700 hover:bg-gray-600 rounded-md transition-colors duration-200 cursor-pointer"
        >
          Delete
        </button>
        <button
          onClick={handleSummarize}
          className="px-4 py-2 text-sm text-white bg-gray-700 hover:bg-gray-600 rounded-md transition-colors duration-200 cursor-pointer"
        >
          Summarize
        </button>
      </div>
      {open && (
        <EditNoteModal
          note={{
            title: note.title,
            content: note.content,
            tag: note.tag,
            id: note.id,
          }}
          setIsOpen={setIsOpen}
          open={open}
        />
      )}
      {summarizedNote && <Summarization note={note.content} />}
    </div>
  );
};

export default NoteItem;
