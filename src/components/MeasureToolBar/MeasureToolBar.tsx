import React, { useCallback } from 'react';
import { Button, Tooltip } from 'antd';
import { LineOutlined, BorderOutlined } from '@ant-design/icons';
import styles from './MeasureToolBar.module.scss';

export interface MeasureToolBarProps {
  isLineActive: boolean;
  isPolygonActive: boolean;
  onLineBtnClick: () => any;
  onPolygonBtnClick: () => any;
}

const MeasureToolBar: React.FC<MeasureToolBarProps> = ({
  isLineActive,
  isPolygonActive,
  onLineBtnClick,
  onPolygonBtnClick,
}) => {
  console.log('Measure Tool Bar');

  const handleLineClick = useCallback(() => onLineBtnClick(), [onLineBtnClick]);
  const handlePolygonClick = useCallback(() => onPolygonBtnClick(), [onPolygonBtnClick]);

  const lineOffText = 'Завершить измерение расстояния';
  const lineOnText = 'Измерить расстояние';

  const polyOffText = 'Завершить измерение площади';
  const polyOnText = 'Измерить площадь';

  return (
    <div className={styles.container}>
      <Tooltip title={isLineActive ? lineOffText : lineOnText} placement="topRight">
        <Button
          type="primary"
          shape="circle"
          icon={<LineOutlined />}
          onClick={handleLineClick}
          danger={isLineActive}
        />
      </Tooltip>
      <Tooltip title={isPolygonActive ? polyOffText : polyOnText} placement="topRight">
        <Button
          type="primary"
          shape="circle"
          icon={<BorderOutlined />}
          onClick={handlePolygonClick}
          danger={isPolygonActive}
        />
      </Tooltip>
    </div>
  );
};

export default MeasureToolBar;
