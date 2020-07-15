import { ObjectList } from '../components/types';
import markSubstring from './markSubstring';
import isSubstring from './isSubstring';
import { SEARCH_MARK } from './constant';

const searchInObjectList = (list: ObjectList, keyWord: string): ObjectList => {
  if (keyWord === '') return list;

  const newList = list.filter((elem) => isSubstring(elem.title, keyWord));
  if (newList.length === 0) return newList;

  return newList.map((elem) => {
    const markedTitle = markSubstring(elem.title, keyWord, SEARCH_MARK, SEARCH_MARK);
    const newElem = { ...elem, title: markedTitle };
    return newElem;
  });
};

export default searchInObjectList;
