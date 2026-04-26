import { useState } from "react";
import { NAV_LINKS } from "../../lib/constants";
import EnglishFlagIcon from "../icons/english-flag";
import LeadingIcon from "../icons/leading";
import logoImg from "../../assets/logo.png";
import { Menu } from "lucide-react";
import Dropdown from "../ui/Dropdown";

interface HeaderProps {
  onMenuToggle: () => void;
}

const LEAGUES = [
  { id: "pl", label: "Premier League", icon: <LeadingIcon /> },
  { id: "ll", label: "La Liga" },
  { id: "sa", label: "Serie A" },
  { id: "bl", label: "Bundesliga" },
  { id: "l1", label: "Ligue 1" },
];

const SEASONS = [
  { id: "24-25", label: "2024/25" },
  { id: "23-24", label: "2023/24" },
  { id: "22-23", label: "2022/23" },
];

export default function Header({ onMenuToggle }: HeaderProps) {
  const [selectedLeague, setSelectedLeague] = useState("pl");
  const [selectedSeason, setSelectedSeason] = useState("24-25");

  return (
    <header className="sticky top-0 z-30 flex items-center h-14 px-1 md:px-2 lg:px-6 bg-primary border-b border-border-primary">
      <div className="flex items-center">
        <img
          src={logoImg}
          alt="logo"
          className="w-50 lg:w-44 h-50 lg:h-14 object-contain lg:pr-4"
        />
      </div>

      <div className="ml-auto flex items-center gap-1 md:gap-3">
        <nav className="hidden lg:flex items-center gap-1 mr-2">
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

        <div className="flex items-center gap-2">
          <button className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-bg-card/10 flex items-center justify-center text-text-secondary hover:bg-bg-card-hover/20 cursor-pointer transition-all active:scale-95">
            <span className="text-xl md:text-2xl">🌍</span>
          </button>

          <button className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-bg-card/10 flex items-center justify-center text-text-secondary hover:bg-bg-card-hover/20 cursor-pointer transition-all active:scale-95">
            <span className="text-xl md:text-2xl">⚽</span>
          </button>
        </div>

        {/* League Dropdown (Mobile variant) */}
        <Dropdown
          options={LEAGUES}
          selectedId={selectedLeague}
          onSelect={setSelectedLeague}
          variant="circle"
          className="lg:hidden"
          renderLeading={() => <LeadingIcon />}
        />

        {/* League Dropdown (Desktop) */}
        <Dropdown
          options={LEAGUES}
          selectedId={selectedLeague}
          onSelect={setSelectedLeague}
          className="hidden lg:block"
          renderLeading={(selected) => selected?.icon || <LeadingIcon />}
        />

        {/* Season Dropdown */}
        <Dropdown
          options={SEASONS}
          selectedId={selectedSeason}
          onSelect={setSelectedSeason}
        />

        <button className="hidden md:flex w-10 h-10 rounded-full bg-bg-card/10 items-center justify-center text-text-secondary hover:bg-bg-card-hover/20 cursor-pointer transition-all active:scale-95">
          <EnglishFlagIcon />
        </button>

        <button
          onClick={onMenuToggle}
          className="mr-3 text-text-white hover:text-text-secondary lg:hidden p-2"
          id="menu-toggle"
        >
          <Menu />
        </button>
      </div>
    </header>
  );
}
