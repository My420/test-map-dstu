import React from 'react';
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
  return (
    <ul className={styles.list}>
      {data.map((elem) => (
        <li className={styles.item} key={elem.lon + elem.lat}>
          {isSearchActive ? <SearchListItem data={elem} /> : <ObjectListItem data={elem} />}
        </li>
      ))}
    </ul>
  );
};

export default ObjectList;
