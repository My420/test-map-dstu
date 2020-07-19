import React, { useState, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import MarkerPopup from '../../components/MarkerPopup';
import getObjectList from '../../ducks/ObjectList/selector';
import findItemInList from '../../utils/findItemInList';
import { ObjectListItem } from '../../types';
import mapService from '../../services/Map';

export interface MarkerPopupContainerProps {}

const emptyMock: ObjectListItem = {
  title: 'Ошибка',
  description: 'Такого маркера нет в списке!',
  lon: 0,
  lat: 0,
  id: 'errorID',
  iconName: 'question',
  iconScale: 0.7,
};

const MarkerPopupContainer: React.FC<MarkerPopupContainerProps> = () => {
  console.log('Marker Popup Container');

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [markerId, setMarkerId] = useState('');
  const objectList = useSelector(getObjectList);

  const handleMapClick = useCallback(() => setIsPopupOpen(false), [setIsPopupOpen]);
  const handleMarkerClick = useCallback(
    (id: string) => {
      setIsPopupOpen(false);
      setMarkerId(id);
      setIsPopupOpen(true);
    },
    [setMarkerId, setIsPopupOpen],
  );

  const handleMapMove = useCallback(() => setIsPopupOpen(false), [setIsPopupOpen]);

  useEffect(() => {
    mapService.onMapClick(handleMapClick);
    mapService.onMarkerClick(handleMarkerClick);
    mapService.onMapMove(handleMapMove);
    return () => {
      mapService.unsubscribeOnMapClick(handleMapClick);
      mapService.unsubscribeOnMarkerClick(handleMarkerClick);
      mapService.unsubscribeOnMapMove(handleMapMove);
    };
  });

  const handleCloseClick = useCallback(() => setIsPopupOpen(false), [setIsPopupOpen]);

  const item = findItemInList(objectList, markerId) || emptyMock;

  return <MarkerPopup isOpen={isPopupOpen} data={item} onClose={handleCloseClick} />;
};

export default MarkerPopupContainer;
