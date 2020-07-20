import LineString from 'ol/geom/LineString';
import Polygon from 'ol/geom/Polygon';
import { getArea, getLength } from 'ol/sphere';
import { IconScaleValue } from './types';

export const calcNormalizeScale = (iconScale: IconScaleValue, resolution: number) => {
  const scale = (1 / resolution ** (1 / 7)) * iconScale;
  return scale;
};

export const formatLength = (line: LineString): string => {
  const length = getLength(line);
  let output;
  if (length > 100) {
    output = `${Math.round((length / 1000) * 100) / 100}км`;
  } else {
    output = `${Math.round(length * 100) / 100}м `;
  }
  return output;
};

export const formatArea = (polygon: Polygon): string => {
  const area = getArea(polygon);
  let output;
  if (area > 10000) {
    output = `${Math.round((area / 1000000) * 100) / 100}km<sup>2</sup>`;
  } else {
    output = `${Math.round(area * 100) / 100}m<sup>2</sup>`;
  }
  return output;
};
