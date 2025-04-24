"use client";

import { useState } from "react";

type EditNoteModalProps = {
  note: { id: string; title: string; content: string; tag: string };
  setIsOpen: (open: boolean) => void;
};

export default function EditNoteModal({ note, setIsOpen }: EditNoteModalProps) {
  const [title, setTitle] = useState(note.title);
  const [noteText, setNoteText] = useState(note.content);
  const [tag, setTag] = useState(note.tag);
  console.log("Note data:", note);
  // Handle submit
  const handleSubmit = () => {
    console.log("Updated note:", { title, noteText, tag });
    setIsOpen(false); // Close the modal after saving
  };

  // Handle cancel (close modal)
  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg w-96">
          <h2 className="text-2xl font-semibold mb-4">Edit Note</h2>

          {/* Display note data */}
          <div className="mb-4">
            <strong>ID:</strong> <p>{note.id}</p>
          </div>
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
          <div className="mb-4">
            <strong>Tag:</strong>
            <input
              type="text"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="border p-2 w-full"
              placeholder="Tag"
            />
          </div>

          {/* Modal Buttons */}
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
