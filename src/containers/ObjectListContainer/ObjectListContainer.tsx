import React, { useState, useCallback } from 'react';
import { RadioChangeEvent } from 'antd/lib/radio';
import { SortValue } from '../../components/types';
import ObjectListPanel from '../../components/ObjectListPanel';
import searchInObjectList from '../../utils/searchInObjectList';
import { SORT_VALUE_NONE } from '../../utils/constant';
import sortObjectList from '../../utils/sortObjectList';

export interface ObjectListContainerProps {}

const list = [
  {
    title: 'Test B',
    description: 'description1',
    lon: 1,
    lat: 1,
  },
  {
    title: 'Test A',
    description: 'description2',
    lon: 2,
    lat: 2,
  },
  {
    title: 'Test E',
    description: 'description3',
    lon: 3,
    lat: 3,
  },
  {
    title: 'Test C',
    description: 'description3',
    lon: 4,
    lat: 4,
  },
  {
    title: 'Test F',
    description: 'description3',
    lon: 5,
    lat: 5,
  },
  {
    title: 'Test D',
    description: 'description3',
    lon: 6,
    lat: 6,
  },
];

const ObjectListContainer: React.FC<ObjectListContainerProps> = () => {
  const [searchValue, setSearchValue] = useState('');
  const [sortValue, setSortValue] = useState<SortValue>(SORT_VALUE_NONE);

  const isSearchActive = !!searchValue;

  const dataWithSearch = searchInObjectList(list, searchValue);
  console.log('with Search', dataWithSearch);
  const dataWithSort = sortObjectList(dataWithSearch, sortValue);
  console.log('with Sort', dataWithSort);

  const handleSearch = useCallback((value: string) => setSearchValue(value), [setSearchValue]);
  const handleSortChange = useCallback((evt: RadioChangeEvent) => {
    const { value } = evt.target;
    setSortValue(value);
  }, []);

  console.log('Object List Conteiner');
  return (
    <ObjectListPanel
      data={dataWithSort}
      onSearch={handleSearch}
      isSearchActive={isSearchActive}
      sortValue={sortValue}
      onSortChange={handleSortChange}
    />
  );
};

export default ObjectListContainer;
