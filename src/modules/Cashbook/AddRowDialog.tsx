import React, {useEffect, useState} from 'react';
import {
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
import {useRoute} from '@react-navigation/native';

import {addRow, updateRow, setEditRow} from '../../states/sheet';
import {toggleAddRowDialog} from '../../states/app';
import {RootState} from '../../states/store';
import {actions, button, dialog, header, input} from '../../styles';

const AddRowDialog = () => {
  const dispatch = useDispatch();
  const route: any = useRoute();
  const {editRow} = useSelector((state: RootState) => state.sheet);
  const {showAddRowDialog} = useSelector((state: RootState) => state.app);
  const {id} = route.params;

  const [out, setOut] = useState(true);
  const [amount, onChangeAmount] = useState('');
  const [remark, onChangeRemark] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    onChangeAmount(editRow?.amount.toString() || '');
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
          <View>
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
                style={input.root}
                keyboardType="number-pad"
                placeholder="Amount"
                onChangeText={onChangeAmount}
                value={amount}
              />
            </View>
            <View style={{paddingBottom: 8}}>
              <TextInput
                style={input.root}
                maxLength={60}
                onChangeText={onChangeRemark}
                value={remark}
                placeholder="Remark"
              />
            </View>
          </View>
          <View style={actions.root}>
            <Pressable style={[button.root, button.close]} onPress={onClose}>
              <Text style={button.text}>Close</Text>
            </Pressable>
            <Pressable
              style={[button.root, button.save]}
              onPress={() => handleSave()}>
              <Text style={button.saveText}>{editRow ? 'Update' : 'Save'}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddRowDialog;
