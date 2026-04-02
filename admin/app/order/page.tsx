"use client";

import { useEffect, useState, Fragment } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Calendar,
  X,
  Loader2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
import { getOrders, Order } from "@/lib/services/get-order";

type DeliveryState = "Pending" | "Cancelled" | "Delivered";

const STATUS_CLASS: Record<string, string> = {
  // DB values (lowercase)
  pending:
    "border border-red-300 text-red-500 bg-white hover:bg-red-50 cursor-pointer",
  delivered:
    "border border-green-400 text-green-600 bg-white hover:bg-green-50 cursor-pointer",
  canceled:
    "border border-gray-300 text-gray-500 bg-white hover:bg-gray-50 cursor-pointer",
  // UI values (capitalised — used after optimistic updates)
  Pending:
    "border border-red-300 text-red-500 bg-white hover:bg-red-50 cursor-pointer",
  Delivered:
    "border border-green-400 text-green-600 bg-white hover:bg-green-50 cursor-pointer",
  Cancelled:
    "border border-gray-300 text-gray-500 bg-white hover:bg-gray-50 cursor-pointer",
};

// Map UI label → DB enum value
const STATUS_TO_DB: Record<DeliveryState, string> = {
  Pending: "pending",
  Delivered: "delivered",
  Cancelled: "canceled",
};

const DELIVERY_STATES: DeliveryState[] = ["Pending", "Delivered", "Cancelled"];

