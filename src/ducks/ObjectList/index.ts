// constant

export const moduleName = 'OBJECT_LIST';
export const ADD_ITEM = 'OBJECT_LIST/ADD_ITEM';

// types

export interface ObjectListItem {
  id: string;
  title: string;
  description: string;
  lon: number;
  lat: number;
}

export type ObjectList = ObjectListItem[];

export interface AddItemAction {
  type: typeof ADD_ITEM;
  payload: {
    item: ObjectListItem;
  };
}

export interface ReducerState {
  objectList: ObjectList;
}

export type ActionType = AddItemAction;

// action creator

export const addItemToList = (item: ObjectListItem): AddItemAction => ({
  type: ADD_ITEM,
  payload: { item },
});

// async action creator

// reducer

export const initialState: ReducerState = { objectList: [] };

const reducer = (state: ReducerState = initialState, action: ActionType): ReducerState => {
  switch (action.type) {
    case ADD_ITEM: {
      const { item } = action.payload;
      return { ...state, objectList: [...state.objectList, item] };
    }
    default:
      return state;
  }
};

export default reducer;
