"use client";

import { useEffect, useState, useMemo } from "react";
import { getOrders } from "@/lib/services/get-order";
import { putOrderStatus, Status } from "@/lib/services/put-order-status";
import { Order, DateRange } from "./OrderPageTypes";
import { PER_PAGE } from "./Contains";

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [dates, setDates] = useState<DateRange>({ from: "", to: "" });
  const [bulkLoading, setBulkLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const raw = await getOrders();
        setOrders(
          Array.isArray(raw.order)
            ? raw.order.map((o: any) => ({ ...o, status: o.status as Status }))
            : [],
        );
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    setPage(1);
    setSelected(new Set());
  }, [dates]);

  useEffect(() => {
    setSelected(new Set());
  }, [page]);

  const filtered = useMemo(() => {
    if (!dates.from && !dates.to) return orders;
    return orders.filter((o) => {
      const d = new Date(o.createdAt).getTime();
      const from = dates.from
        ? new Date(dates.from + "T00:00:00").getTime()
        : -Infinity;
      const to = dates.to
        ? new Date(dates.to + "T23:59:59").getTime()
        : Infinity;
      return d >= from && d <= to;
    });
  }, [orders, dates]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const slice = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const updateStatus = async (ids: number[], status: Status) => {
    setBulkLoading(true);
    try {
      await Promise.all(ids.map((id) => putOrderStatus({ id, status })));
      const idSet = new Set(ids);
      setOrders((prev) =>
        prev.map((o) => (idSet.has(o.id) ? { ...o, status } : o)),
      );
      setSelected(new Set());
    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      setBulkLoading(false);
    }
  };

  const toggleSelect = (id: number) =>
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const allOnPageSelected =
    slice.length > 0 && slice.every((o) => selected.has(o.id));

  const toggleAll = () =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (allOnPageSelected) {
        slice.forEach((o) => next.delete(o.id));
      } else {
        slice.forEach((o) => next.add(o.id));
      }
      return next;
    });

  return {
    loading,
    filtered,
    slice,
    page,
    setPage,
    totalPages,
    selected,
    dates,
    setDates,
    bulkLoading,
    updateStatus,
    toggleSelect,
    toggleAll,
    allOnPageSelected,
  };
}
