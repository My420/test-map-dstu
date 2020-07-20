import React from 'react';
import { TOOLTIP_MEASURE_ID, TOOLTIP_HELPER_ID } from '../../utils/constant';

export interface MeasureToolTipProps {}

const MeasureToolTip: React.FC<MeasureToolTipProps> = () => (
  <>
    <span id={TOOLTIP_MEASURE_ID} />
    <span id={TOOLTIP_HELPER_ID} />
  </>
);

export default MeasureToolTip;
