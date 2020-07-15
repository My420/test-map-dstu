import React from 'react';
import Map from '../Map';
import ModalWindow from '../ModalWindow';
import ObjectFormContainer from '../../containers/ObjectFormContainer';

export interface ScreenProps {
  coords: number[];
  isModalOpen: boolean;
  toggleModalStatus: () => void;
  onMapClick: (coords: number[]) => void;
}

const Screen: React.FC<ScreenProps> = ({
  coords, isModalOpen, toggleModalStatus, onMapClick,
}) => (
  <>
    <Map onMapClick={onMapClick} />
    <ModalWindow isOpen={isModalOpen} onClose={toggleModalStatus}>
      <ObjectFormContainer coords={coords} callAfterSubmitFunc={toggleModalStatus} />
    </ModalWindow>
  </>
);

export default Screen;
