import React from 'react';
import { Button } from 'antd';
import { MarkerIconName } from '../../../services/Map/types';
import MarkerIcon from '../../../services/Map/icons';
import Icon from './Icon';
import styles from './IconSelector.module.scss';

export interface IconSelectorProps {
  selectedIcon: MarkerIconName;
  onChange: (name: MarkerIconName) => any;
  onClose: () => any;
}

const IconSelector: React.FC<IconSelectorProps> = ({ onChange, onClose }) => {
  console.log('Icon Selector');
  const names = Object.keys(MarkerIcon) as MarkerIconName[];

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {names.map((name) => (
          <Icon key={name} name={name} src={MarkerIcon[name]} onClick={onChange} />
        ))}
      </ul>
      <div className={styles.controls}>
        <Button type="primary" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
};

export default IconSelector;
