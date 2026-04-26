import { useState } from 'react';

const TABS = ['Details', 'Odds', 'Lineups', 'Events', 'Stats', 'Standings'] as const;

type MatchTab = typeof TABS[number];

interface MatchTabsProps {
    activeTab?: MatchTab;
    onTabChange?: (tab: MatchTab) => void;
}

export default function MatchTabs({ activeTab: controlledTab, onTabChange }: MatchTabsProps) {
    const [internalTab, setInternalTab] = useState<MatchTab>('Events');
    const activeTab = controlledTab ?? internalTab;

    const handleTabClick = (tab: MatchTab) => {
        setInternalTab(tab);
        onTabChange?.(tab);
    };

    return (
        <div className="flex items-center gap-0 border-b border-border-primary overflow-x-auto hide-scrollbar">
            {TABS.map((tab) => (
                <button
                    key={tab}
                    onClick={() => handleTabClick(tab)}
                    className={`relative px-4 py-3 text-base  whitespace-nowrap transition-colors ${activeTab === tab
                            ? 'text-text-white font-semibold'
                            : 'text-text-white/60 hover:text-text-white font-medium'} `}
                >
                    {tab}
                    {activeTab === tab && (
                        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-secondary" />
                    )}
                </button>
            ))}
        </div>
    );
}
