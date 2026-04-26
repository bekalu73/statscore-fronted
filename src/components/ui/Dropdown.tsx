import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface Option {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface DropdownProps {
  options: Option[];
  selectedId: string;
  onSelect: (id: string) => void;
  className?: string;
  renderLeading?: (selected: Option | undefined) => React.ReactNode;
  variant?: "pill" | "circle";
}

export default function Dropdown({
  options,
  selectedId,
  onSelect,
  className = "",
  renderLeading,
  variant = "pill",
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedOption = options.find((opt) => opt.id === selectedId);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (variant === "circle") {
    return (
      <div className={`relative ${className}`} ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-bg-card/10 flex items-center justify-center text-text-secondary hover:bg-bg-card-hover/20 cursor-pointer transition-all active:scale-95"
        >
          {renderLeading ? renderLeading(selectedOption) : selectedOption?.icon}
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-bg-surface border border-border-primary rounded-xl shadow-2xl py-1 z-50 animate-in fade-in zoom-in duration-200">
            {options.map((option) => (
              <button
                key={option.id}
                onClick={() => {
                  onSelect(option.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-bg-card/10 ${
                  option.id === selectedId
                    ? "text-secondary font-medium"
                    : "text-text-primary"
                }`}
              >
                {option.icon}
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 bg-bg-card/10 rounded-full cursor-pointer hover:bg-bg-card-hover/20 transition-all active:scale-95"
      >
        {renderLeading && renderLeading(selectedOption)}
        <span className="text-sm md:text-base text-text-primary font-medium font-poppins truncate max-w-[120px]">
          {selectedOption?.label}
        </span>
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-bg-surface border border-border-primary rounded-xl shadow-2xl py-1 z-50 animate-in fade-in zoom-in duration-200">
          <div className="max-h-[300px] overflow-y-auto hide-scrollbar">
            {options.map((option) => (
              <button
                key={option.id}
                onClick={() => {
                  onSelect(option.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-bg-card/10 ${
                  option.id === selectedId
                    ? "text-secondary font-medium"
                    : "text-text-primary"
                }`}
              >
                {option.icon}
                <span className="truncate">{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
