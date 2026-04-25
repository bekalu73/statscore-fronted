import { Radio } from "lucide-react";
import type { FilterTab } from "../../types";

interface FilterTabsProps {
  activeTab: FilterTab;
  onTabChange: (tab: FilterTab) => void;
  totalCount: number;
  liveCount: number;
  favoritesCount: number;
}

export default function FilterTabs({
  activeTab,
  onTabChange,
  totalCount,
  liveCount,
  favoritesCount,
}: FilterTabsProps) {
  const tabs: {
    id: FilterTab;
    label: string;
    count: number;
    icon?: React.ReactNode;
  }[] = [
    { id: "all", label: "All", count: totalCount },
    {
      id: "live",
      label: "Live",
      count: liveCount,
      icon: <Radio size={14} />,
    },
    {
      id: "favorites",
      label: "Favorites",
      count: favoritesCount,
      icon: (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex items-center gap-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`
            flex items-center gap-2 px-2.5 py-2 rounded-lg text-sm font-medium transition-all
            ${
              activeTab === tab.id
                ? "bg-secondary text-black"
                : "bg-bg-surface text-text-secondary hover:bg-bg-surface-hover hover:text-text-primary"
            }
          `}
        >
          {tab.icon}
          <span>{tab.label}</span>
          <span
            className={`
              inline-flex items-center justify-center min-w-4.5 h-4.5 rounded-full text-[10px] font-bold p-1.5 
              ${
                activeTab === tab.id
                  ? "bg-bg-primary text-secondary"
                  : "bg-bg-primary/60 text-text-white"
              }
            `}
          >
            {tab.count}
          </span>
        </button>
      ))}
    </div>
  );
}
