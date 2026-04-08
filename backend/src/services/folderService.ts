import prisma from "../config/db";

export interface FolderWithChildren {
  id: string;
  name: string;
  color: string;
  icon: string;
  parentId: string | null;
  isPinned: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
  children: FolderWithChildren[];
}

export const buildFolderTree = async (userId: string): Promise<FolderWithChildren[]> => {
  const allFolders = await prisma.folder.findMany({
    where: { userId },
    orderBy: [{ isPinned: "desc" }, { order: "asc" }, { name: "asc" }]
  });

  const buildTree = (parentId: string | null): FolderWithChildren[] =>
    allFolders
      .filter(f => f.parentId === parentId)
      .map(f => ({ ...f, children: buildTree(f.id) }));

  return buildTree(null);
};

export const createFolder = async (data: {
  userId: string;
  name: string;
  color?: string;
  icon?: string;
  parentId?: string | null;
}) => {
  return prisma.folder.create({
    data: {
      ...data,
      order: 0, // In real app, we might want to get the last order + 1
    },
  });
};

export const updateFolder = async (id: string, userId: string, data: any) => {
  return prisma.folder.updateMany({
    where: { id, userId },
    data,
  });
};

export const deleteFolder = async (id: string, userId: string) => {
  // Cascading delete is handled by Prisma schema (onDelete: Cascade)
  return prisma.folder.deleteMany({
    where: { id, userId },
  });
};
