import { IconScaleValue } from './types';

const calcNormalizeScale = (iconScale: IconScaleValue, resolution: number) => {
  const scale = (1 / resolution ** (1 / 7)) * iconScale;
  return scale;
};

export default calcNormalizeScale;
