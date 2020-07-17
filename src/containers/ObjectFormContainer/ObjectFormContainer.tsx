import React from 'react';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { ObjectFormData } from '../../types';
import ObjectForm from '../../components/ObjectForm';
import { ActionType, createUserObject, ReducerState } from '../../ducks/ObjectList';

export interface FormContainerProps {
  coords: number[];
  callAfterSubmitFunc?: () => void;
}

const ObjectFormContainer: React.FC<FormContainerProps> = ({ coords, callAfterSubmitFunc }) => {
  console.log('OFormContainer');

  const dispatch = useDispatch<ThunkDispatch<ReducerState, {}, ActionType>>();

  const handleSubmit = (data: ObjectFormData) => {
    dispatch(createUserObject(data));
    if (callAfterSubmitFunc) callAfterSubmitFunc();
  };

  return <ObjectForm coords={coords} onSubmit={handleSubmit} />;
};

export default ObjectFormContainer;
