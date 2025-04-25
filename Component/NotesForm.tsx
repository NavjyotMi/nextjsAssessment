"use client";

import { useState } from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const tags = ["important", "work", "personal"];

export default function NoteForm() {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [tag, setTag] = useState("");
  const [errors, setErrors] = useState<{ title?: string; note?: string }>({});
  const [submitted, setSubmitted] = useState(false);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      title,
      note,
      tag,
    }: {
      title: string;
      note: string;
      tag: string;
    }) => {
      const userId = localStorage.getItem("user_id");
      const res = await axios.post("/api/notes", {
        title,
        content: note,
        tag,
        user_id: userId,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      setTitle("");
      setNote("");
      setTag("");
      setErrors({});
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 2000);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submit triggered");

    const errs: { title?: string; note?: string } = {};
    if (!title.trim()) errs.title = "Title is required";
    if (!note.trim()) errs.note = "Note is required";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    console.log("Calling mutation...");
    mutation.mutate({ title, note, tag });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg w-full mx-auto p-6 space-y-6 bg-white rounded-lg shadow-lg border border-gray-200"
    >
      <h2 className="text-2xl font-semibold text-gray-900 text-center mb-6">
        Create Note
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Title
        </label>
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Note
        </label>
        <textarea
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
          rows={4}
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        {errors.note && (
          <p className="text-red-500 text-sm mt-1">{errors.note}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tag (optional)
        </label>
        <select
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        >
          <option value="">Select a tag</option>
          {tags.map((t) => (
            <option key={t} value={t}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={mutation.isPending}
        className="w-full py-3 px-4 rounded-md bg-black text-white font-semibold hover:bg-gray-800 transition-all duration-300 disabled:opacity-50 cursor-pointer"
      >
        {mutation.isPending ? "Adding..." : "Add Note"}
      </button>

      {submitted && (
        <p className="text-green-600 text-sm mt-2 text-center">
          Note submitted successfully!
        </p>
      )}
    </form>
  );
}
