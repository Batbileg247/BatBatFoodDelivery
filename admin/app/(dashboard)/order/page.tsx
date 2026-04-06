"use client";

import { Loader2 } from "lucide-react";
import { BulkActionButton } from "./_components/BulkAction";
import { OrdersTable } from "./_components/OrdersTable";
import { DateFilter } from "./_components/DateFilter";
import { useOrders } from "./_components/UseOrders";

export default function OrdersPage() {
  const {
    loading, filtered, slice, page, setPage, totalPages,
    selected, dates, setDates, bulkLoading,
    updateStatus, toggleSelect, toggleAll, allOnPageSelected,
  } = useOrders();

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
          <DateFilter dates={dates} setDates={setDates} />
          <BulkActionButton
            selected={selected}
            bulkLoading={bulkLoading}
            onUpdateStatus={updateStatus}
          />
        </div>
      </div>

      <OrdersTable
        slice={slice}
        selected={selected}
        allOnPageSelected={allOnPageSelected}
        page={page}
        totalPages={totalPages}
        onToggleAll={toggleAll}
        onToggleSelect={toggleSelect}
        onUpdateStatus={updateStatus}
        onPageChange={setPage}
      />
    </div>
  );
}