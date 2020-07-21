import React from 'react';
import { MarkerIconName } from '../../../../services/Map/types';
import styles from './Icon.module.scss';

export interface IconProps {
  name: MarkerIconName;
  src: string;
  onClick: (name: MarkerIconName) => any;
}

const Icon: React.FC<IconProps> = ({ name, src, onClick }) => {
  const handleClick = () => onClick(name);

  return (
    <button type="button" className={styles.item} onClick={handleClick}>
      <img className={styles.img} src={src} alt={name} />
    </button>
  );
};

export default Icon;
