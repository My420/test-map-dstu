import React from 'react';
import { Popover, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { POPUP_ID } from '../../utils/constant';
import { ObjectListItem } from '../../types';

export interface MarkerPopupProps {
  isOpen: boolean;
  data: ObjectListItem;
  onClose: () => void;
}

const MarkerPopup: React.FC<MarkerPopupProps> = ({ isOpen, data, onClose }) => {
  console.log('Marker Popup', isOpen, data);

  const { title, description } = data;

  const content = (
    <div>
      <p>{description}</p>
      <Button
        shape="circle"
        type="primary"
        size="small"
        onClick={() => onClose()}
        icon={<CloseOutlined />}
      />
    </div>
  );

  return (
    <Popover content={content} title={title} visible={isOpen}>
      <div id={POPUP_ID} />
    </Popover>
  );
};

export default MarkerPopup;
