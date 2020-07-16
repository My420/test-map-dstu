import React from 'react';
import { RadioChangeEvent } from 'antd/lib/radio';
import { ObjectList as List, SortValue } from '../../types';
import ObjectList from '../ObjectList';
import ObjectListFilter from '../ObjectListFilter';
import styles from './ObjectListPanel.module.scss';

export interface ObjectListPanelProps {
  data: List;
  isSearchActive: boolean;
  sortValue: SortValue;
  onSearch: (value: string) => void;
  onSortChange: (e: RadioChangeEvent) => void;
}

const ObjectListPanel: React.FC<ObjectListPanelProps> = ({
  data,
  isSearchActive,
  sortValue,
  onSearch,
  onSortChange,
}) => {
  console.log('Object List Panel');
  return (
    <div className={styles.container}>
      <ObjectListFilter sortValue={sortValue} onSearch={onSearch} onSortChange={onSortChange} />
      <ObjectList data={data} isSearchActive={isSearchActive} />
    </div>
  );
};

export default ObjectListPanel;
