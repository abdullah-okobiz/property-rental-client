export type TabKey = "currentHosting" | "checking" | "checkout" | "arriving" | "upcoming" | "pending";

export interface RowData {
  key: number;
  guest: string;
  date: string;
  status: string;
  room: string;
}