import React from 'react';
import { RadioChangeEvent } from 'antd/lib/radio';
import { Button } from 'antd';
import { CloseOutlined, MenuOutlined } from '@ant-design/icons';
import { ObjectList as List, SortValue } from '../../types';
import ObjectList from '../ObjectList';
import ObjectListFilter from '../ObjectListFilter';
import styles from './ObjectListPanel.module.scss';

export interface ObjectListPanelProps {
  isPanelOpen: boolean;
  data: List;
  isSearchActive: boolean;
  sortValue: SortValue;
  onSearch: (value: string) => void;
  onSortChange: (e: RadioChangeEvent) => void;
  togglePanelStatus: () => void;
}

const ObjectListPanel: React.FC<ObjectListPanelProps> = ({
  isPanelOpen,
  data,
  isSearchActive,
  sortValue,
  onSearch,
  onSortChange,
  togglePanelStatus,
}) => {
  console.log('Object List Panel');
  return (
    <div>
      <div className={styles.controls}>
        <Button
          type="primary"
          shape="circle"
          icon={isPanelOpen ? <CloseOutlined /> : <MenuOutlined />}
          onClick={togglePanelStatus}
        />
      </div>

      {isPanelOpen && (
        <div className={styles.container}>
          <div className={styles.filter}>
            <ObjectListFilter
              sortValue={sortValue}
              onSearch={onSearch}
              onSortChange={onSortChange}
            />
          </div>
          <div className={styles.list}>
            <ObjectList data={data} isSearchActive={isSearchActive} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ObjectListPanel;
