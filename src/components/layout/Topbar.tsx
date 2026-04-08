import React from "react";
import { Search, Settings, User } from "lucide-react";
import { NavLink } from "react-router-dom";

interface TopbarProps {
  onMenuClick: () => void;
}

const Topbar: React.FC<TopbarProps> = () => {
  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-[var(--border-color)] bg-[var(--surface-primary)]/80 backdrop-blur-md sticky top-0 z-10">
      <div className="flex items-center space-x-8">
        <nav className="hidden md:flex items-center space-x-6">
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? "font-medium border-b-2 border-primary py-5 -mb-5" : "text-text-muted-light dark:text-text-muted-dark hover:text-text-primary-light transition-colors"}
          >
            Archive
          </NavLink>
          <NavLink 
            to="/research" 
            className={({ isActive }) => isActive ? "font-medium border-b-2 border-primary py-5 -mb-5" : "text-text-muted-light dark:text-text-muted-dark hover:text-text-primary-light transition-colors"}
          >
            Research
          </NavLink>
          <NavLink 
            to="/synthesize" 
            className={({ isActive }) => isActive ? "font-medium border-b-2 border-primary py-5 -mb-5" : "text-text-muted-light dark:text-text-muted-dark hover:text-text-primary-light transition-colors"}
          >
            Synthesize
          </NavLink>
        </nav>
      </div>

      <div className="flex-1 max-w-xl mx-8 relative group">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-text-muted-light">
          <Search size={18} />
        </div>
        <input 
          type="text" 
          placeholder="Consult the records..." 
          className="w-full bg-gray-100 dark:bg-white/5 border-none rounded-s pl-10 pr-4 py-2 text-sm focus:ring-1 focus:ring-primary/50 transition-all outline-none"
        />
        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-[10px] text-text-muted-light">
          ⌘K
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button className="p-2 text-text-muted-light hover:text-text-primary-light transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-white/5">
          <Settings size={20} />
        </button>
        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center overflow-hidden border border-[var(--border-color)] transition-transform hover:scale-105 cursor-pointer">
          <User size={20} className="text-gray-500" />
        </div>
        <div className="flex flex-col items-start leading-none pointer-events-none hidden lg:flex">
          <span className="text-xs font-semibold">Scholar</span>
          <span className="text-[10px] text-text-muted">Pro Vol.</span>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
