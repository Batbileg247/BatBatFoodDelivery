import { Calendar, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DateRange } from "./OrderPageTypes";

interface Props {
  dates: DateRange;
  setDates: (d: DateRange) => void;
}

export function DateFilter({ dates, setDates }: Props) {
  const label =
    dates.from && dates.to
      ? `${dates.from} – ${dates.to}`
      : dates.from
        ? `From ${dates.from}`
        : dates.to
          ? `Until ${dates.to}`
          : "Select range";

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="border-2 border-gray-400">
          <Calendar size={14} className="mr-2" />
          {label}
          {(dates.from || dates.to) && (
            <X
              size={12}
              className="ml-2 hover:text-black"
              onClick={(e) => {
                e.stopPropagation();
                setDates({ from: "", to: "" });
              }}
            />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-64 flex-col gap-2 p-4">
        <Label className="text-xs">From</Label>
        <Input
          type="date"
          value={dates.from}
          onChange={(e) => setDates({ ...dates, from: e.target.value })}
        />
        <Label className="text-xs">To</Label>
        <Input
          type="date"
          value={dates.to}
          onChange={(e) => setDates({ ...dates, to: e.target.value })}
        />
      </PopoverContent>
    </Popover>
  );
}
