import { Link, useLocation } from "react-router-dom";

interface NavItem {
  path: string;
  label: string;
  exact?: boolean;
}

interface NavigationLinkProps {
  items: NavItem[];
  setIsMenuOpen?: (open: boolean) => void;
  isMobile?: boolean;
}

function NavigationLink({
  items,
  setIsMenuOpen,
  isMobile,
}: NavigationLinkProps) {
  const location = useLocation();

  const isActive = (path: string, exact: boolean = true) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  if (isMobile) {
    return (
      <>
        {items.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              onClick={() => setIsMenuOpen?.(false)}
              className={`
        group block py-3 px-4 rounded-lg transition-all duration-300 text-right
        ${
          isActive(item.path)
            ? "text-orange-600 bg-orange-100 dark:bg-orange-900/30 dark:text-orange-300 font-semibold shadow-sm"
            : "text-gray-700 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:text-orange-600 dark:hover:text-orange-300 hover:shadow-md hover:scale-105"
        }
      `}
            >
              <span className="relative">{item.label}</span>
            </Link>
          </li>
        ))}
      </>
    );
  }

  return (
    <nav className="flex gap-4 text-md text-white">
      {items.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          onClick={() => setIsMenuOpen?.(false)}
          className={`
    block transition-all duration-300 rounded-lg
    max-[889px]:py-2 max-[889px]:px-3
        min-[890px]:px-3 min-[890px]:py-1.5
    relative group
    ${
      isActive(item.path)
        ? `
          text-orange-900 
          max-[889px]:bg-orange-500/30 
          dark:text-orange-200
          min-[890px]:bg-transparent 
          font-semibold
          hover:scale-110 hover:shadow-md
        `
        : `
          text-white 
          hover:bg-white/10 
          max-[889px]:hover:bg-white/10 
          min-[890px]:hover:bg-transparent 
          min-[890px]:hover:text-orange-200
          hover:scale-110 hover:shadow-md
        `
    }
  `}
        >
          {item.label}

          {/* Glow Hover Pulse Effect (Desktop only) */}
          {!isActive(item.path) && (
            <span className="absolute inset-0 bg-white/5 rounded-lg transform scale-0 group-hover:scale-100 group-hover:animate-pulse transition-transform duration-300 pointer-events-none"></span>
          )}
        </Link>
      ))}
    </nav>
  );
}

export default NavigationLink;
