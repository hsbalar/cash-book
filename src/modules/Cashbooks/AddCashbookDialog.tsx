/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  TextInput,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {addCashbook, updateCashbook, setEditRow} from '../../states/sheet';
import {toggleAddCashbookDialog} from '../../states/app';

const AddCashbookDialog = () => {
  const dispatch = useDispatch();
  const {editRow} = useSelector((state: any) => state.sheet);
  const {showAddCashbookDialog} = useSelector((state: any) => state.app);
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
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showAddCashbookDialog}
      onRequestClose={handleClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text
            style={{
              fontSize: 18,
              paddingBottom: 16,
              fontWeight: '500',
            }}>
            {editRow ? 'Update' : 'Enter'} cashbook name
          </Text>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              maxLength={60}
              onChangeText={setTitle}
              value={title}
              placeholder="Name"
            />
          </View>

          <View style={styles.actions}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={handleClose}>
              <Text style={[styles.textStyle]}>Close</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonSave]}
              onPress={() => handleSave()}>
              <Text style={styles.buttonSaveText}>
                {editRow ? 'Update' : 'Save'}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#dadde17a',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 3,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    padding: 8,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#f6f8fa',
    borderColor: '#1b1f2426',
    borderWidth: 1,
    borderRadius: 4,
    marginRight: 12,
  },
  buttonSave: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#2da44e',
    backgroundColor: '#2da44e',
  },
  buttonSaveText: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
  textStyle: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    borderRadius: 4,
    height: 40,
    borderWidth: 1,
    padding: 8,
    borderColor: '#d0d7de',
  },
  form: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  actions: {
    paddingTop: 16,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default AddCashbookDialog;
