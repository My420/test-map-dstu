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
