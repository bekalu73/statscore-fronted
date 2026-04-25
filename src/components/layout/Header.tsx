import { NAV_LINKS } from "../../lib/constants";
import EnglishFlagIcon from "../icons/english-flag";
import LeadingIcon from "../icons/leading";
import logoImg from "../../assets/logo.png";

interface HeaderProps {
  onMenuToggle: () => void;
}

export default function Header({ onMenuToggle }: HeaderProps) {
  return (
    <header
      className="sticky top-0 z-30 flex items-center h-14 px-1 md:px-2 lg:px-6 bg-primary border-b border-border-primary"
    >
      {/* Mobile menu toggle */}
      <div className="flex items-center">
        <img
          src={logoImg}
          alt="logo"
          className="w-32 lg:w-44 h-9 lg:h-14 object-contain lg:pr-4"
        />
      </div>

      {/* Right section */}
      <div className="ml-auto flex items-center gap-1 md:gap-3">
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`
              px-3 py-1.5 text-base font-medium transition-colors
              ${
                link.isActive
                  ? "text-secondary border-b-2 border-secondary"
                  : "text-text-white hover:text-secondary"
              }
            `}
            >
              {link.label}
            </a>
          ))}
        </nav>
        {/* Globe icons */}
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-bg-card/10 flex items-center justify-center text-text-secondary hover:bg-bg-card-hover/20 cursor-pointer">
            <span className="text-xl md:text-2xl">🌍</span>
          </button>

          <button className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-bg-card/10 flex items-center justify-center text-text-secondary hover:bg-bg-card-hover/20 cursor-pointer">
            <span className="text-xl md:text-2xl">⚽</span>
          </button>
        </div>

        {/* Mobile size leagure dropdown */}
        <div className="lg:hidden w-8 h-8 md:w-10 md:h-10 rounded-full bg-bg-card/10 flex items-center justify-center text-text-secondary hover:bg-bg-card-hover/20 cursor-pointer">
          <LeadingIcon />
        </div>

        {/* League dropdown */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-bg-card/10 rounded-full  cursor-pointer hover:bg-bg-card-hover/20">
          <LeadingIcon />
          <span className="text-base text-text-primary font-medium font-poppins hidden md:block">
            Premier League
          </span>
          <svg
            className="w-3 h-3 text-text-white hidden md:block"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>

        {/* Season dropdown */}
        <div className="flex items-center gap-3 px-3 py-1.5 bg-bg-card/10 rounded-full  cursor-pointer hover:bg-bg-card-hover/20">
          <span className="text-sm text-text-primary font-normal">2024/25</span>
          <svg
            className="w-3 h-3 text-text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>

        {/* Country flag */}
        <button className="hidden md:flex w-10 h-10 rounded-full bg-bg-card/10 flex items-center justify-center text-text-secondary hover:bg-bg-card-hover/20 cursor-pointer">
          <EnglishFlagIcon />
        </button>

        <button
          onClick={onMenuToggle}
          className="mr-3 text-text-white hover:text-text-secondary lg:hidden"
          id="menu-toggle"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M3 12h18M3 6h18M3 18h18" />
          </svg>
        </button>
      </div>
    </header>
  );
}
