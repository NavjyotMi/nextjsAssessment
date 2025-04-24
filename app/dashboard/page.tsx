"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import NoteForm from "@/Component/NotesForm";
export default function () {
  const [notes, setNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      setError(null);

      const jwt = localStorage.getItem("supabase_jwt"); // Get the JWT from localStorage

      if (!jwt) {
        setError("No JWT token found. Please sign in.");
        setLoading(false);
        return;
      }

      try {
        // Making the API call to get the notes
        const response = await axios.get("/api/notes", {
          headers: {
            Authorization: `Bearer ${jwt}`, // Send the JWT token in the Authorization header
          },
        });

        setNotes(response.data); // Assuming the response contains the notes data
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch notes");
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  //   if (error) {
  //     return <div>{error}</div>;
  //   }
  return (
    <div>
      <NoteForm />
      {error && <div>{error}</div>}
      {loading && <div>Loading...</div>}
    </div>
  );
}