const PER_PAGE = 10;

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [openStatusMenu, setOpenStatusMenu] = useState<number | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [bulkLoading, setBulkLoading] = useState(false);

  // ── Data fetching ──────────────────────────────────────────────
  useEffect(() => {
    const load = async () => {
      try {
        const data = await getOrders();
        const safeOrders = Array.isArray(data.order) ? data.order : [];
        setOrders(safeOrders);
        setFilteredOrders(safeOrders);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // ── Date filtering ─────────────────────────────────────────────
  useEffect(() => {
    let result = orders;
    if (dateFrom)
      result = result.filter(
        (o) => new Date(o.createdAt) >= new Date(dateFrom),
      );
    if (dateTo) {
      const to = new Date(dateTo);
      to.setHours(23, 59, 59, 999);
      result = result.filter((o) => new Date(o.createdAt) <= to);
    }
    setFilteredOrders(result);
    setPage(1);
  }, [dateFrom, dateTo, orders]);

  // ── Pagination ─────────────────────────────────────────────────
  const totalPages = Math.ceil(filteredOrders.length / PER_PAGE);
  const slice = filteredOrders.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  // ── Selection helpers ──────────────────────────────────────────
  const toggleSelect = (id: number) =>
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const toggleSelectAll = () => {
    const sliceIds = slice.map((o) => o.id);
    const allSelected = sliceIds.every((id) => selectedIds.has(id));
    setSelectedIds((prev) => {
      const next = new Set(prev);
      sliceIds.forEach((id) => (allSelected ? next.delete(id) : next.add(id)));
      return next;
    });
  };

  // ── Status updates ─────────────────────────────────────────────
  const setStatus = async (id: number, uiStatus: DeliveryState) => {
    const dbStatus = STATUS_TO_DB[uiStatus];
    try {
      await fetch(`http://localhost:3001/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: dbStatus }),
      });
      // Optimistic update — store the db value so STATUS_CLASS still matches
      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, status: dbStatus } : o)),
      );
    } catch (err) {
      console.error(err);
    }
    setOpenStatusMenu(null);
  };

  const setBulkStatus = async (uiStatus: DeliveryState) => {
    if (selectedIds.size === 0) return;
    const dbStatus = STATUS_TO_DB[uiStatus];
    setBulkLoading(true);
    try {
      await Promise.all(
        Array.from(selectedIds).map((id) =>
          fetch(`http://localhost:3001/orders/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: dbStatus }),
          }),
        ),
      );
      setOrders((prev) =>
        prev.map((o) =>
          selectedIds.has(o.id) ? { ...o, status: dbStatus } : o,
        ),
      );
      setSelectedIds(new Set());
    } catch (err) {
      console.error(err);
    }
    setBulkLoading(false);
  };

  // ── Date helpers ───────────────────────────────────────────────
  const clearDateFilter = () => {
    setDateFrom("");
    setDateTo("");
  };

  const formatDateRange = () => {
    if (!dateFrom && !dateTo) return "Select date range";
    const fmt = (d: string) =>
      d
        ? new Date(d).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        : "…";
    return `${fmt(dateFrom)} – ${fmt(dateTo)}`;
  };

  // ── Pagination page list ───────────────────────────────────────
  const getPaginationPages = (): (number | "...")[] => {
    const pages: (number | "...")[] = [];
    for (let p = 1; p <= totalPages; p++) {
      if (p === 1 || p === totalPages || Math.abs(p - page) <= 1) {
        pages.push(p);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }
    return pages;
  };

  // ── Loading state ──────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#f4f4f5]">
        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
      </div>
    );
  }

  // ── Render ─────────────────────────────────────────────────────
  return (
    <div className="p-6 min-h-screen bg-[#f4f4f5] font-mono">
      {/* ── Header ── */}
      <div className="flex items-start justify-between mb-5 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
          <p className="text-sm text-gray-400 mt-0.5">
            {filteredOrders.length} items
            {selectedIds.size > 0 && (
              <span className="ml-2 text-gray-500">
                · {selectedIds.size} selected
              </span>
            )}
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Date range picker */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`flex items-center gap-2 text-sm ${
                  dateFrom || dateTo
                    ? "border-gray-400 text-gray-700"
                    : "border-gray-200 text-gray-500"
                }`}
              >
                <Calendar size={14} />
                {formatDateRange()}
                {(dateFrom || dateTo) && (
                  <X
                    size={12}
                    className="ml-1 text-gray-400 hover:text-gray-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      clearDateFilter();
                    }}
                  />
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-64 p-4 flex flex-col gap-3"
              align="end"
            >
              <div className="flex flex-col gap-1">
                <Label className="text-xs text-gray-400">From</Label>
                <Input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="text-sm"
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label className="text-xs text-gray-400">To</Label>
                <Input
                  type="date"
                  value={dateTo}
                  min={dateFrom}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="text-sm"
                />
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-gray-400 justify-start px-0"
                onClick={clearDateFilter}
              >
                Clear filter
              </Button>
            </PopoverContent>
          </Popover>

          {/* Bulk status change */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                disabled={selectedIds.size === 0 || bulkLoading}
                className="text-sm"
              >
                {bulkLoading ? (
                  <>
                    <Loader2 size={14} className="animate-spin mr-1" />
                    Updating…
                  </>
                ) : (
                  "Change delivery state"
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {DELIVERY_STATES.map((s) => (
                <DropdownMenuItem key={s} onClick={() => setBulkStatus(s)}>
                  {s}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* ── Table ── */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-100">
              <TableHead className="w-10 px-4">
                <Checkbox
                  checked={
                    slice.length > 0 &&
                    slice.every((o) => selectedIds.has(o.id))
                  }
                  onCheckedChange={toggleSelectAll}
                />
              </TableHead>
              <TableHead className="text-gray-400 font-normal w-10">
                №
              </TableHead>
              <TableHead className="text-gray-400 font-normal">
                Customer
              </TableHead>
              <TableHead className="text-gray-400 font-normal">Food</TableHead>
              <TableHead className="text-gray-400 font-normal">
                <span className="flex items-center gap-1">
                  Date
                  <span className="flex flex-col leading-none">
                    <ChevronUp size={10} />
                    <ChevronDown size={10} />
                  </span>
                </span>
              </TableHead>
              <TableHead className="text-gray-400 font-normal">Total</TableHead>
              <TableHead className="text-gray-400 font-normal">
                Delivery Address
              </TableHead>
              <TableHead className="text-gray-400 font-normal">
                <span className="flex items-center gap-1">
                  Delivery state
                  <span className="flex flex-col leading-none">
                    <ChevronUp size={10} />
                    <ChevronDown size={10} />
                  </span>
                </span>
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {slice.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-center py-16 text-gray-400 text-sm"
                >
                  No orders found
                </TableCell>
              </TableRow>
            ) : (
              slice.map((order) => (
                <Fragment key={order.id}>
                  <TableRow className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    {/* Checkbox */}
                    <TableCell className="px-4">
                      <Checkbox
                        checked={selectedIds.has(order.id)}
                        onCheckedChange={() => toggleSelect(order.id)}
                      />
                    </TableCell>

                    {/* ID */}
                    <TableCell className="text-gray-400">{order.id}</TableCell>

                    {/* Customer */}
                    <TableCell className="text-gray-700">
                      {order.user?.email ?? `User #${order.userId}`}
                    </TableCell>

                    {/* Food items dropdown */}
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex items-center gap-1.5 text-gray-600 px-0 h-auto"
                          >
                            <span>
                              {order.orderItems?.length ?? 0} food
                              {(order.orderItems?.length ?? 0) !== 1 ? "s" : ""}
                            </span>
                            <ChevronDown size={14} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="start"
                          className="w-[280px] font-mono"
                        >
                          <DropdownMenuLabel className="text-xs text-gray-400 font-normal">
                            Order #{order.id} items
                          </DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          {order.orderItems && order.orderItems.length > 0 ? (
                            order.orderItems.map((item) => (
                              <DropdownMenuItem
                                key={item.id}
                                className="flex items-center gap-3 py-2 cursor-default focus:bg-gray-50"
                              >
                                {item.food?.image ? (
                                  <img
                                    src={item.food.image}
                                    alt={item.food.name}
                                    className="w-8 h-8 rounded object-cover flex-shrink-0"
                                  />
                                ) : (
                                  <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center flex-shrink-0 text-sm">
                                    🍽
                                  </div>
                                )}
                                <span className="text-sm text-gray-700 flex-1 truncate">
                                  {item.food?.name ?? `Food #${item.foodId}`}
                                </span>
                                <span className="text-xs text-gray-400 flex-shrink-0">
                                  ${Number(item.food?.price ?? 0).toFixed(2)}
                                </span>
                                <span className="text-xs text-gray-400 flex-shrink-0">
                                  x{item.quantity}
                                </span>
                              </DropdownMenuItem>
                            ))
                          ) : (
                            <DropdownMenuItem disabled>
                              No items
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>

                    {/* Date */}
                    <TableCell className="text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </TableCell>

                    {/* Total */}
                    <TableCell className="font-medium text-gray-800">
                      ${Number(order.totalPrice).toFixed(2)}
                    </TableCell>

                    {/* Delivery Address */}
                    <TableCell className="text-gray-400 max-w-[200px] truncate text-xs">
                      {order.user?.address ?? "—"}
                    </TableCell>

                    {/* Delivery state */}
                    <TableCell>
                      <DropdownMenu
                        open={openStatusMenu === order.id}
                        onOpenChange={(open) =>
                          setOpenStatusMenu(open ? order.id : null)
                        }
                      >
                        <DropdownMenuTrigger asChild>
                          <button
                            className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
                              STATUS_CLASS[order.status] ??
                              STATUS_CLASS["canceled"]
                            }`}
                          >
                            {order.status}
                            <span className="flex flex-col leading-none">
                              <ChevronUp size={9} />
                              <ChevronDown size={9} />
                            </span>
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="start"
                          className="min-w-[130px] font-mono"
                        >
                          {DELIVERY_STATES.map((s) => (
                            <DropdownMenuItem
                              key={s}
                              className="text-xs"
                              onClick={() => setStatus(order.id, s)}
                            >
                              {s}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                </Fragment>
              ))
            )}
          </TableBody>
        </Table>

        {/* ── Pagination ── */}
        <div className="flex items-center justify-center gap-1 px-4 py-3 border-t border-gray-100">
          <Button
            variant="outline"
            size="icon"
            className="w-8 h-8"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            <ChevronLeft size={14} />
          </Button>

          {getPaginationPages().map((p, i) =>
            p === "..." ? (
              <span
                key={`dots-${i}`}
                className="w-8 h-8 flex items-center justify-center text-gray-400 text-sm"
              >
                ...
              </span>
            ) : (
              <Button
                key={p}
                variant={page === p ? "default" : "outline"}
                size="icon"
                className="w-8 h-8 text-sm"
                onClick={() => setPage(p as number)}
              >
                {p}
              </Button>
            ),
          )}

          <Button
            variant="outline"
            size="icon"
            className="w-8 h-8"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages || totalPages === 0}
          >
            <ChevronRight size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
}
