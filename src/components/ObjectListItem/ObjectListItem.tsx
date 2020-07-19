import React from 'react';
import { Card } from 'antd';
import { ObjectListItem as Item } from '../../types';
import MarkerIcon from '../../services/Map/icons';
import styles from './ObjectListItem.module.scss';

export interface ObjectListItemProps {
  data: Item;
}

const ObjectListItem: React.FC<ObjectListItemProps> = ({ data }) => {
  console.log('Object List Item');
  return (
    <Card
      size="small"
      type="inner"
      title={(
        <div className={styles.wrapper}>
          <img className={styles.img} src={MarkerIcon[data.iconName]} alt={data.iconName} />
          <h4 className={styles.title}>{data.title}</h4>
        </div>
      )}
      hoverable
    >
      <p>{data.description}</p>
    </Card>
  );
};

export default ObjectListItem;
