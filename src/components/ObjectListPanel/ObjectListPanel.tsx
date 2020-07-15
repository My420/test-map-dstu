import React from 'react';
import { ObjectList as List } from '../types';
import ObjectList from '../ObjectList';
import ObjectListFilter from '../ObjectListFilter';
import styles from './ObjectListPanel.module.scss';

export interface ObjectListPanelProps {
  isSearchActive: boolean;
  data: List;
  onSearch: (value: string) => void;
}

const ObjectListPanel: React.FC<ObjectListPanelProps> = ({ data, onSearch, isSearchActive }) => {
  console.log('Object List Panel');
  return (
    <div className={styles.container}>
      <ObjectListFilter onSearch={onSearch} />
      <ObjectList data={data} isSearchActive={isSearchActive} />
    </div>
  );
};

export default ObjectListPanel;
