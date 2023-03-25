/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  Switch,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import format from 'date-fns/format';

import {addRow, updateRow} from '../states/sheet';
import {setEditRow} from '../states/sheet';

export default function AddRowDialog({id, visible, handleClose}: any) {
  const dispatch = useDispatch();
  const {editRow} = useSelector((state: any) => state.sheet);

  const [out, setOut] = useState(true);
  const [amount, onChangeAmount] = useState('');
  const [remark, onChangeRemark] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    onChangeAmount(editRow?.amount || '');
    onChangeRemark(editRow?.remark || '');
    const newDate = editRow ? new Date(editRow.date.iso) : new Date();
    setDate(newDate);
  }, [editRow]);

  const handleSave = () => {
    const payload = {
      index: editRow ? editRow.index : null,
      id,
      date: format(date, 'MM/dd/yyyy'),
      remark,
      amount: out ? -amount : amount,
    };
    if (editRow) {
      dispatch(updateRow(payload) as any);
    } else {
      dispatch(addRow(payload) as any);
    }
    handleClose();
  };

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const onClose = () => {
    handleClose();
    dispatch(setEditRow(null));
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text
            style={{
              fontSize: 18,
              paddingBottom: 8,
              fontWeight: '500',
            }}>
            {editRow ? 'Update' : 'Add'} Entry
          </Text>
          <View style={styles.form}>
            <View
              style={{
                alignItems: 'flex-end',
                paddingBottom: 8,
              }}>
              <Switch
                trackColor={{false: '#55a45a', true: '#fa5035'}}
                thumbColor={'#f4f3f4'}
                ios_backgroundColor="#55a45a"
                onValueChange={() => setOut((previousState) => !previousState)}
                value={out}
              />
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setShowDatePicker(true)}>
              <View style={{paddingBottom: 8}}>
                <Text>Date: {date.toLocaleString()}</Text>
                {showDatePicker && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode="date"
                    is24Hour={true}
                    onChange={onChange}
                  />
                )}
              </View>
            </TouchableOpacity>
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
              onPress={onClose}>
              <Text style={[styles.textStyle]}>Close</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonSave]}
              onPress={() => handleSave()}>
              <Text style={styles.textStyle}>
                {editRow ? 'Update' : 'Save'}
              </Text>
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
    paddingTop: 8,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
