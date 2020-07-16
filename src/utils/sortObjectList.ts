import { ObjectList } from '../ducks/ObjectList';
import { SortValue } from '../types';
import { SORT_VALUE_ASCENDING, SORT_VALUE_DESCENDING } from './constant';

const sortObjectList = (list: ObjectList, type: SortValue): ObjectList => {
  if (type === SORT_VALUE_ASCENDING) return [...list].sort((a, b) => (a.title > b.title ? 1 : -1));
  if (type === SORT_VALUE_DESCENDING) return [...list].sort((a, b) => (a.title > b.title ? -1 : 1));
  return list;
};

export default sortObjectList;
