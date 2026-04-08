import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Library, Sparkles } from "lucide-react";

const emojis = ["📚", "🧪", "🎨", "🧠", "🌍", "🔭", "🎻", "🏛️"];

const Onboarding: React.FC = () => {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("📚");
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleStart = () => {
    // In real app, this would hit /api/auth/register or update profile
    localStorage.setItem("user_name", name);
    localStorage.setItem("user_avatar", avatar);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#fcfcf9] dark:bg-background-dark flex flex-col items-center justify-center p-6 selection:bg-primary/20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-12">
          <div className="w-16 h-16 rounded-2xl bg-gray-900 flex items-center justify-center text-white shadow-xl mb-4 rotate-3">
            <Library size={32} />
          </div>
          <h1 className="font-serif text-4xl font-bold tracking-tight">Study Buddy</h1>
          <p className="text-[10px] uppercase tracking-[0.3em] font-medium text-text-muted mt-2 border-t border-gray-200 pt-2">Registrar's Office</p>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white dark:bg-surface-dark border border-[var(--border-color)] rounded-l p-8 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 text-primary/10">
                <Sparkles size={120} />
              </div>

              <div className="relative z-10">
                <h3 className="font-serif text-xl italic mb-8 text-center">By what name shall you be known?</h3>
                
                <div className="space-y-12">
                  <div className="relative group">
                    <input 
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter full legal name..."
                      className="w-full bg-transparent border-b-2 border-gray-100 focus:border-primary py-3 text-lg font-serif italic outline-none transition-all placeholder:text-gray-200 text-center"
                    />
                  </div>

                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-center text-text-muted mb-6">Select your archival persona</p>
                    <div className="grid grid-cols-4 gap-4">
                      {emojis.map((e) => (
                        <button
                          key={e}
                          onClick={() => setAvatar(e)}
                          className={`h-12 text-2xl flex items-center justify-center rounded-m transition-all ${avatar === e ? 'bg-primary/10 ring-2 ring-primary scale-110 shadow-lg' : 'bg-gray-50 hover:bg-gray-100 grayscale hover:grayscale-0'}`}
                        >
                          {e}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button 
                    disabled={name.length < 2}
                    onClick={handleStart}
                    className="w-full btn-primary bg-gray-900 group flex items-center justify-center py-4 rounded-m text-white font-serif tracking-widest uppercase text-xs"
                  >
                    Begin Matriculation
                    <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <div className="mt-16 flex flex-col items-center opacity-40">
           <h4 className="text-[10px] uppercase tracking-widest font-bold">The Scholarly Archive</h4>
           <p className="text-[10px] mt-2 italic">"Education is not the filling of a pail, but the lighting of a fire." — W.B. Yeats</p>
           <div className="flex space-x-8 mt-8 text-[10px] uppercase tracking-widest font-bold">
              <span>Folio Privacy</span>
              <span>Statutes</span>
              <span>Inquiry Desk</span>
           </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Onboarding;
