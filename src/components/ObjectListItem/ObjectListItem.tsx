import React from 'react';
import { Card } from 'antd';
import { ObjectListItem as Item } from '../types';

export interface ObjectListItemProps {
  data: Item;
}

const ObjectListItem: React.FC<ObjectListItemProps> = ({ data }) => {
  console.log('Object List Item');
  return (
    <Card size="small">
      <h4>{data.title}</h4>
      <p>{data.description}</p>
    </Card>
  );
};

export default ObjectListItem;
