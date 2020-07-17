import React, { useState, useCallback } from 'react';
import Screen from '../../components/Screen';
import useToggle from '../../hooks/useToggle';

export interface ScreenContainerProps {}

const ScreenContainer: React.FC<ScreenContainerProps> = () => {
  const [isModalOpen, toggleModal] = useToggle(false);
  const [coords, setCoordsState] = useState([0, 0]);
  const [isMarkerPopupOpen, setIsMarkerPopupOpen] = useState(false);
  const [markerId, setMarkerId] = useState('');

  const handleMarkerClick = useCallback(
    (id: string) => {
      setIsMarkerPopupOpen(false);
      setMarkerId(id);
      setIsMarkerPopupOpen(true);
    },
    [setMarkerId, setIsMarkerPopupOpen],
  );

  const handleMapClick = useCallback(
    (newCoords: number[]): void => {
      setIsMarkerPopupOpen(false);
      setCoordsState(newCoords);
      toggleModal();
    },
    [setCoordsState, toggleModal, setIsMarkerPopupOpen],
  );

  const handleMapMove = useCallback((): void => setIsMarkerPopupOpen(false), [
    setIsMarkerPopupOpen,
  ]);

  const handleMarkerPopupClose = useCallback((): void => setIsMarkerPopupOpen(false), [
    setIsMarkerPopupOpen,
  ]);

  console.log('screen container');

  return (
    <Screen
      coords={coords}
      markerId={markerId}
      isModalOpen={isModalOpen}
      isMarkerPopupOpen={isMarkerPopupOpen}
      toggleModalStatus={toggleModal}
      onMapClick={handleMapClick}
      onMarkerClick={handleMarkerClick}
      onMarkerPopupClose={handleMarkerPopupClose}
      onMapMove={handleMapMove}
    />
  );
};

export default ScreenContainer;
