import React, { useEffect } from 'react';
import styles from './Map.module.scss';
import mapService from '../../services/MapServices';

export interface MapProps {
  onMapClick: (coords: number[]) => void;
}

const Map: React.FC<MapProps> = ({ onMapClick }) => {
  useEffect(() => {
    mapService.init('map');
    mapService.onMapClick(onMapClick);
  });
  console.log('--------> map!');
  return <div id="map" className={styles.map} />;
};

export default Map;
