import React from "react";
import { FolderWithChildren } from "../../../../backend/src/services/folderService"; // Note: In a real monorepo, use shared types
import FolderTreeNode from "./FolderTreeNode";

// Since we're in a combined project, I'll redefine the type or use a shared one
interface FolderNode {
  id: string;
  name: string;
  color: string;
  icon: string;
  parentId: string | null;
  children: FolderNode[];
}

interface FolderTreeProps {
  folders: FolderNode[];
}

const FolderTree: React.FC<FolderTreeProps> = ({ folders }) => {
  return (
    <div className="py-2">
      {folders.map((folder) => (
        <FolderTreeNode key={folder.id} folder={folder} depth={0} />
      ))}
    </div>
  );
};

export default FolderTree;
