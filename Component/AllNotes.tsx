// "use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import NoteItem from "./NotesList";
import { useEffect, useState } from "react";
type Note = {
  id: number;
  title: string;
  content: string;
  tag: string;
  user_id: string;
  updatedAt: string;
  summary: string;
};

export default function AllNotes() {
  const [userId, setUserId] = useState<string | null>(null);
  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");
    setUserId(storedUserId); // Set the userId once the component mounts
  }, []);

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
    enabled: !!userId,
  });

  if (isLoading) return <p>Loading notes...</p>;
  if (isError) return <p>Error: {(error as Error).message}</p>;

  return (
    <div className="p-4 space-y-4">
      {notes && notes.length > 0 ? (
        notes.map((note) => <NoteItem key={note.id} note={note} />)
      ) : (
        <p>No notes available.</p>
      )}
    </div>
  );
}
