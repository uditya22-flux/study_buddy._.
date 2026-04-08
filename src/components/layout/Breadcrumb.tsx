import React from "react";
import { ChevronRight, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumb: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav className="flex items-center space-x-2 text-[10px] uppercase tracking-widest text-text-muted-light dark:text-text-muted-dark font-medium">
      <Link to="/" className="hover:text-primary transition-colors flex items-center">
        <Home size={12} className="mr-1" />
        Archive
      </Link>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;

        return (
          <React.Fragment key={to}>
            <ChevronRight size={10} className="shrink-0" />
            <Link
              to={to}
              className={isLast ? "text-text-primary-light dark:text-text-primary-dark pointer-events-none" : "hover:text-primary transition-colors"}
            >
              {value}
            </Link>
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
