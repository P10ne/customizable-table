import { TSortDestination } from "./SortDestination";

export interface HeaderSortEvent {
  columnId: string;
  destination: TSortDestination;
}

export type SortEvent = HeaderSortEvent | null;
