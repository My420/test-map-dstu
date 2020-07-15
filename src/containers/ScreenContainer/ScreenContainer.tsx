import React, { useState, useCallback } from 'react';
import Screen from '../../components/Screen';
import useToggle from '../../hooks/useToggle';

export interface ScreenContainerProps {}

const ScreenContainer: React.FC<ScreenContainerProps> = () => {
  const [isModalOpen, toggleModal] = useToggle(false);
  const [coords, setState] = useState([0, 0]);

  const onMapClick = useCallback(
    (newCoords: number[]): void => {
      setState(newCoords);
      toggleModal();
    },
    [setState, toggleModal],
  );

  console.log('screen container');

  return (
    <Screen
      coords={coords}
      isModalOpen={isModalOpen}
      toggleModalStatus={toggleModal}
      onMapClick={onMapClick}
    />
  );
};

export default ScreenContainer;
