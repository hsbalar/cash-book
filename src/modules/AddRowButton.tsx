import React from 'react';
import {useDispatch} from 'react-redux';
import {Button} from 'react-native';
import {toggleAddRowDialog} from '../states/app';

const AddRowButton = () => {
  const dispatch = useDispatch();
  return <Button title="+" onPress={() => dispatch(toggleAddRowDialog())} />;
};

export default AddRowButton;
