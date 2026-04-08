import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Breadcrumb from "./Breadcrumb";
import ChatFAB from "../chat/ChatFAB";
import ChatPanel from "../chat/ChatPanel";

const AppShell: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark text-text-primary-light dark:text-text-primary-dark">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Topbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <div className="px-6 py-2">
          <Breadcrumb />
        </div>
        <main className="flex-1 overflow-y-auto px-6 pb-6">
          <Outlet />
        </main>
      </div>

      <ChatPanel />
      <ChatFAB />
    </div>
  );
};

export default AppShell;
