import React from 'react';
import { Card, Typography } from 'antd';
import { ObjectListItem as Item } from '../../types';
import { SEARCH_MARK } from '../../utils/constant';
// import styles from './SearchListItem.module.scss';

export interface SearchListItemProps {
  data: Item;
}

const SearchListItem: React.FC<SearchListItemProps> = ({ data }) => {
  console.log('Object List Item');
  const { title, description } = data;
  const [prev, mark, next] = title.split(SEARCH_MARK);
  return (
    <Card
      size="small"
      type="inner"
      title={(
        <h4>
          <span>{prev}</span>
          <Typography.Text mark>{mark}</Typography.Text>
          <span>{next}</span>
        </h4>
      )}
      hoverable
    >
      <p>{description}</p>
    </Card>
  );
};

export default SearchListItem;
