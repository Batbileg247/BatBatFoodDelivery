import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Status } from "@/lib/services/put-order-status";
import { STATUSES } from "./Contains";

interface Props {
  selected: Set<number>;
  bulkLoading: boolean;
  onUpdateStatus: (ids: number[], status: Status) => void;
}

export function BulkActionButton({
  selected,
  bulkLoading,
  onUpdateStatus,
}: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="border-2 border-gray-400"
          disabled={!selected.size || bulkLoading}
        >
          {bulkLoading ? (
            <Loader2 size={14} className="mr-2 animate-spin" />
          ) : (
            "Change state"
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {STATUSES.map((s) => (
          <DropdownMenuItem
            key={s}
            onClick={() => onUpdateStatus(Array.from(selected), s)}
          >
            {s}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
