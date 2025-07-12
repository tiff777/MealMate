import { Link, useLocation } from "react-router-dom";

interface NavItem {
  path: string;
  label: string;
  exact?: boolean;
}

interface NavigationLinkProps {
  items: NavItem[];
}

function NavigationLink({ items }: NavigationLinkProps) {
  const location = useLocation();

  const isActive = (path: string, exact: boolean = true) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="flex gap-4 text-sm text-white">
      {items.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`
            relative px-3 py-2 rounded-lg transition-all duration-300 group
            ${
              isActive(item.path)
                ? "bg-white/20 text-white font-medium "
                : "hover:text-white hover:scale-110 hover:shadow-md"
            }
          `}
        >
          {item.label}

          {!isActive(item.path) && (
            <span className="absolute inset-0 bg-white/5 rounded-lg transform scale-0 group-hover:scale-100 group-hover:animate-pulse transition-transform duration-300"></span>
          )}
        </Link>
      ))}
    </nav>
  );
}

export default NavigationLink;
