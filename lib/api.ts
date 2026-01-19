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

// =======================
// GET ALL NOTES
// =======================
interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
}

export const fetchNotes = async ({
  page,
  perPage,
  search = "",
}: FetchNotesParams): Promise<NotesResponse> => {
  const { data } = await api.get<NotesResponse>("/notes", {
    params: {
      page,
      perPage,
      search,
    },
  });

  return data;
};

// =======================
// GET NOTE BY ID
// =======================
export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
};

// =======================
// CREATE NOTE
// =======================
interface CreateNoteData {
  title: string;
  content?: string;
  tag: string;
}

export const createNote = async (note: CreateNoteData): Promise<Note> => {
  const { data } = await api.post<Note>("/notes", note);
  return data;
};

// =======================
// DELETE NOTE
// =======================
export const deleteNote = async (id: string): Promise<void> => {
  await api.delete(`/notes/${id}`);
};
