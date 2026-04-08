import React from "react";
import { useParams } from "react-router-dom";

const FolderView: React.FC = () => {
  const { folderId } = useParams();
  return (
    <div className="py-8">
      <h2 className="font-serif text-3xl font-bold mb-4">Collection Folio</h2>
      <p className="text-text-muted italic mb-8">Examining entries for collection ID: {folderId}</p>
      
      {/* Grid view of subfolders and notes will go here */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="border border-dashed border-[var(--border-color)] rounded-l aspect-video flex items-center justify-center text-text-muted uppercase text-[10px] tracking-widest">
            Pending Cataloging
        </div>
      </div>
    </div>
  );
};

export default FolderView;
