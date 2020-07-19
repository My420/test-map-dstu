import React, { useCallback } from 'react';
import { Popover, Slider } from 'antd';
import {
  ICON_SIZE,
  ICON_SCALE_MIN,
  ICON_SCALE_MAX,
  ICON_SCALE_STEP,
} from '../../services/Map/constant';
import { MarkerIconName, IconScaleValue } from '../../services/Map/types';
import useToggle from '../../hooks/useToggle';
import IconSelector from './IconSelector';
import MarkerIcon from '../../services/Map/icons';
import styles from './IconPicker.module.scss';

export interface IconPickerProps {
  icon: MarkerIconName;
  scale: IconScaleValue;
  onIconChange: (name: MarkerIconName) => any;
  onScaleChange: (value: IconScaleValue) => any;
}

const IconPicker: React.FC<IconPickerProps> = ({
  icon, scale, onIconChange, onScaleChange,
}) => {
  console.log('Icon Picker');

  const [isOpen, toggleIsOpen] = useToggle(false);

  const handleIconChange = useCallback(
    (name: MarkerIconName) => {
      onIconChange(name);
      toggleIsOpen();
    },
    [onIconChange, toggleIsOpen],
  );

  const handleScaleChange = useCallback((value: number) => onScaleChange(value as IconScaleValue), [
    onScaleChange,
  ]);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Выберите иконку:</h3>
      <div className={styles.controls}>
        <Popover
          content={
            <IconSelector selectedIcon={icon} onChange={handleIconChange} onClose={toggleIsOpen} />
          }
          title="Выберите иконку:"
          trigger="click"
          visible={isOpen}
        >
          <button
            type="button"
            className={styles.iconPicker}
            style={{
              width: `${ICON_SIZE + 2}px`,
              height: `${ICON_SIZE + 2}px`,
            }}
            onClick={toggleIsOpen}
          >
            <div
              style={{
                transform: `scale(${scale})`,
              }}
            >
              <img src={MarkerIcon[icon]} alt="name" />
            </div>
          </button>
        </Popover>
        <div className={styles.slider}>
          <Slider
            defaultValue={scale}
            min={ICON_SCALE_MIN}
            max={ICON_SCALE_MAX}
            step={ICON_SCALE_STEP}
            onChange={handleScaleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default IconPicker;
