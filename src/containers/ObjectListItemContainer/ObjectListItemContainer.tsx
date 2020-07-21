import React, { useCallback } from 'react';
import { ObjectListItem as Item } from '../../types';
import ObjectListItem from '../../components/ObjectListItem';
import SearchListItem from '../../components/SearchListItem';
import mapService from '../../services/Map';

export interface ObjectListItemContainerProps {
  data: Item;
  isSearchActive: boolean;
}

const ObjectListItemContainer: React.FC<ObjectListItemContainerProps> = ({
  data,
  isSearchActive,
}) => {
  const { id, lon, lat } = data;

  const handleClick = useCallback(
    (evt: React.MouseEvent) => {
      evt.preventDefault();
      mapService.moveViewToMarker(id, [lon, lat]);
    },
    [id, lon, lat],
  );

  return (
    <a href="#/marker" onClick={handleClick}>
      {isSearchActive ? <SearchListItem data={data} /> : <ObjectListItem data={data} />}
    </a>
  );
};

export default ObjectListItemContainer;
