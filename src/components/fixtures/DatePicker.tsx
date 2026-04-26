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
} from "../../utils";

interface DatePickerProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

export default function DatePicker({
  selectedDate,
  onDateSelect,
}: DatePickerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const selectedRef = useRef<HTMLButtonElement>(null);
  const dateInputRef = useRef<HTMLInputElement>(null);

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

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      onDateSelect(new Date(e.target.value));
    }
  };

  useEffect(() => {
    if (selectedRef.current && scrollRef.current) {
      const container = scrollRef.current;
      const pill = selectedRef.current;
      const scrollLeft =
        pill.offsetLeft - container.offsetWidth / 2 + pill.offsetWidth / 2;
      container.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  }, [selectedDate]);

  return (
    <div className="relative">
      {/* Hidden Date Input for Popup */}
      <input
        ref={dateInputRef}
        type="date"
        className="absolute opacity-0 pointer-events-none w-0 h-0"
        onChange={handleDateChange}
        value={selectedDate.toISOString().split("T")[0]}
      />

      {/* ── Desktop Mode (> 768px) ── */}
      <div className="hidden md:flex items-center bg-bg-surface rounded-lg p-2 transition-all duration-300 ease-in-out">
        {/* Previous day */}
        <button
          onClick={goToPrev}
          className="shrink-0 p-2.5 rounded-full text-text-white/60 hover:bg-[#24252F]/80 transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Center label + calendar icon toggle */}
        <button
          onClick={() => dateInputRef.current?.showPicker()}
          className="flex items-center justify-center mx-auto gap-2 py-2 px-4 cursor-pointer rounded-lg transition-colors hover:bg-[#24252F]/50"
        >
          <CalendarDaysIcon className="w-5 h-5 text-text-white" />
          <span className="text-base font-semibold text-text-white">
            {dateLabel}
          </span>
        </button>

        {/* Next day */}
        <button
          onClick={goToNext}
          className="shrink-0 p-2.5 rounded-full text-text-white/60 hover:bg-[#24252F]/80 transition-colors cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* ── Mobile Mode (<= 768px) ── */}
      <div className="flex md:hidden items-center bg-bg-surface rounded-lg overflow-hidden p-1.5 transition-all duration-300 ease-in-out">
        <div className="w-14 h-full flex items-center justify-center gap-2 py-2 rounded-l-lg absolute left-0 bg-linear-to-r from-bg-canvas to-bg-canvas/10 pointer-events-none z-10" />

        <div
          ref={scrollRef}
          className="flex items-center gap-1 overflow-x-auto hide-scrollbar flex-1 pr-12 scroll-smooth px-12"
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
                className={`flex flex-col items-center px-4 py-1.5 rounded-lg min-w-18 transition-all text-center cursor-pointer shrink-0 ${
                  isSelected ? "bg-[#24252F] shadow-lg" : "hover:bg-[#24252F]"
                }
                                `}
              >
                <span
                  className={`text-[11px] font-medium leading-tight tracking-wide ${
                    isSelected ? "text-secondary" : "text-text-secondary"
                  }`}
                >
                  {isTodayDate && isSelected ? "Today" : dayName}
                </span>
                <span
                  className={`text-sm font-normal leading-tight mt-0.5 ${
                    isSelected ? "text-secondary" : "text-text-secondary"
                  }`}
                >
                  {isTodayDate && !isSelected ? "Today" : `${dayNum} ${month}`}
                </span>
              </button>
            );
          })}
        </div>

        <div className="w-14 h-full flex items-center justify-center gap-2 py-2 rounded-l-lg absolute right-0 bg-linear-to-l from-bg-canvas to-bg-canvas/10 pointer-events-none z-10">
          {/* Fixed calendar icon on the right */}
          <button
            onClick={() => dateInputRef.current?.showPicker()}
            className="absolute right-2 top-1/2 -translate-y-1/2 shrink-0 w-10 h-10 flex items-center justify-center bg-[#24252F] rounded-full text-secondary hover:bg-[#24252F]/80 transition-colors cursor-pointer pointer-events-auto shadow-md"
          >
            <CalendarDays className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
