import React, { useState, useCallback } from 'react';
import ObjectListPanel from '../../components/ObjectListPanel';
import searchInObjectList from '../../utils/searchInObjectList';

export interface ObjectListContainerProps {}

const list = [
  {
    title: 'test1',
    description: 'description1',
    lon: 1,
    lat: 1,
  },
  {
    title: 'test2',
    description: 'description2',
    lon: 2,
    lat: 2,
  },
  {
    title: 'test3',
    description: 'description3',
    lon: 3,
    lat: 3,
  },
  {
    title: 'test4',
    description: 'description3',
    lon: 4,
    lat: 4,
  },
  {
    title: 'test5',
    description: 'description3',
    lon: 5,
    lat: 5,
  },
  {
    title: 'test6',
    description: 'description3',
    lon: 6,
    lat: 6,
  },
];

const ObjectListContainer: React.FC<ObjectListContainerProps> = () => {
  const [searchValue, setSearchValue] = useState('');
  let data = list;
  const isSearchActive = !!searchValue;
  if (isSearchActive) {
    data = searchInObjectList(list, searchValue);
  }

  const handleSearch = useCallback((value: string) => setSearchValue(value), [setSearchValue]);

  console.log('Object List Conteiner');
  return <ObjectListPanel data={data} onSearch={handleSearch} isSearchActive={isSearchActive} />;
};

export default ObjectListContainer;
