import { AppState } from '../../store';
import { ObjectList } from '../../types';

const getObjectList = (store: AppState): ObjectList => store.objectList;

export default getObjectList;
