import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn, colorMap } from "../../lib/utils";
import { useAppStore } from "../../store/useAppStore";

interface FolderNode {
  id: string;
  name: string;
  color: string;
  icon: string;
  parentId: string | null;
  children: FolderNode[];
}

interface FolderTreeNodeProps {
  folder: FolderNode;
  depth: number;
}

const FolderTreeNode: React.FC<FolderTreeNodeProps> = ({ folder, depth }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { expandedFolders, toggleFolder } = useAppStore();
  
  const isOpen = expandedFolders.includes(folder.id);
  const isActive = location.pathname.includes(`/folders/${folder.id}`);
  const hasChildren = folder.children.length > 0;

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFolder(folder.id);
  };

  const handleClick = () => {
    navigate(`/folders/${folder.id}`);
  };

  return (
    <div className="select-none">
      <div 
        onClick={handleClick}
        style={{ paddingLeft: `${depth * 12 + 12}px` }}
        className={cn(
          "group flex items-center py-1.5 pr-3 cursor-pointer transition-colors relative",
          isActive 
            ? "text-primary bg-primary/5 font-medium" 
            : "text-text-muted hover:text-text-primary-light hover:bg-gray-100 dark:hover:bg-white/5"
        )}
      >
        {/* Active Indicator */}
        {isActive && (
          <motion.div 
            layoutId="active-folder"
            className="absolute left-0 w-1 h-full bg-primary"
          />
        )}

        <button 
          onClick={handleToggle}
          className={cn(
            "p-0.5 rounded hover:bg-gray-200 dark:hover:bg-white/10 transition-colors mr-1",
            !hasChildren && "invisible"
          )}
        >
          <ChevronRight 
            size={14} 
            className={cn("transition-transform duration-200", isOpen && "rotate-90")} 
          />
        </button>

        <span className="folder-dot" style={{ backgroundColor: colorMap[folder.color] || folder.color }} />
        
        <span className="truncate text-sm flex-1">{folder.name}</span>
        
        {/* Metadata or count could go here */}
        {hasChildren && (
          <span className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity ml-2 bg-gray-100 dark:bg-white/10 px-1.5 py-0.5 rounded-full">
            {folder.children.length}
          </span>
        )}
      </div>

      <AnimatePresence>
        {isOpen && hasChildren && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            {folder.children.map((child) => (
              <FolderTreeNode key={child.id} folder={child} depth={depth + 1} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FolderTreeNode;
