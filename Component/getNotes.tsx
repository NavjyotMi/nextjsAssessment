"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";

// type Note = {
//   id: number;
//   title: string;
//   content: string;
// };

export default function NotesList() {
  //     const [summarizedNote, setSummarizedNote] = useState<string | null>(null);
  //     const queryClient = useQueryClient();
  //     const userId = typeof window !== "undefined" ? localStorage.getItem("user_id") : null;
  //     // Fetching notes using React Query
  //     const {
  //       data: notes,
  //       isLoading,
  //       isError,
  //       error,
  //     } = useQuery<Note[]>({
  //       queryKey: ["notes"],
  //       queryFn: async () => {
  //         const res = await axios.get("/api/notes", {
  //           headers: {
  //             "X-User-Id": userId,
  //           },
  //         });
  //         return res.data;
  //       },
  //       enabled: !!userId, // Only run query if jwt and userId are available
  //     });
  //     // Mutation for deleting notes
  //     const deleteMutation = useMutation({
  //       mutationFn: async (id: number) => {
  //         const jwt = localStorage.getItem("supabase_jwt");
  //         const userId = localStorage.getItem("user_id");
  //         if (!jwt || !userId) throw new Error("Auth token or user ID missing");
  //         const res = await axios.delete(`/api/notes/${id}`, {
  //           headers: {
  //             Authorization: `Bearer ${jwt}`,
  //             "X-User-Id": userId,
  //           },
  //         });
  //         return res.data;
  //       },
  //       onSuccess: () => {
  //         // Invalidate query to refetch notes
  //         queryClient.invalidateQueries(["notes"]);
  //       },
  //     });
  //     // Mutation for editing notes (stub, you can extend as needed)
  //     const handleEdit = (id: number) => {
  //       console.log(`Editing note ${id}`);
  //       // Add your logic for editing the note
  //     };
  //     // Summarize note content
  //     const handleSummarize = (content: string) => {
  //       const summary = content.split(".").slice(0, 1).join(".") + ".";
  //       setSummarizedNote(summary);
  //     };
  //     if (isLoading) return <p>Loading notes...</p>;
  //     if (isError) return <p>Error: {(error as Error).message}</p>;
  //   return (
  //     <div className="p-4 space-y-4">
  //       {notes && notes.length > 0 ? (
  //         notes.map((note) => (
  //           <div
  //             key={note.id}
  //             className="border p-4 rounded-xl shadow-sm bg-white"
  //           >
  //             <h3 className="font-semibold text-lg">{note.title}</h3>
  //             <p className="text-gray-700">{note.content}</p>
  //             <div className="flex gap-3 mt-3">
  //               <button
  //                 onClick={() => handleEdit(note.id)}
  //                 className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md"
  //               >
  //                 Edit
  //               </button>
  //               <button
  //                 onClick={() => deleteMutation.mutate(note.id)}
  //                 className="px-3 py-1 text-sm bg-red-500 text-white rounded-md"
  //                 disabled={deleteMutation.isLoading}
  //               >
  //                 {deleteMutation.isLoading ? "Deleting..." : "Delete"}
  //               </button>
  //               <button
  //                 onClick={() => handleSummarize(note.content)}
  //                 className="px-3 py-1 text-sm bg-yellow-500 text-white rounded-md"
  //               >
  //                 Summarize
  //               </button>
  //             </div>
  //           </div>
  //         ))
  //       ) : (
  //         <p>No notes available.</p>
  //       )}
  //       {summarizedNote && (
  //         <div className="mt-4 p-4 bg-yellow-100 rounded-md">
  //           <strong>Summary:</strong> {summarizedNote}
  //         </div>
  //       )}
  //     </div>
  //   );
}
