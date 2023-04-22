import React from 'react';
import {Pressable, Text} from 'react-native';
import {useDispatch} from 'react-redux';
import {toggleAddCashbookDialog} from '../../states/app';
import {rippleButton, navigationButton} from '../../styles';

const AddCashbookButton = () => {
  const dispatch = useDispatch();
  return (
    <Pressable
      onPress={() => dispatch(toggleAddCashbookDialog())}
      android_ripple={rippleButton}>
      <Text style={navigationButton.root}>+</Text>
    </Pressable>
  );
};

export default AddCashbookButton;
