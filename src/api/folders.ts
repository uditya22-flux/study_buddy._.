import client from "./client";

export const getFolderTree = async () => {
  const { data } = await client.get("/folders/tree");
  return data;
};

export const createFolder = async (folder: { name: string; color?: string; icon?: string; parentId?: string | null }) => {
  const { data } = await client.post("/folders", folder);
  return data;
};

export const updateFolder = async (id: string, folder: any) => {
  const { data } = await client.patch(`/folders/${id}`, folder);
  return data;
};

export const deleteFolder = async (id: string) => {
  await client.delete(`/folders/${id}`);
};
