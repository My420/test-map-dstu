import React from 'react';
import { useSelector } from 'react-redux';
import MarkerPopup from '../../components/MarkerPopup';
import getObjectList from '../../ducks/ObjectList/selector';
import findItemInList from '../../utils/findItemInList';
import { ObjectListItem } from '../../types';

export interface MarkerPopupContainerProps {
  isOpen: boolean;
  markerId: string;
  onClose: () => void;
}

const emptyMock: ObjectListItem = {
  title: 'Ошибка',
  description: 'Такого маркера нет в списке!',
  lon: 0,
  lat: 0,
  id: 'errorID',
  iconName: 'question',
  iconScale: 0.7,
};

const MarkerPopupContainer: React.FC<MarkerPopupContainerProps> = ({
  isOpen,
  markerId,
  onClose,
}) => {
  console.log('Marker Popup Container');
  const objectList = useSelector(getObjectList);
  const item = findItemInList(objectList, markerId) || emptyMock;
  return <MarkerPopup isOpen={isOpen} data={item} onClose={onClose} />;
};

export default MarkerPopupContainer;
