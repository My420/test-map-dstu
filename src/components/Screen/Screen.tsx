import React from 'react';
import { ObjectFormData } from '../types';
import Map from '../Map';
import ObjectForm from '../ObjectForm';
import ModalWindow from '../ModalWindow';

export interface ScreenProps {
  coords: number[];
  isFormOpen: boolean;
  onFormSubmit: (data: ObjectFormData) => void;
  onModalClose: () => void;
  onMapClick: (coords: number[]) => void;
}

const Screen: React.FC<ScreenProps> = ({
  coords,
  isFormOpen,
  onFormSubmit,
  onModalClose,
  onMapClick,
}) => (
  <>
    <Map onMapClick={onMapClick} />
    <ModalWindow isOpen={isFormOpen} onClose={onModalClose}>
      <ObjectForm coords={coords} onSubmit={onFormSubmit} />
    </ModalWindow>
  </>
);

export default Screen;
