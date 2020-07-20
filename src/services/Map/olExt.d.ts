import { Overlay, Feature } from 'ol';
import { DrawEvent } from 'ol/interaction/Draw';
import { Tooltip } from 'antd';

namespace olExt {
  export interface Tooltip extends Overlay {
    setFeature: (feature: Feature | DrawEvent) => void;
    removeFeature: (feature: Feature | DrawEvent) => void;
  }

  export function createTooltip(): Tooltip;
}
export default olExt;
