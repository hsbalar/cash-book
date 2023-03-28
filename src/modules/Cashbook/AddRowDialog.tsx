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

import {addRow, updateRow, setEditRow} from '../../states/sheet';
import {toggleAddRowDialog} from '../../states/app';

export default function AddRowDialog({id, handleClose}: any) {
  const dispatch = useDispatch();
  const {editRow} = useSelector((state: any) => state.sheet);
  const {showAddRowDialog} = useSelector((state: any) => state.app);

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
    onClose();
  };

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const onClose = () => {
    dispatch(toggleAddRowDialog());
    dispatch(setEditRow(null));
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showAddRowDialog}
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
                trackColor={{false: '#2da44e', true: '#cf222e'}}
                thumbColor={'#f4f3f4'}
                ios_backgroundColor="#2da44e"
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
              <Text style={styles.buttonSaveText}>
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
    paddingTop: 8,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
