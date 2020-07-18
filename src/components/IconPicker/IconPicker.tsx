import React, { useState, useCallback } from 'react';
import { Popover, Slider } from 'antd';
import {
  ICON_SIZE,
  ICON_SCALE,
  ICON_SCALE_MIN,
  ICON_SCALE_MAX,
  ICON_SCALE_STEP,
} from '../../services/Map/constant';
import { MarkerIconName, IconScaleValue } from '../../services/Map/types';
import useToggle from '../../hooks/useToggle';
import IconSelector from './IconSelector';
import MarkerIcon from '../../services/Map/icons';
import styles from './IconPicker.module.scss';

export interface IconPickerProps {}

const IconPicker: React.FC<IconPickerProps> = () => {
  console.log('Icon Picker');

  const [isOpen, toggleIsOpen] = useToggle(false);
  const [iconName, setIconName] = useState<MarkerIconName>('placeholder');
  const [iconScale, setIconScale] = useState<IconScaleValue>(ICON_SCALE);

  const handleIconChange = useCallback(
    (name: MarkerIconName) => {
      setIconName(name);
      toggleIsOpen();
    },
    [setIconName, toggleIsOpen],
  );

  const handleScaleChange = useCallback((value: number) => setIconScale(value as IconScaleValue), [
    setIconScale,
  ]);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Выберите иконку:</h3>
      <div className={styles.controls}>
        <Popover
          content={(
            <IconSelector
              selectedIcon={iconName}
              onChange={handleIconChange}
              onClose={toggleIsOpen}
            />
          )}
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
                transform: `scale(${iconScale})`,
              }}
            >
              <img src={MarkerIcon[iconName]} alt="name" />
            </div>
          </button>
        </Popover>
        <div className={styles.slider}>
          <Slider
            defaultValue={iconScale}
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
