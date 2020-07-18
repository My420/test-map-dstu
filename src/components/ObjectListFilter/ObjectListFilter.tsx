import React from 'react';
import { Input, Radio } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio/interface';
import { SORT_VALUE_NONE, SORT_VALUE_ASCENDING, SORT_VALUE_DESCENDING } from '../../utils/constant';
import { SortValue } from '../../types';
import styles from './ObjectListFilter.module.scss';

export interface ObjectListFilterProps {
  sortValue: SortValue;
  onSearch: (value: string) => void;
  onSortChange: (e: RadioChangeEvent) => void;
}

const ObjectListFilter: React.FC<ObjectListFilterProps> = ({
  sortValue,
  onSearch,
  onSortChange,
}) => {
  console.log('Object LIst FIlter');

  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <Input.Search placeholder="поиск..." onSearch={onSearch} enterButton />
      </div>
      <div className={styles.sort}>
        <Radio.Group onChange={onSortChange} value={sortValue} buttonStyle="solid">
          <Radio.Button value={SORT_VALUE_NONE}>нет</Radio.Button>
          <Radio.Button value={SORT_VALUE_ASCENDING}>а-я</Radio.Button>
          <Radio.Button value={SORT_VALUE_DESCENDING}>я-а</Radio.Button>
        </Radio.Group>
      </div>
    </div>
  );
};

export default ObjectListFilter;
