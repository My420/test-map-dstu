import React from 'react';
import { RadioChangeEvent } from 'antd/lib/radio';
import { ObjectList as List, SortValue } from '../types';
import ObjectList from '../ObjectList';
import ObjectListFilter from '../ObjectListFilter';
import styles from './ObjectListPanel.module.scss';

export interface ObjectListPanelProps {
  isSearchActive: boolean;
  sortValue: SortValue;
  data: List;
  onSearch: (value: string) => void;
  onSortChange: (e: RadioChangeEvent) => void;
}

const ObjectListPanel: React.FC<ObjectListPanelProps> = ({
  data,
  onSearch,
  isSearchActive,
  sortValue,
  onSortChange,
}) => {
  console.log('Object List Panel');
  return (
    <div className={styles.container}>
      <ObjectListFilter onSearch={onSearch} sortValue={sortValue} onSortChange={onSortChange} />
      <ObjectList data={data} isSearchActive={isSearchActive} />
    </div>
  );
};

export default ObjectListPanel;
