import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { ObjectFormData } from '../../types';
import useToggle from '../../hooks/useToggle';
import ObjectForm from '../../components/ObjectForm';
import { ActionType, createUserObject, ReducerState } from '../../ducks/ObjectList';
import mapService from '../../services/Map';
import ModalWindow from '../../components/ModalWindow';

export interface FormContainerProps {}

const ObjectFormContainer: React.FC<FormContainerProps> = () => {
  const [isModalOpen, toggleModal] = useToggle(false);
  const [coords, setCoordsState] = useState([0, 0]);

  const dispatch = useDispatch<ThunkDispatch<ReducerState, {}, ActionType>>();

  const onMapClick = useCallback(
    (newCoords: number[]): void => {
      setCoordsState(newCoords);
      toggleModal();
    },
    [setCoordsState, toggleModal],
  );

  useEffect(() => {
    mapService.onMapClick(onMapClick);
    return () => {
      mapService.unsubscribeOnMapClick(onMapClick);
    };
  });

  const handleSubmit = (data: ObjectFormData) => {
    dispatch(createUserObject(data));
    toggleModal();
  };

  return (
    <ModalWindow isOpen={isModalOpen} onClose={toggleModal}>
      <ObjectForm coords={coords} onSubmit={handleSubmit} />
    </ModalWindow>
  );
};

export default ObjectFormContainer;
