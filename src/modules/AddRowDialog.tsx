/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  Switch,
  TextInput,
} from 'react-native';
import {useDispatch} from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import format from 'date-fns/format';

import {addRow} from '../states/sheet';

export default function AddRowDialog({modalVisible, setModalVisible}: any) {
  const dispatch = useDispatch();
  const [inOut, setInOut] = useState(false);
  const [amount, onChangeAmount] = useState('');
  const [remark, onChangeRemark] = useState('');
  const [date, setDate] = useState(new Date());

  const handleSave = () => {
    setModalVisible(false);
    dispatch(
      addRow({
        date: format(date, 'MM/dd/yyyy'),
        remark,
        amount,
      }) as any,
    );
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
              paddingBottom: 8,
              fontWeight: '500',
            }}>
            Add Entry
          </Text>
          <View style={styles.form}>
            <View
              style={{
                alignItems: 'flex-end',
                paddingBottom: 8,
              }}>
              <Switch
                trackColor={{false: '#fa5035', true: '#55a45a'}}
                thumbColor={'#f4f3f4'}
                ios_backgroundColor="#fa5035"
                onValueChange={() => setInOut(previousState => !previousState)}
                value={inOut}
              />
            </View>
            <View style={{paddingBottom: 8}}>
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode="date"
                is24Hour={true}
                onChange={(event: any, selectedDate: any) =>
                  setDate(selectedDate)
                }
              />
            </View>
            <View style={{paddingBottom: 8}}>
              <TextInput
                style={styles.input}
                keyboardType="number-pad"
                placeholder="Amount"
                onChangeText={onChangeAmount}
                value={amount}
              />
            </View>
            <View style={{paddingBottom: 8}}>
              <TextInput
                style={styles.input}
                maxLength={60}
                onChangeText={onChangeRemark}
                value={remark}
                placeholder="Remark"
              />
            </View>
          </View>

          <View style={styles.actions}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(false)}>
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
}

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
    padding: 12,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#e8e8e8',
    borderColor: '#e8e8e8',
    borderWidth: 2,
    borderRadius: 4,
    marginRight: 16,
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
    paddingTop: 8,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
