import React from 'react';
import { Empty } from 'antd';
import { ObjectList as List } from '../../types';
import styles from './ObjectList.module.scss';
import ObjectListItemContainer from '../../containers/ObjectListItemContainer';

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
        <div className={styles.empty}>
          <Empty
            description={(
              <span className={styles.emptyDescription}>
                Нажмите на карту, чтобы добавить метку.
              </span>
            )}
          />
        </div>
      )}
      {!isEmpty
        && data.map((elem) => (
          <li className={styles.item} key={elem.id}>
            <ObjectListItemContainer data={elem} isSearchActive={isSearchActive} />
          </li>
        ))}
    </ul>
  );
};

export default ObjectList;
