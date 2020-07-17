import { AppState } from '../../store';
import { ObjectList } from '.';

const getObjectList = (store: AppState): ObjectList => store.objectList;

export default getObjectList;
