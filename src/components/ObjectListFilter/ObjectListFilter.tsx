import React from 'react';
import { Input } from 'antd';
import styles from './ObjectListFilter.module.scss';

export interface ObjectListFilterProps {
  onSearch: (value: string) => void;
}

const ObjectListFilter: React.FC<ObjectListFilterProps> = ({ onSearch }) => {
  console.log('Object LIst FIlter');

  return (
    <div className={styles.container}>
      <Input.Search placeholder="поиск..." onSearch={onSearch} />
    </div>
  );
};

export default ObjectListFilter;
