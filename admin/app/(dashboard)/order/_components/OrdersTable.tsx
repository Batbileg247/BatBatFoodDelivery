import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Status } from "@/lib/services/put-order-status";
import { Order } from "./OrderPageTypes";
import { TABLE_HEADERS } from "./Contains";
import { OrderRow } from "./OrderRow";

interface Props {
  slice: Order[];
  selected: Set<number>;
  allOnPageSelected: boolean;
  page: number;
  totalPages: number;
  onToggleAll: () => void;
  onToggleSelect: (id: number) => void;
  onUpdateStatus: (ids: number[], status: Status) => void;
  onPageChange: (page: number) => void;
}

export function OrdersTable({
  slice,
  selected,
  allOnPageSelected,
  page,
  totalPages,
  onToggleAll,
  onToggleSelect,
  onUpdateStatus,
  onPageChange,
}: Props) {
  return (
    <div className="overflow-hidden rounded-xl border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10 px-4">
              <Checkbox
                checked={allOnPageSelected}
                onCheckedChange={onToggleAll}
              />
            </TableHead>
            {TABLE_HEADERS.map((h) => (
              <TableHead key={h} className="font-normal text-gray-400">
                {h}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {slice.length === 0 ? (
            <TableRow>
              <td
                colSpan={TABLE_HEADERS.length + 1}
                className="py-10 text-center text-sm text-gray-400"
              >
                No orders found
              </td>
            </TableRow>
          ) : (
            slice.map((o) => (
              <OrderRow
                key={o.id}
                order={o}
                isSelected={selected.has(o.id)}
                onToggle={onToggleSelect}
                onUpdateStatus={onUpdateStatus}
              />
            ))
          )}
        </TableBody>
      </Table>

      {totalPages > 1 && (
        <div className="flex justify-center gap-1 border-t p-3">
          <Button
            variant="outline"
            size="icon"
            disabled={page === 1}
            onClick={() => onPageChange(page - 1)}
          >
            <ChevronLeft size={14} />
          </Button>

          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i}
              variant={page === i + 1 ? "default" : "outline"}
              onClick={() => onPageChange(i + 1)}
            >
              {i + 1}
            </Button>
          ))}

          <Button
            variant="outline"
            size="icon"
            disabled={page === totalPages}
            onClick={() => onPageChange(page + 1)}
          >
            <ChevronRight size={14} />
          </Button>
        </div>
      )}
    </div>
  );
}
