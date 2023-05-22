import React, {useEffect, useState} from 'react';
import {Text, View, Modal, Pressable, TextInput} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {addCashbook, updateCashbook, setEditRow} from '../../states/sheet';
import {toggleAddCashbookDialog} from '../../states/app';
import {RootState} from '../../states/store';
import {
  actions,
  button,
  rippleButton,
  dialog,
  header,
  input,
} from '../../styles';

const AddCashbookDialog = () => {
  const dispatch = useDispatch();
  const {editRow} = useSelector((state: RootState) => state.sheet);
  const {showAddCashbookDialog} = useSelector((state: RootState) => state.app);
  const [title, setTitle] = useState('');

  useEffect(() => {
    setTitle(editRow?.title || '');
  }, [editRow]);

  const handleSave = () => {
    const payload = {
      id: editRow?.id,
      title,
      headerValues: ['date', 'remark', 'amount'],
    };
    if (editRow) {
      dispatch(updateCashbook(payload));
    } else {
      dispatch(addCashbook(payload));
    }
    handleClose();
  };

  const handleClose = () => {
    dispatch(toggleAddCashbookDialog());
    dispatch(setEditRow(null));
    setTitle('');
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showAddCashbookDialog}
      onRequestClose={handleClose}>
      <View style={dialog.container}>
        <View style={dialog.root}>
          <Text style={header.root}>
            {editRow ? 'Update' : 'Enter'} cashbook name
          </Text>
          <View>
            <TextInput
              autoFocus
              style={input.root}
              maxLength={60}
              onChangeText={setTitle}
              value={title}
              placeholder="Name"
              onSubmitEditing={handleSave}
            />
          </View>

          <View style={actions.root}>
            <Pressable
              style={[button.root, button.close]}
              onPress={handleClose}
              android_ripple={rippleButton}>
              <Text style={button.text}>Close</Text>
            </Pressable>
            <Pressable
              style={[button.root, button.save]}
              onPress={handleSave}
              android_ripple={rippleButton}>
              <Text style={button.saveText}>{editRow ? 'Update' : 'Save'}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddCashbookDialog;
