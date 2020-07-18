export interface MarkerData {
  id: string;
  title: string;
  description: string;
  lon: number;
  lat: number;
}

export interface IMarkerIcon {
  busStop: string;
  car: string;
  error: string;
  gasStation: string;
  government: string;
  home: string;
  hospital: string;
  hotel: string;
  information: string;
  library: string;
  placeholder: string;
  question: string;
  restaurant: string;
  school: string;
  tree: string;
  wc: string;
}
export type MarkerIconName = keyof IMarkerIcon;

export type IconScaleValue = 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1;
