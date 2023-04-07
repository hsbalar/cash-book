import React, {useRef} from 'react';
import {RectButton, Swipeable} from 'react-native-gesture-handler';
import {Animated, StyleSheet, Text, View} from 'react-native';
import {IRow} from '../../types/cashbook';

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
        style={[styles.rightAction, {backgroundColor: '#cf222e'}]}
        onPress={onDelete}>
        <Text style={styles.actionText}>Delete</Text>
      </RectButton>
    </Animated.View>
    <Animated.View style={{flex: 1, transform: [{translateX: 0}]}}>
      <RectButton
        style={[styles.rightAction, {backgroundColor: '#2da44e'}]}
        onPress={onEdit}>
        <Text style={styles.actionText}>Edit</Text>
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
    <Swipeable
      ref={swipeableRef}
      rightThreshold={40}
      renderRightActions={() => (
        <RightActions onDelete={onDelete} onEdit={onEdit} />
      )}>
      <View style={[styles.row]}>
        <View style={{flex: 3}}>
          <Text style={{fontSize: 16}}>{remark}</Text>
        </View>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <Text style={amount > 0 ? styles.credit : styles.debit}>
            {amount &&
              amount.toLocaleString('en-IN', {
                maximumFractionDigits: 2,
              })}
          </Text>
        </View>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <Text>
            {balance &&
              balance.toLocaleString('en-IN', {
                maximumFractionDigits: 2,
              })}
          </Text>
        </View>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  row: {
    flex: 1,
    padding: 8,
    paddingLeft: 24,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  credit: {
    color: '#2da44e',
  },
  debit: {
    color: '#cf222e',
  },
  rightAction: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  actionText: {
    color: '#fff',
    fontWeight: '600',
    paddingLeft: 8,
  },
});

export default Row;
