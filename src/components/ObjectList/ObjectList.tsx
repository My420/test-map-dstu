import React from 'react';
import { Empty } from 'antd';
import { ObjectList as List } from '../../types';
import ObjectListItem from '../ObjectListItem';
import styles from './ObjectList.module.scss';
import SearchListItem from '../SearchListItem';

export interface ObjectListProps {
  data: List;
  isSearchActive: boolean;
}

const ObjectList: React.FC<ObjectListProps> = ({ data, isSearchActive }) => {
  console.log('Object List ');
  const isEmpty = data.length === 0;
  return (
    <ul className={styles.list}>
      {isEmpty && (
        <Empty
          description={
            <span className={styles.emptyDescription}>Нажмите на карту, чтобы добавить метку.</span>
          }
        />
      )}
      {!isEmpty
        && data.map((elem) => (
          <li className={styles.item} key={elem.id}>
            {isSearchActive ? <SearchListItem data={elem} /> : <ObjectListItem data={elem} />}
          </li>
        ))}
    </ul>
  );
};

export default ObjectList;
