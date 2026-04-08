import client from "./client";

export const getNotes = async (folderId: string) => {
  const { data } = await client.get("/notes", { params: { folderId } });
  return data;
};

export const getNote = async (id: string) => {
  const { data } = await client.get(`/notes/${id}`);
  return data;
};

export const createNote = async (note: { title: string; folderId: string }) => {
  const { data } = await client.post("/notes", note);
  return data;
};

export const updateNote = async (id: string, note: any) => {
  const { data } = await client.patch(`/notes/${id}`, note);
  return data;
};

export const deleteNote = async (id: string) => {
  await client.delete(`/notes/${id}`);
};
