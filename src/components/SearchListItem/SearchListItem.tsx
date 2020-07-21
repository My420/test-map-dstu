import React from 'react';
import { Card, Typography } from 'antd';
import { ObjectListItem as Item } from '../../types';
import { SEARCH_MARK } from '../../utils/constant';
import MarkerIcon from '../../services/Map/icons';
import styles from './SearchListItem.module.scss';

export interface SearchListItemProps {
  data: Item;
}

const SearchListItem: React.FC<SearchListItemProps> = ({ data }) => {
  const { title, description, iconName } = data;
  const [prev, mark, next] = title.split(SEARCH_MARK);
  return (
    <Card
      size="small"
      type="inner"
      title={(
        <div className={styles.wrapper}>
          <img className={styles.img} src={MarkerIcon[iconName]} alt={data.iconName} />
          <h4 className={styles.title}>
            <span>{prev}</span>
            <Typography.Text mark>{mark}</Typography.Text>
            <span>{next}</span>
          </h4>
        </div>
      )}
      hoverable
    >
      <p>{description}</p>
    </Card>
  );
};

export default SearchListItem;
