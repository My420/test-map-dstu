import React from 'react';
import Map from '../Map';
import ObjectFormContainer from '../../containers/ObjectFormContainer';
import ObjectListContainer from '../../containers/ObjectListContainer';
import MarkerPopupContainer from '../../containers/MarkerPopupContainer';
import ControlsContainer from '../../containers/ControlsContainer';

export interface ScreenProps {}

const Screen: React.FC<ScreenProps> = () => (
  <>
    <Map />
    <ObjectFormContainer />
    <ObjectListContainer />
    <MarkerPopupContainer />
    <ControlsContainer />
  </>
);

export default Screen;
