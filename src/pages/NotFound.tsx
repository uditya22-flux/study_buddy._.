import React from "react";
import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col items-center justify-center p-6 text-center">
      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-8 animate-bounce">
        <BookOpen size={40} />
      </div>
      <h1 className="font-serif text-6xl font-bold mb-4">404</h1>
      <h2 className="text-xl font-medium mb-8 text-text-muted italic">"The manuscript you seek has been lost to time."</h2>
      <Link to="/" className="btn-primary py-3 px-8 uppercase text-xs tracking-[0.2em]">
        Return to the Archive
      </Link>
    </div>
  );
};

export default NotFound;
