/* eslint-disable react-native/no-inline-styles */
import React, {useRef} from 'react';
import {
  GestureHandlerRootView,
  RectButton,
  Swipeable,
} from 'react-native-gesture-handler';
import {Animated, Text, View} from 'react-native';
import {IRow} from '../../types/cashbook';
import {cashbookRow, rightActions} from '../../styles';

interface IRightActions {
  onDelete: () => void;
  onEdit: () => void;
}

const RightActions = ({onDelete, onEdit}: IRightActions) => (
  <View
    style={{
      width: 192,
      flexDirection: 'row',
    }}>
    <Animated.View style={{flex: 1, transform: [{translateX: 0}]}}>
      <RectButton
        style={[rightActions.root, {backgroundColor: '#cf222e'}]}
        onPress={onDelete}>
        <Text style={rightActions.text}>Delete</Text>
      </RectButton>
    </Animated.View>
    <Animated.View style={{flex: 1, transform: [{translateX: 0}]}}>
      <RectButton
        style={[rightActions.root, {backgroundColor: '#2da44e'}]}
        onPress={onEdit}>
        <Text style={rightActions.text}>Edit</Text>
      </RectButton>
    </Animated.View>
  </View>
);

interface IRowProps extends IRow {
  id: string;
  handleDelete: ({id, index}: {id: string; index: number}) => void;
  handleEdit: ({date, index, remark, amount}: IRow) => void;
}

const Row = ({
  id,
  index,
  remark,
  amount,
  date,
  balance,
  handleEdit,
  handleDelete,
}: IRowProps) => {
  const swipeableRef: any = useRef(null);

  const onDelete = () => {
    handleDelete({id, index});
    swipeableRef.current.close();
  };

  const onEdit = () => {
    handleEdit({
      date,
      index,
      remark,
      amount: Math.abs(amount),
    });
    swipeableRef.current.close();
  };

  return (
    <GestureHandlerRootView>
      <Swipeable
        ref={swipeableRef}
        rightThreshold={40}
        renderRightActions={() => (
          <RightActions onDelete={onDelete} onEdit={onEdit} />
        )}>
        <View style={cashbookRow.root}>
          <View style={{flex: 4}}>
            <Text style={cashbookRow.remark}>{remark}</Text>
          </View>
          <View style={{flex: 2, alignItems: 'flex-end'}}>
            <Text style={amount > 0 ? cashbookRow.credit : cashbookRow.debit}>
              {amount &&
                amount.toLocaleString('en-IN', {
                  maximumFractionDigits: 2,
                })}
            </Text>
          </View>
          <View style={{flex: 2, alignItems: 'flex-end'}}>
            <Text style={cashbookRow.balance}>
              {balance &&
                balance.toLocaleString('en-IN', {
                  maximumFractionDigits: 2,
                })}
            </Text>
          </View>
        </View>
      </Swipeable>
    </GestureHandlerRootView>
  );
};

export default Row;
