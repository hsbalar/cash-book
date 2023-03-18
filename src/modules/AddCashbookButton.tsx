import React from 'react';
import {useDispatch} from 'react-redux';
import {Button} from 'react-native';
import {toggleAddCashbookDialog} from '../states/app';

const AddCashbookButton = () => {
  const dispatch = useDispatch();
  return (
    <Button title="+" onPress={() => dispatch(toggleAddCashbookDialog())} />
  );
};

export default AddCashbookButton;
