import axios from "axios";
import type { Note, NotesResponse } from "@/types/note";

const API_URL = "https://notehub-api.goit.global";
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const fetchNotes = async ({
  page,
  perPage,
  search = "",
}: {
  page: number;
  perPage: number;
  search?: string;
}): Promise<NotesResponse> => {
  const { data } = await api.get("/notes", {
    params: { page, perPage, search },
  });
  return data;
};

export const createNote = async (note: {
  title: string;
  content?: string;
  tag: string;
}): Promise<Note> => {
  const { data } = await api.post("/notes", note);
  return data;
};

export const deleteNote = async (id: string): Promise<void> => {
  await api.delete(`/notes/${id}`);
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get(`/notes/${id}`);
  return data;
};


