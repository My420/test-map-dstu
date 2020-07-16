import React from 'react';
import { Card } from 'antd';
import { ObjectListItem as Item } from '../../types';
import { SEARCH_MARK } from '../../utils/constant';
import styles from './SearchListItem.module.scss';

export interface SearchListItemProps {
  data: Item;
}

const SearchListItem: React.FC<SearchListItemProps> = ({ data }) => {
  console.log('Object List Item');
  const { title, description } = data;
  const [prev, mark, next] = title.split(SEARCH_MARK);
  return (
    <Card size="small">
      <h4>
        <span>{prev}</span>
        <span className={styles.mark}>{mark}</span>
        <span>{next}</span>
      </h4>
      <p>{description}</p>
    </Card>
  );
};

export default SearchListItem;
