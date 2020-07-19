import React from 'react';
import Map from '../Map';
import ObjectFormContainer from '../../containers/ObjectFormContainer';
import ObjectListContainer from '../../containers/ObjectListContainer';
import MarkerPopupContainer from '../../containers/MarkerPopupContainer';

export interface ScreenProps {}

const Screen: React.FC<ScreenProps> = () => (
  <>
    <Map />
    <ObjectFormContainer />
    <ObjectListContainer />
    <MarkerPopupContainer />
  </>
);

export default Screen;
