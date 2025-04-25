// NoteItem.tsx
import React, { useState } from "react";
import EditNoteModal from "./EditModal";
import Summarization from "./Summarization";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Span } from "next/dist/trace";

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
  const queryClient = useQueryClient();
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
        <p className="text-gray-600 mt-2">{note.summary}</p>
      ) : (
        <p className="text-gray-600 mt-2">{note.content}</p>
      )}
      <div className="flex gap-4 mt-4">
        <button
          onClick={handleSeeContent} // Set modal open
          className="px-4 py-2 text-sm text-white bg-gray-700 hover:bg-gray-600 rounded-md transition-colors duration-200 cursor-pointer"
        >
          Open
        </button>
        <button
          onClick={handleEdit} // Set modal open
          className="px-4 py-2 text-sm text-white bg-gray-700 hover:bg-gray-600 rounded-md transition-colors duration-200 cursor-pointer"
        >
          Edit
        </button>
        <button
          onClick={() => deleteMutation.mutate(note.id)}
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
