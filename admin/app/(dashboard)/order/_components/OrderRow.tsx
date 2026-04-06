import { ChevronDown, ChevronsUpDown } from "lucide-react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Status } from "@/lib/services/put-order-status";
import { Order } from "./OrderPageTypes";
import { STATUS_STYLES, STATUSES } from "./Contains";

interface Props {
  order: Order;
  isSelected: boolean;
  onToggle: (id: number) => void;
  onUpdateStatus: (ids: number[], status: Status) => void;
}

export function OrderRow({
  order: o,
  isSelected,
  onToggle,
  onUpdateStatus,
}: Props) {
  return (
    <TableRow>
      <TableCell className="px-4">
        <Checkbox checked={isSelected} onCheckedChange={() => onToggle(o.id)} />
      </TableCell>

      <TableCell className="text-gray-400">{o.id}</TableCell>
      <TableCell>{o.user?.email ?? `User #${o.userId}`}</TableCell>

      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1 text-sm">
            {o.orderItems?.length ?? 0} items <ChevronDown size={12} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            {o.orderItems?.map((i) => (
              <DropdownMenuItem key={i.id} className="flex justify-between">
                <span>{i.food?.name}</span>
                <span className="text-gray-400">×{i.quantity}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>

      <TableCell>{new Date(o.createdAt).toLocaleDateString()}</TableCell>
      <TableCell>₮{Number(o.totalPrice).toFixed(2)}</TableCell>

      <TableCell className="max-w-40 truncate text-gray-400">
        {o.user?.address ?? "—"}
      </TableCell>

      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger className="text-sm">
            <div
              className={`border flex gap-2 rounded-full h-8 w-28 items-center justify-center cursor-pointer ${
                STATUS_STYLES[o.status] || ""
              }`}
            >
              {o.status}
              <ChevronsUpDown size={16} />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {STATUSES.map((s) => (
              <DropdownMenuItem
                key={s}
                onClick={() => onUpdateStatus([o.id], s)}
              >
                {s}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
