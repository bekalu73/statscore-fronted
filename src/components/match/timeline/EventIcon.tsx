import {
  ArrowDownIcon,
  ArrowUpIcon,
  FlagTriangleRight,
  Stethoscope,
  TvMinimalPlay,
} from "lucide-react";
import SoccerBallIcon from "../../icons/soccer-ball";
import type { TimelineEvent } from "../../../types";

export default function EventIcon({ type }: { type: TimelineEvent["type"] }) {
  switch (type) {
    case "goal":
      return (
        <div className="flex items-center justify-center rounded-full px-1">
          <SoccerBallIcon fill="#00FFA5" className="size-4" />
        </div>
      );
    case "yellow_card":
      return <div className="w-[14px] h-[14px] bg-[#E7D93F]" />;
    case "red_card":
      return <div className="w-[14px] h-[14px] bg-[#EE5E52]" />;
    case "substitution":
      return (
        <div className="flex items-center -space-x-1">
          <ArrowUpIcon className="w-3 h-6 text-[#00FF85] mb-1" />
          <ArrowDownIcon className="w-3 h-6 text-red-accent mt-1" />
        </div>
      );
    case "corner":
      return <FlagTriangleRight className="w-3 h-3 text-text-white" />;
    case "injury":
      return <Stethoscope className="w-4 h-4 text-text-white/80" />;
    case "var":
      return <TvMinimalPlay className="w-4 h-4 text-text-white" />;
    default:
      return null;
  }
}
