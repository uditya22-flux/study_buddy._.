import React from "react";
import { NavLink } from "react-router-dom";
import { 
  Library, 
  BookOpen, 
  Tags, 
  Users, 
  History, 
  FolderPlus, 
  Plus,
  Settings,
  HelpCircle,
  ChevronLeft
} from "lucide-react";
import { cn } from "../../lib/utils";

import { useQuery } from "@tanstack/react-query";
import { getFolderTree } from "../../api/folders";
import FolderTree from "../folders/FolderTree";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const { data: folderTree } = useQuery({
    queryKey: ["folderTree"],
    queryFn: getFolderTree,
  });

  const navItems = [
    { icon: Library, label: "Curated Collection", path: "/" },
    { icon: BookOpen, label: "Manuscripts", path: "/notes" },
    { icon: Tags, label: "Thematic Index", path: "/topics" },
    { icon: Users, label: "Collaborations", path: "/collab" },
    { icon: History, label: "History", path: "/history" },
  ];

  return (
    <aside 
      className={cn(
        "relative flex flex-col h-full transition-all duration-300 border-r border-[var(--border-color)] bg-[var(--surface-primary)]",
        isOpen ? "w-64" : "w-20"
      )}
    >
      <div className="flex flex-col h-full py-8">
        {/* Branding */}
        <div className={cn("px-6 mb-12 flex items-center", !isOpen && "justify-center")}>
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white shrink-0">
            <Library size={20} />
          </div>
          {isOpen && (
            <div className="ml-3 overflow-hidden">
              <h1 className="font-serif text-lg font-bold leading-tight truncate">The Archive</h1>
              <p className="text-[10px] uppercase tracking-widest text-text-muted-light dark:text-text-muted-dark">Study Buddy</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 px-3 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) => cn(
                "flex items-center px-3 py-2.5 rounded-m transition-all group",
                isActive 
                  ? "bg-primary/10 text-primary font-medium" 
                  : "text-text-muted-light dark:text-text-muted-dark hover:bg-gray-100 dark:hover:bg-white/5 hover:text-text-primary-light dark:hover:text-text-primary-dark"
              )}
            >
              <item.icon size={20} className={cn("shrink-0", !isOpen && "mx-auto")} />
              {isOpen && <span className="ml-3 truncate">{item.label}</span>}
            </NavLink>
          ))}

          {isOpen && folderTree && (
            <div className="mt-8">
               <p className="px-3 text-[10px] uppercase tracking-widest text-text-muted mb-2 font-bold flex items-center justify-between">
                  Inventory
                  <FolderPlus size={12} className="cursor-pointer hover:text-primary transition-colors" />
               </p>
               <FolderTree folders={folderTree} />
            </div>
          )}
        </nav>

        {/* Action Button */}
        <div className="px-3 mb-8">
          <button 
            className={cn(
              "btn-primary w-full flex items-center justify-center py-3 overflow-hidden",
              !isOpen && "rounded-full aspect-square p-0"
            )}
          >
            <Plus size={20} />
            {isOpen && <span className="ml-2 uppercase text-xs tracking-widest">New Entry</span>}
          </button>
        </div>

        {/* Footer Nav */}
        <div className="px-3 space-y-1">
          <button className="flex items-center w-full px-3 py-2 text-text-muted-light dark:text-text-muted-dark hover:text-text-primary-light transition-colors">
            <HelpCircle size={18} className="shrink-0" />
            {isOpen && <span className="ml-3 text-sm">Support</span>}
          </button>
          <button className="flex items-center w-full px-3 py-2 text-text-muted-light dark:text-text-muted-dark hover:text-text-primary-light transition-colors">
            <Settings size={18} className="shrink-0" />
            {isOpen && <span className="ml-3 text-sm">Settings</span>}
          </button>
        </div>
      </div>

      {/* Toggle Button */}
      <button 
        onClick={onToggle}
        className="absolute -right-3 top-10 w-6 h-6 bg-[var(--surface-primary)] border border-[var(--border-color)] rounded-full flex items-center justify-center text-text-muted-light hover:text-primary transition-colors shadow-sm"
      >
        <ChevronLeft size={14} className={cn("transition-transform", !isOpen && "rotate-180")} />
      </button>
    </aside>
  );
};

export default Sidebar;
