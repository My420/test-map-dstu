import React from 'react';
import { Popover, Button } from 'antd';
import { POPUP_ID } from '../../utils/constant';
import { ObjectListItem } from '../../types';

export interface MarkerPopupProps {
  isOpen: boolean;
  data: ObjectListItem;
  onClose: () => void;
}

const MarkerPopup: React.FC<MarkerPopupProps> = ({ isOpen, data, onClose }) => {
  console.log('Marker Popup');

  const { title, description } = data;

  const content = (
    <div>
      <p>{title}</p>
      <p>{description}</p>
      <Button type="link" onClick={() => onClose()}>
        Close
      </Button>
    </div>
  );

  return (
    <Popover content={content} title={title} visible={isOpen}>
      <div id={POPUP_ID} />
    </Popover>
  );
};

export default MarkerPopup;
