import React from "react";
import { Folder, FileText, Zap, TrendingUp, Plus, Library, Tags } from "lucide-react";
import { motion } from "framer-motion";

const Dashboard: React.FC = () => {
  const stats = [
    { label: "Total Volumes", value: "12", icon: Folder, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Codices Filed", value: "45", icon: FileText, color: "text-amber-500", bg: "bg-amber-50" },
    { label: "Intellectual Momentum", value: "5 days", icon: Zap, color: "text-purple-500", bg: "bg-purple-50" },
    { label: "Weekly Rigor", value: "18 hrs", icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-50", dark: true },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-12 py-8">
      {/* Welcome Section */}
      <section>
        <h2 className="font-serif text-3xl font-bold mb-2">Curator's Overview</h2>
        <p className="text-text-muted italic">A catalog of your academic pursuits and synthesized knowledge.</p>
      </section>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`p-6 rounded-l border border-[var(--border-color)] ${stat.dark ? 'bg-gray-900 text-white' : 'bg-[var(--surface-primary)]'}`}
          >
            <div className="flex justify-between items-start mb-4">
              <span className={`text-[10px] uppercase tracking-widest ${stat.dark ? 'text-gray-400' : 'text-text-muted'}`}>{stat.label}</span>
              <div className={`p-2 rounded-m ${stat.bg} ${stat.color}`}>
                <stat.icon size={18} />
              </div>
            </div>
            <div className="flex items-baseline">
              <span className="text-3xl font-serif font-bold">{stat.value}</span>
              {stat.dark && <span className="ml-2 text-xs text-gray-400">/ week</span>}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Collections */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-serif text-xl font-bold flex items-center">
            <Library size={20} className="mr-2 text-primary" />
            Salient Collections
          </h3>
          <button className="text-xs uppercase tracking-widest text-text-muted hover:text-primary transition-colors">Review full index</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {["Organic Chemistry", "European History", "UI/UX Principles"].map((topic, i) => (
            <div key={topic} className="card-premium p-6 group cursor-pointer">
              <div className="w-12 h-12 rounded-m bg-gray-100 dark:bg-white/5 flex items-center justify-center mb-6 transition-colors group-hover:bg-primary/10">
                <Folder className="text-text-muted group-hover:text-primary" />
              </div>
              <h4 className="font-serif text-lg font-bold mb-1">{topic}</h4>
              <p className="text-xs text-text-muted">14 Manuscripts • Cataloged 2h ago</p>
              <div className="mt-6 w-full h-px bg-[var(--border-color)] group-hover:bg-primary transition-colors" />
            </div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Thematic Archive (Folders) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-serif text-xl font-bold">Thematic Archive</h3>
            <div className="flex bg-gray-100 rounded-s p-1">
              <button className="p-1 px-2 bg-white rounded shadow-sm"><Zap size={14} /></button>
              <button className="p-1 px-2 text-text-muted"><Tags size={14} /></button>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="border-2 border-dashed border-[var(--border-color)] rounded-m flex flex-col items-center justify-center py-10 text-text-muted hover:border-primary hover:text-primary transition-all cursor-pointer group">
              <Plus size={24} className="mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] uppercase tracking-widest">Found New Subject</span>
            </div>
            {["Mathematics II", "Psychology 101", "Computer Science", "Environmental Sci", "Economics"].map((subj, index) => (
              <div key={index} className="card-premium p-4 flex flex-col justify-between h-40">
                <div className="w-10 h-10 rounded bg-accent-amber/20 flex items-center justify-center">
                  <div className="w-4 h-4 bg-accent-amber rounded-sm" />
                </div>
                <div>
                  <h5 className="font-bold text-sm mb-1">{subj}</h5>
                  <p className="text-[10px] text-text-muted tracking-tight">12 codices cataloged</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Manuscripts (Notes) */}
        <div className="space-y-6">
          <h3 className="font-serif text-xl font-bold">Recent Manuscripts</h3>
          <div className="bg-[var(--surface-primary)] border border-[var(--border-color)] rounded-l p-6 space-y-6">
            {[
              { title: "Cell Membrane Structure", meta: "Biology / Semester 1", time: "2m" },
              { title: "Calculus Midterm Review", meta: "Mathematics II", time: "45m" },
              { title: "Market Equilibrium Notes", meta: "Economics", time: "3h" },
              { title: "Industrial Revolution", meta: "European History", time: "6h" },
            ].map((note) => (
              <div key={note.title} className="flex justify-between group cursor-pointer">
                <div>
                  <h5 className="text-sm font-bold group-hover:text-primary transition-colors">{note.title}</h5>
                  <div className="flex items-center text-[10px] text-text-muted mt-1 uppercase tracking-wider">
                    <Folder size={10} className="mr-1" />
                    {note.meta}
                  </div>
                </div>
                <span className="text-[10px] text-text-muted font-bold">{note.time}</span>
              </div>
            ))}
            <button className="w-full btn-primary py-2 text-[10px] uppercase tracking-[0.2em] mt-4">
              Access Chronicles
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
