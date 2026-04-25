import {
  CalendarDays,
  CalendarDaysIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  formatDatePicker,
  generateDateRange,
  isSameDay,
  isToday,
} from "../../lib/utils";

interface DatePickerProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

export default function DatePicker({
  selectedDate,
  onDateSelect,
}: DatePickerProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const selectedRef = useRef<HTMLButtonElement>(null);

  const dates = useMemo(() => generateDateRange(new Date(), 14), []);

  const dateLabel = useMemo(() => {
    if (isToday(selectedDate)) return "Today";
    const { dayName, dayNum, month } = formatDatePicker(selectedDate);
    return `${dayName}  ${dayNum} ${month}`;
  }, [selectedDate]);

  const goToPrev = useCallback(() => {
    onDateSelect(new Date(selectedDate.getTime() - 24 * 60 * 60 * 1000));
  }, [selectedDate, onDateSelect]);

  const goToNext = useCallback(() => {
    onDateSelect(new Date(selectedDate.getTime() + 24 * 60 * 60 * 1000));
  }, [selectedDate, onDateSelect]);

  useEffect(() => {
    if (isExpanded && selectedRef.current && scrollRef.current) {
      const container = scrollRef.current;
      const pill = selectedRef.current;
      const scrollLeft =
        pill.offsetLeft - container.offsetWidth / 2 + pill.offsetWidth / 2;
      container.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  }, [isExpanded, selectedDate]);

  return (
    <div className="relative">
      <div
        className={`
                    flex items-center bg-bg-surface rounded-lg p-2 transition-all duration-300 ease-in-out
                    ${isExpanded ? "opacity-0 scale-95 pointer-events-none absolute inset-0" : "opacity-100 scale-100"}
                `}
      >
        {/* Previous day */}
        <button
          onClick={goToPrev}
          className="flex-shrink-0 p-2.5 rounded-full text-text-white/60 hover:bg-[#24252F]/80 transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Center label + calendar icon toggle */}
        <button
          onClick={() => setIsExpanded(true)}
          className="flex items-center justify-center mx-auto gap-2 py-2 cursor-pointer rounded-lg transition-colors"
        >
          <CalendarDaysIcon className="w-5 h-5 text-text-white" />
          <span className="text-base font-semibold text-text-white">
            {dateLabel}
          </span>
        </button>

        {/* Next day */}
        <button
          onClick={goToNext}
          className="flex-shrink-0 p-2.5 rounded-full text-text-white/60 hover:bg-[#24252F]/80 transition-colors cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* ── Expanded Mode ── */}
      <div
        className={`
                    flex items-center bg-bg-surface rounded-lg overflow-hidden p-1.5 transition-all duration-300 ease-in-out
                    ${isExpanded ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none absolute inset-0"}
                `}
      >
        <div className="w-14 md:w-24 h-full flex items-center justify-center gap-2 py-2 rounded-l-lg absolute left-0 bg-gradient-to-r from-bg-canvas to-bg-canvas/10" />

        <div
          ref={scrollRef}
          className="flex items-center gap-1 overflow-x-auto hide-scrollbar flex-1 pr-12 scroll-smooth px-16"
        >
          {dates.map((date) => {
            const { dayName, dayNum, month } = formatDatePicker(date);
            const isSelected = isSameDay(date, selectedDate);
            const isTodayDate = isToday(date);

            return (
              <button
                key={date.toISOString()}
                ref={isSelected ? selectedRef : undefined}
                onClick={() => onDateSelect(date)}
                className={`
                                    flex flex-col items-center px-4 py-1.5 rounded-lg min-w-[72px] transition-all text-center cursor-pointer flex-shrink-0
                                    ${
                                      isSelected
                                        ? "bg-[#24252F] shadow-lg"
                                        : "hover:bg-[#24252F]"
                                    }
                                `}
              >
                <span
                  className={`text-[11px] font-medium leading-tight tracking-wide ${
                    isSelected
                      ? "text-secondary"
                      : isSelected
                        ? "text-text-primary"
                        : "text-text-secondary"
                  }`}
                >
                  {isTodayDate && isSelected ? "Today" : dayName}
                </span>
                <span
                  className={`text-sm font-normal leading-tight mt-0.5 ${
                    isSelected
                      ? "text-secondary"
                      : isSelected
                        ? "text-text-primary"
                        : "text-text-secondary"
                  }`}
                >
                  {isTodayDate && !isSelected ? "Today" : `${dayNum} ${month}`}
                </span>
              </button>
            );
          })}
        </div>

        <div className="w-14 md:w-24 h-full flex items-center justify-center gap-2 py-2 rounded-l-lg absolute right-0 bg-gradient-to-l from-bg-canvas to-bg-canvas/10">
          {/* Fixed calendar icon on the right */}
          <button
            onClick={() => setIsExpanded(false)}
            className="absolute right-2 top-1/2 -translate-y-1/2 flex-shrink-0 w-10 h-10 flex items-center justify-center bg-[#24252F] rounded-full text-secondary hover:bg-[#24252F]/80 transition-colors cursor-pointer z-10"
          >
            <CalendarDays className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
