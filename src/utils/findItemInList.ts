import { ObjectList, ObjectListItem } from '../types';

const findItemInList = (list: ObjectList, id: string): ObjectListItem | null => {
  for (let i = 0; i < list.length; i += 1) {
    if (list[i].id === id) return list[i];
  }
  return null;
};

export default findItemInList;
