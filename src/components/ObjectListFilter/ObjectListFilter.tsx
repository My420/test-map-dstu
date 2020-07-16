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
      <Input.Search placeholder="поиск..." onSearch={onSearch} />
      <Radio.Group onChange={onSortChange} value={sortValue} buttonStyle="solid">
        <Radio.Button value={SORT_VALUE_NONE}>Нет</Radio.Button>
        <Radio.Button value={SORT_VALUE_ASCENDING}>А-Я</Radio.Button>
        <Radio.Button value={SORT_VALUE_DESCENDING}>Я-А</Radio.Button>
      </Radio.Group>
    </div>
  );
};

export default ObjectListFilter;
