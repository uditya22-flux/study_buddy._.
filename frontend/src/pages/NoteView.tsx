import React from "react";
import { useParams } from "react-router-dom";
import { Clock, Hash, Share2, MoreVertical } from "lucide-react";

const NoteView: React.FC = () => {
  const { noteId } = useParams();
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between py-4 border-b border-[var(--border-color)]">
        <div className="flex items-center space-x-4">
           <div className="flex flex-col">
              <h2 className="text-2xl font-serif font-bold tracking-tight">Newton's Laws of Motion</h2>
              <div className="flex items-center space-x-3 mt-1">
                 <span className="text-[10px] uppercase tracking-widest text-primary font-bold">Classified: Physics / Mechanics</span>
                 <span className="text-gray-300">|</span>
                 <div className="flex items-center text-[10px] text-text-muted">
                    <Clock size={10} className="mr-1" />
                    Archived 2m ago
                 </div>
              </div>
           </div>
        </div>

        <div className="flex items-center space-x-2">
           <button className="p-2 text-text-muted hover:text-text-primary-light transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-white/5">
              <Share2 size={18} />
           </button>
           <button className="p-2 text-text-muted hover:text-text-primary-light transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-white/5">
              <MoreVertical size={18} />
           </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto max-w-4xl mx-auto w-full">
         <div className="py-12 px-4 italic text-text-muted border-l-2 border-primary/20 bg-primary/5 rounded-r-m mb-8">
            Sir Isaac Newton's three laws of motion form the bedrock of classical mechanics. These principles describe the relationship between a body and the forces acting upon it, and its motion in response to those forces.
         </div>

         {/* Editor Placeholder */}
         <div className="prose dark:prose-invert max-w-none">
            <h1 className="font-serif">I. The Law of Inertia</h1>
            <p className="leading-relaxed">An object at rest remains at rest, and an object in motion remains in motion at constant speed and in a straight line unless acted on by an unbalanced force. This tendency of objects to resist changes in their state of motion is called <span className="bg-amber-100 dark:bg-amber-900/30 px-1 rounded">inertia</span>.</p>
            
            <div className="my-10 p-10 bg-gray-50 dark:bg-white/5 rounded-l text-center border border-[var(--border-color)]">
               <span className="text-[10px] uppercase tracking-widest text-text-muted mb-4 block">Mathematical Formulation</span>
               <div className="text-2xl font-serif">ΣF = 0 ⇔ dv/dt = 0</div>
            </div>

            <h1 className="font-serif">II. The Law of Acceleration</h1>
            <p className="leading-relaxed">The acceleration of an object depends on the mass of the object and the amount of force applied. In simpler terms, force equals mass times acceleration.</p>
         </div>
      </div>

      <div className="flex items-center justify-between py-4 border-t border-[var(--border-color)] text-[10px] uppercase tracking-widest text-text-muted">
         <div className="flex items-center space-x-6">
            <span className="flex items-center font-bold">
               <Hash size={12} className="mr-1" />
               1,240 words
            </span>
            <span className="text-emerald-500 font-bold italic">Authenticated Archive Entry</span>
         </div>
         <div className="flex items-center space-x-4">
            <span>Last Synced with Cloud 14:42:01</span>
         </div>
      </div>
    </div>
  );
};

export default NoteView;
