/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  TextInput,
} from 'react-native';
import {useDispatch} from 'react-redux';

import {addCashbook} from '../states/sheet';

const AddCashbookDialog = ({modalVisible, setModalVisible}: any) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');

  const handleSave = () => {
    setModalVisible(false);
    dispatch(
      addCashbook({
        title,
        headerValues: ['date', 'remark', 'amount'],
      }) as any,
    );
    setTimeout(() => {
      setTitle('');
    });
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text
            style={{
              fontSize: 18,
              paddingBottom: 16,
              fontWeight: '500',
            }}>
            Enter cashbook name
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
              onPress={() => {
                setModalVisible(false);
              }}>
              <Text style={[styles.textStyle]}>Close</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonSave]}
              onPress={() => handleSave()}>
              <Text style={styles.textStyle}>Save</Text>
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
    backgroundColor: '#e8e8e8',
    borderColor: '#e8e8e8',
    borderWidth: 2,
    borderRadius: 4,
    marginRight: 12,
  },
  buttonSave: {
    borderRadius: 4,
    backgroundColor: '#2096f3',
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
