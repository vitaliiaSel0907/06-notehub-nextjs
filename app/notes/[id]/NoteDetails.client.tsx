"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import css from "./NoteDetails.module.css";
import { fetchNoteById } from "@/lib/api";
import type { Note } from "@/types/note";

const NoteDetailsClient = () => {
  const params = useParams();
  const id = params?.id as string;

  const {
    data: note,
    isLoading,
    error,
  } = useQuery<Note, Error>({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    enabled: !!id,
  });

  // loading
  if (isLoading) {
    return <p>Loading, please wait...</p>;
  }

  // error or no note
  if (error || !note) {
    return <p>Something went wrong.</p>;
  }

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>

        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{note.createdAt}</p>
      </div>
    </div>
  );
};

export default NoteDetailsClient;


