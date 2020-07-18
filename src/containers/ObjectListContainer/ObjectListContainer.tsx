import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RadioChangeEvent } from 'antd/lib/radio';
import { SortValue } from '../../types';
import useToggle from '../../hooks/useToggle';
import ObjectListPanel from '../../components/ObjectListPanel';
import searchInObjectList from '../../utils/searchInObjectList';
import { SORT_VALUE_NONE } from '../../utils/constant';
import sortObjectList from '../../utils/sortObjectList';
import getObjectList from '../../ducks/ObjectList/selector';

export interface ObjectListContainerProps {}

const ObjectListContainer: React.FC<ObjectListContainerProps> = () => {
  const list = useSelector(getObjectList);
  const [searchValue, setSearchValue] = useState('');
  const [sortValue, setSortValue] = useState<SortValue>(SORT_VALUE_NONE);
  const [isPanelOpen, togglePanelStatus] = useToggle(true);

  const isSearchActive = !!searchValue;

  const dataWithSearch = searchInObjectList(list, searchValue);
  const dataWithSort = sortObjectList(dataWithSearch, sortValue);

  const handleSearch = useCallback((value: string) => setSearchValue(value), [setSearchValue]);
  const handleSortChange = useCallback((evt: RadioChangeEvent) => {
    const { value } = evt.target;
    setSortValue(value);
  }, []);

  console.log('Object List Conteiner');
  return (
    <ObjectListPanel
      isPanelOpen={isPanelOpen}
      data={dataWithSort}
      isSearchActive={isSearchActive}
      sortValue={sortValue}
      onSearch={handleSearch}
      onSortChange={handleSortChange}
      togglePanelStatus={togglePanelStatus}
    />
  );
};

export default ObjectListContainer;
