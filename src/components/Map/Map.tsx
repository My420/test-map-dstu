import React, { useEffect } from 'react';
import { MAP_ID, POPUP_ID } from '../../utils/constant';
import mapService from '../../services/Map';
import styles from './Map.module.scss';

export interface MapProps {
  onMapClick: (coords: number[]) => void;
  onMarkerClick: (id: string) => void;
  onMapMove: () => void;
}

const Map: React.FC<MapProps> = ({ onMapClick, onMarkerClick, onMapMove }) => {
  useEffect(() => {
    mapService.init(MAP_ID, POPUP_ID);
    mapService.onMapClick(onMapClick);
    mapService.onMarkerClick(onMarkerClick);
    mapService.onMapMove(onMapMove);
    return () => {
      mapService.unsubscribeOnMapClick(onMapClick);
      mapService.unsubscribeOnMarkerClick(onMarkerClick);
      mapService.unsubscribeOnMapMove(onMapMove);
    };
  });
  console.log('--------> map!');
  return <div id={MAP_ID} className={styles.map} />;
};

export default Map;
