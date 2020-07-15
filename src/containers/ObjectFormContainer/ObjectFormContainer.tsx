import React from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { ObjectFormData } from '../../components/types';
import ObjectForm from '../../components/ObjectForm';
import { ActionType, addItemToList } from '../../ducks/ObjectList';

export interface FormContainerProps {
  coords: number[];
  callAfterSubmitFunc?: () => void;
}

const ObjectFormContainer: React.FC<FormContainerProps> = ({ coords, callAfterSubmitFunc }) => {
  console.log('OFormContainer');

  const dispatch = useDispatch<Dispatch<ActionType>>();

  const handleSubmit = (data: ObjectFormData) => {
    dispatch(addItemToList(data));
    if (callAfterSubmitFunc) callAfterSubmitFunc();
  };

  return <ObjectForm coords={coords} onSubmit={handleSubmit} />;
};

export default ObjectFormContainer;
