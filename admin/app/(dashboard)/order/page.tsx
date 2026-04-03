"use client";

import { useEffect, useState, useMemo } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Calendar,
  X,
  Loader2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { getOrders } from "@/lib/services/get-order";
import { putOrderStatus, Status } from "@/lib/services/put-order-status";

const STATUSES: Status[] = ["Pending", "Delivered", "Cancelled"];
const PER_PAGE = 10;

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [dates, setDates] = useState({ from: "", to: "" });
  const [bulkLoading, setBulkLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const raw = await getOrders();
      setOrders(Array.isArray(raw.order) ? raw.order : []);
      setLoading(false);
    })();
  }, []);

  const filtered = useMemo(
    () =>
      orders.filter((o) => {
        const d = new Date(o.createdAt);
        return (
          (!dates.from || d >= new Date(dates.from)) &&
          (!dates.to || d <= new Date(new Date(dates.to).setHours(23, 59, 59)))
        );
      }),
    [orders, dates],
  );

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const slice = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const updateStatus = async (ids: number[], status: Status) => {
    setBulkLoading(true);
    await Promise.all(ids.map((id) => putOrderStatus({ id, status })));
    setOrders((prev) =>
      prev.map((o) => (ids.includes(o.id) ? { ...o, status } : o)),
    );
    setSelected(new Set());
    setBulkLoading(false);
  };

  const toggleSelect = (id: number) =>
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const toggleAll = (checked: boolean) =>
    setSelected((prev) => {
      const next = new Set(prev);
      slice.forEach((o) => (checked ? next.add(o.id) : next.delete(o.id)));
      return next;
    });

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="animate-spin text-gray-400" />
      </div>
    );

  return (
    <div className="min-h-screen bg-[#f4f4f5] p-6">
      <div className="mb-5 flex justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Orders</h1>
          <p className="text-sm text-gray-400">
            {filtered.length} items
            {selected.size > 0 && ` · ${selected.size} selected`}
          </p>
        </div>

        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={
                  dates.from || dates.to ? "text-gray-700" : "text-gray-400"
                }
              >
                <Calendar size={14} className="mr-2" />
                {dates.from || dates.to
                  ? `${dates.from} – ${dates.to}`
                  : "Select range"}
                {(dates.from || dates.to) && (
                  <X
                    size={12}
                    className="ml-2"
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
                onChange={(e) =>
                  setDates((d) => ({ ...d, from: e.target.value }))
                }
              />
              <Label className="text-xs">To</Label>
              <Input
                type="date"
                value={dates.to}
                onChange={(e) =>
                  setDates((d) => ({ ...d, to: e.target.value }))
                }
              />
            </PopoverContent>
          </Popover>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
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
                  onClick={() => updateStatus(Array.from(selected), s)}
                >
                  {s}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10 px-4">
                <Checkbox
                  checked={
                    slice.length > 0 && slice.every((o) => selected.has(o.id))
                  }
                  onCheckedChange={toggleAll}
                />
              </TableHead>
              {["#", "Customer", "Items", "Date", "Total", "Address", "Status"].map((h) => (
                <TableHead key={h} className="font-normal text-gray-400">
                  {h}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {slice.map((o) => (
              <TableRow key={o.id}>
                <TableCell className="px-4">
                  <Checkbox
                    checked={selected.has(o.id)}
                    onCheckedChange={() => toggleSelect(o.id)}
                  />
                </TableCell>
                <TableCell className="text-gray-400">{o.id}</TableCell>
                <TableCell>{o.user?.email ?? `User #${o.userId}`}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-1 text-sm">
                      {o.orderItems?.length ?? 0} items{" "}
                      <ChevronDown size={12} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      {o.orderItems?.map((i: any) => (
                        <DropdownMenuItem
                          key={i.id}
                          className="flex justify-between"
                        >
                          <span>{i.food?.name}</span>
                          <span className="text-gray-400">×{i.quantity}</span>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
                <TableCell>
                  {new Date(o.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>${Number(o.totalPrice).toFixed(2)}</TableCell>
                <TableCell className="max-w-[150px] truncate text-gray-400">
                  {o.user?.address ?? "—"}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="text-sm text-gray-500">
                      {o.status}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {STATUSES.map((s) => (
                        <DropdownMenuItem
                          key={s}
                          onClick={() => updateStatus([o.id], s)}
                        >
                          {s}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex justify-center gap-1 border-t p-3">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            <ChevronLeft size={14} />
          </Button>
          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i}
              variant={page === i + 1 ? "default" : "outline"}
              className="h-8 w-8"
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            <ChevronRight size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
}