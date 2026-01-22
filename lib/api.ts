import axios from "axios";
import type {
  Note,
  NotesResponse,
  CreateNotePayload,
} from "@/types/note";

const api = axios.create({
  baseURL: "https://notehub-api.goit.global",
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

// =======================
// GET ALL NOTES
// =======================
export const fetchNotes = async ({
  page,
  perPage,
  search,
}: {
  page: number;
  perPage: number;
  search: string;
}): Promise<NotesResponse> => {
  const { data } = await api.get<NotesResponse>("/notes", {
    params: { page, perPage, search },
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
export const createNote = async (
  payload: CreateNotePayload
): Promise<Note> => {
  const { data } = await api.post<Note>("/notes", payload);
  return data;
};

// =======================
// DELETE NOTE
// =======================
export const deleteNote = async (id: string): Promise<void> => {
  await api.delete(`/notes/${id}`);
};

