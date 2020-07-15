import { SORT_VALUE_NONE, SORT_VALUE_ASCENDING, SORT_VALUE_DESCENDING } from '../../utils/constant';

export interface ObjectFormData {
  title: string;
  description: string;
  lon: number;
  lat: number;
}

export interface ObjectListItem {
  title: string;
  description: string;
  lon: number;
  lat: number;
}

export type ObjectList = ObjectListItem[];

export type SortValue =
  | typeof SORT_VALUE_NONE
  | typeof SORT_VALUE_ASCENDING
  | typeof SORT_VALUE_DESCENDING;
