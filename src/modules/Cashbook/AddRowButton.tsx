import React from 'react';
import {useDispatch} from 'react-redux';
import {Pressable, Text} from 'react-native';
import {toggleAddRowDialog} from '../../states/app';
import {navigationButton, rippleButton} from '../../styles';

const AddRowButton = () => {
  const dispatch = useDispatch();
  return (
    <Pressable
      onPress={() => dispatch(toggleAddRowDialog())}
      android_ripple={rippleButton}>
      <Text style={navigationButton.root}>+</Text>
    </Pressable>
  );
};

export default AddRowButton;
