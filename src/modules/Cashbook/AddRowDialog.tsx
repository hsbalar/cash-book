import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Modal,
  Pressable,
  Switch,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import format from 'date-fns/format';
import {useRoute} from '@react-navigation/native';

import {addRow, updateRow, setEditRow} from '../../states/sheet';
import {toggleAddRowDialog} from '../../states/app';
import {RootState} from '../../states/store';
import {
  actions,
  button,
  dialog,
  header,
  input,
  rippleButton,
} from '../../styles';

const AddRowDialog = () => {
  const dispatch = useDispatch();
  const route: any = useRoute();
  const {editRow} = useSelector((state: RootState) => state.sheet);
  const {showAddRowDialog} = useSelector((state: RootState) => state.app);
  const {id} = route.params;

  const [cashout, setCashout] = useState(true);
  const [amount, onChangeAmount] = useState('');
  const [remark, onChangeRemark] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    onChangeAmount(editRow?.amount.toString() || '');
    onChangeRemark(editRow?.remark || '');
    const newDate = editRow ? new Date(editRow.date) : new Date();
    setDate(newDate);
  }, [editRow]);

  const handleSave = () => {
    if (isNaN(Number(amount)) || !amount) {
      return;
    }
    const payload = {
      index: editRow?.index || null,
      id,
      date: format(date, 'MM/dd/yyyy'),
      remark,
      amount: cashout ? -amount : amount,
    };
    if (editRow) {
      dispatch(updateRow(payload));
    } else {
      dispatch(addRow(payload));
    }
    onClose();
  };

  const onChange = (event: any, selectedDate: any) => {
    setShowDatePicker(false);
    setDate(selectedDate);
  };

  const onClose = () => {
    dispatch(toggleAddRowDialog());
    dispatch(setEditRow(null));
    onChangeAmount('');
    onChangeRemark('');
    setCashout(true);
    setDate(new Date());
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showAddRowDialog}
      onRequestClose={onClose}>
      <View style={dialog.container}>
        <View style={dialog.root}>
          <Text style={header.root}>{editRow ? 'Update' : 'Add'} Entry</Text>
          <View style={styles.cols}>
            <View style={styles.row}>
              <Text>{cashout ? 'Cash Out:' : 'Cash In:  '}</Text>
              <Switch
                trackColor={{false: '#2da44e', true: '#cf222e'}}
                thumbColor={'#f4f3f4'}
                ios_backgroundColor="#2da44e"
                onValueChange={() =>
                  setCashout(previousState => !previousState)
                }
                value={cashout}
              />
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setShowDatePicker(true)}>
              <View style={styles.row}>
                <Text>Date: {format(date, 'dd-MM-yyyy')}</Text>
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
            <TextInput
              style={input.root}
              keyboardType="number-pad"
              placeholder="Amount"
              onChangeText={onChangeAmount}
              value={amount}
            />
            <TextInput
              style={input.root}
              maxLength={60}
              onChangeText={onChangeRemark}
              value={remark}
              placeholder="Remark"
            />
          </View>
          <View style={actions.root}>
            <Pressable
              style={[button.root, button.close]}
              android_ripple={rippleButton}
              onPress={onClose}>
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

export default AddRowDialog;

const styles = StyleSheet.create({
  cols: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
