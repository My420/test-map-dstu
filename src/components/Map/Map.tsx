import React, { useEffect } from 'react';
import { MAP_ID, POPUP_ID } from '../../utils/constant';
import mapService from '../../services/Map';
import styles from './Map.module.scss';

export interface MapProps {}

const Map: React.FC<MapProps> = () => {
  useEffect(() => {
    mapService.init(MAP_ID, POPUP_ID);
  });

  console.log('--------> map!');
  return <div id={MAP_ID} className={styles.map} />;
};

export default Map;
