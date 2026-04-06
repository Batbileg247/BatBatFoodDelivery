import { Status } from "@/lib/services/put-order-status";

export const STATUSES: Status[] = ["Pending", "Delivered", "Cancelled"];

export const PER_PAGE = 10;

export const STATUS_STYLES: Record<Status, string> = {
  Pending: "border-red-500 text-red-500",
  Delivered: "border-green-500 text-green-500",
  Cancelled: "border-gray-500 text-gray-500",
};

export const TABLE_HEADERS = [
  "#",
  "Customer",
  "Items",
  "Date",
  "Total",
  "Address",
  "Status",
];
