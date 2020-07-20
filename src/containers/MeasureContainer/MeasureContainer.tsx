import React, { useState } from 'react';
import MeasureToolBar from '../../components/MeasureToolBar';
import MeasureToolTip from '../../components/MeasureTooltip';
import MapServices from '../../services/Map';

export interface MeasureContainerProps {}

const MeasureContainer: React.FC<MeasureContainerProps> = () => {
  console.log('Measure Container');

  const [isLineActive, setIsLineActive] = useState(false);
  const [isPolygonActive, setIsPolygonActive] = useState(false);

  const handleLineBtnClick = () => {
    if (isLineActive) {
      MapServices.stopMeasurement();
      setIsLineActive(false);
    } else if (isPolygonActive) {
      MapServices.stopMeasurement();
      setIsPolygonActive(false);
      setIsLineActive(true);
      MapServices.startMeasurement('LINE_STRING');
    } else {
      setIsLineActive(true);
      MapServices.startMeasurement('LINE_STRING');
    }
  };

  const handlePolygonBtnClick = () => {
    if (isPolygonActive) {
      MapServices.stopMeasurement();
      setIsPolygonActive(false);
    } else if (isLineActive) {
      MapServices.stopMeasurement();
      setIsLineActive(false);
      setIsPolygonActive(true);
      MapServices.startMeasurement('POLYGON');
    } else {
      setIsPolygonActive(true);
      MapServices.startMeasurement('POLYGON');
    }
  };

  return (
    <>
      <MeasureToolBar
        isLineActive={isLineActive}
        isPolygonActive={isPolygonActive}
        onLineBtnClick={handleLineBtnClick}
        onPolygonBtnClick={handlePolygonBtnClick}
      />
      <MeasureToolTip />
    </>
  );
};

export default MeasureContainer;
