import React from 'react';
import { Switch, Tooltip } from 'antd';
import styles from './ControlsPanel.module.scss';

export interface ControlsPanelProps {
  isIconNormalize: boolean;
  onNormalizeClick: () => void;
}

const ControlsPanel: React.FC<ControlsPanelProps> = ({ isIconNormalize, onNormalizeClick }) => {
  const onText = 'Включить нормализацию иконок';
  const offText = 'Выключить нормализацию иконок';

  return (
    <div className={styles.container}>
      <Tooltip title={isIconNormalize ? offText : onText} placement="topRight">
        <Switch defaultChecked={isIconNormalize} onChange={onNormalizeClick} />
      </Tooltip>
    </div>
  );
};

export default ControlsPanel;
