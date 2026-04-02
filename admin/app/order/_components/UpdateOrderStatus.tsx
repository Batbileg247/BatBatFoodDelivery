"use client";

import * as React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Order } from "@/lib/services/get-order";

export function UpdateOrderStatus({ order }: { order: Order[] }) {
  const [selectedRows, setSelectedRows] = React.useState<Set<string>>(
    new Set(["1"]),
  );

  const selectAll = selectedRows.size === order.length;

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(new Set(order.map((row) => String(row.id))));
    } else {
      setSelectedRows(new Set());
    }
  };

  const handleSelectRow = (id: number, checked: boolean) => {
    const newSelected = new Set(selectedRows);
    if (checked) {
      newSelected.add(String(id));
    } else {
      newSelected.delete(String(id));
    }
    setSelectedRows(newSelected);
  };

  return (
    <div className="bg-white py-4 rounded-2xl w-full">
      <div>Orders</div>
      <Table className="">
        <TableHeader>
          <TableRow>
            <TableHead className="w-8">
              <Checkbox
                id="select-all-checkbox"
                name="select-all-checkbox"
                checked={selectAll}
                onCheckedChange={handleSelectAll}
              />
            </TableHead>
            <TableHead>№</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Food</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Delivery Address</TableHead>
            <TableHead>Delivery state</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {order.map((row) => (
            <TableRow
              key={row.id}
              data-state={
                selectedRows.has(String(row.id)) ? "selected" : undefined
              }
            >
              <TableCell>
                <Checkbox
                  id={`row-${row.id}-checkbox`}
                  name={`row-${row.id}-checkbox`}
                  checked={selectedRows.has(String(row.id))}
                  onCheckedChange={(checked) =>
                    handleSelectRow(Number(row.id), checked === true)
                  }
                />
              </TableCell>
              <TableCell className="font-medium">{row.id}</TableCell>
              <TableCell>{row.userId}</TableCell>
              <TableCell>{row.createdAt}</TableCell>
              <TableCell>{row.createdAt}</TableCell>
              <TableCell>{row.totalPrice}</TableCell>
              <TableCell>{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
