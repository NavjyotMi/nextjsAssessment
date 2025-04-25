"use client";

import axios from "axios";
import { useEffect, useState } from "react";

type SummarizationProps = {
  note: string;
};
export default function Summarization({ note }: SummarizationProps) {
  const [summarizedNote, seteSummarizedNotes] = useState("");
  useEffect(() => {
    async function summarizeText(text: string) {
      const data = await axios.post("/api/summarize", {
        text: text,
      });
      console.log("Summarized data:", data);
      seteSummarizedNotes(data.data.text);
    }
    summarizeText(note);
  }, []);
  console.log("Summarization component rendered with note:", note);

  return (
    <>
      {summarizedNote.length > 0 ? (
        <div>{summarizedNote}</div>
      ) : (
        <div>Loading</div>
      )}
    </>
  );
}
