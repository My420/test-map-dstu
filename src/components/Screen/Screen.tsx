import React from 'react';
import Map from '../Map';
import ModalWindow from '../ModalWindow';
import ObjectFormContainer from '../../containers/ObjectFormContainer';
import ObjectListContainer from '../../containers/ObjectListContainer';
import MarkerPopupContainer from '../../containers/MarkerPopupContainer';

export interface ScreenProps {
  coords: number[];
  markerId: string;
  isModalOpen: boolean;
  isMarkerPopupOpen: boolean;
  toggleModalStatus: () => void;
  onMapClick: (coords: number[]) => void;
  onMarkerClick: (id: string) => void;
  onMarkerPopupClose: () => void;
  onMapMove: () => void;
}

const Screen: React.FC<ScreenProps> = ({
  coords,
  markerId,
  isModalOpen,
  isMarkerPopupOpen,
  toggleModalStatus,
  onMapClick,
  onMarkerClick,
  onMarkerPopupClose,
  onMapMove,
}) => (
  <>
    <Map onMapClick={onMapClick} onMarkerClick={onMarkerClick} onMapMove={onMapMove} />
    <ModalWindow isOpen={isModalOpen} onClose={toggleModalStatus}>
      <ObjectFormContainer coords={coords} callAfterSubmitFunc={toggleModalStatus} />
    </ModalWindow>
    <ObjectListContainer />
    <MarkerPopupContainer
      isOpen={isMarkerPopupOpen}
      markerId={markerId}
      onClose={onMarkerPopupClose}
    />
  </>
);

export default Screen;
