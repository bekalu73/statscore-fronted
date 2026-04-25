import { NAV_LINKS } from "../../lib/constants";
import logoImg from "../../assets/logo.png";
import { X } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 right-0 z-50 h-full w-55 bg-bg-sidebar border-r border-border-primary 
          flex flex-col transition-transform duration-300 ease-in-out lg:hidden
          lg:translate-x-0 lg:static lg:z-auto
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 px-2 py-2 border-b border-border-primary">
          <div className="flex items-center">
            <img src={logoImg} alt="logo" className="w-32 h-10" />
          </div>
          <button
            onClick={onClose}
            className="ml-auto text-text-secondary hover:text-text-primary lg:hidden"
          >
            <X />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 overflow-y-auto">
          <ul className="space-y-0.5">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className={`
                    flex items-center gap-3 px-5 py-2.5 text-sm font-medium transition-colors
                    ${
                      link.isActive
                        ? "text-secondary bg-secondary/10 border-l-2 border-secondary"
                        : "text-text-secondary hover:text-text-primary hover:bg-bg-card-hover"
                    }
                  `}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
