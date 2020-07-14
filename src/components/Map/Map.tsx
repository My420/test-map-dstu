import React, { useEffect } from 'react';
import styles from './Map.module.scss';
import mapService from '../../services/MapServices';

export interface MapProps {}

const Map: React.FC<MapProps> = () => {
  useEffect(() => {
    mapService.init('map');
  });
  return <div id="map" className={styles.map} />;
};

export default Map;
