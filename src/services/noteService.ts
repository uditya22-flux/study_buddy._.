import prisma from "../config/db";

export const getNotesInFolder = async (folderId: string, userId: string) => {
  return prisma.note.findMany({
    where: { folderId, userId },
    orderBy: [{ isPinned: "desc" }, { updatedAt: "desc" }]
  });
};

export const getNoteById = async (id: string, userId: string) => {
  return prisma.note.findFirst({
    where: { id, userId }
  });
};

export const createNote = async (data: {
  userId: string;
  folderId: string;
  title?: string;
}) => {
  return prisma.note.create({
    data: {
      ...data,
      title: data.title || "Untitled",
      content: {},
    },
  });
};

export const updateNote = async (id: string, userId: string, data: any) => {
  return prisma.note.updateMany({
    where: { id, userId },
    data,
  });
};

export const deleteNote = async (id: string, userId: string) => {
  return prisma.note.deleteMany({
    where: { id, userId },
  });
};

export const searchNotes = async (userId: string, query: string) => {
  // Simple search for now, spec mentions full-text which requires raw query
  // or a more complex Prisma setup.
  return prisma.note.findMany({
    where: {
      userId,
      OR: [
        { title: { contains: query, mode: "insensitive" } },
        { content: { path: ["ops"], array_contains: query } } // JSON path search
      ]
    }
  });
};
