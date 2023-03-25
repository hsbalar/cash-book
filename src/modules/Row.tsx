import React, {useRef} from 'react';
import {useDispatch} from 'react-redux';
import {RectButton, Swipeable} from 'react-native-gesture-handler';
import {Animated, StyleSheet, Text, View} from 'react-native';
import {deleteRow, setEditRow} from '../states/sheet';
import {toggleAddRowDialog} from '../states/app';

const RightActions = ({onDelete, onEdit}: any) => (
  <View
    style={{
      width: 192,
      flexDirection: 'row',
    }}>
    <Animated.View style={{flex: 1, transform: [{translateX: 0}]}}>
      <RectButton
        style={[styles.rightAction, {backgroundColor: '#dd2c00'}]}
        onPress={onDelete}>
        <Text style={styles.actionText}>Delete</Text>
      </RectButton>
    </Animated.View>
    <Animated.View style={{flex: 1, transform: [{translateX: 0}]}}>
      <RectButton
        style={[styles.rightAction, {backgroundColor: '#388e3c'}]}
        onPress={onEdit}>
        <Text style={styles.actionText}>Edit</Text>
      </RectButton>
    </Animated.View>
  </View>
);

const Row = ({id, index, remark, amount, balance, date}: any) => {
  const dispatch = useDispatch();

  const swipeableRef: any = useRef(null);

  const onDelete = () => {
    dispatch(deleteRow({id, index}) as any);
    swipeableRef.current.close();
  };

  const onEdit = () => {
    dispatch(
      setEditRow({
        date,
        index,
        remark,
        amount: Math.abs(amount).toString(),
      }) as any,
    );
    setTimeout(() => {
      dispatch(toggleAddRowDialog());
    }, 0);
    swipeableRef.current.close();
  };

  return (
    <Swipeable
      ref={swipeableRef}
      rightThreshold={40}
      renderRightActions={() => (
        <RightActions onDelete={() => onDelete()} onEdit={() => onEdit()} />
      )}>
      <View style={[styles.row]}>
        <View style={{flex: 3}}>
          <Text style={{fontSize: 16, fontWeight: '500'}}>{remark}</Text>
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
    color: '#dd2c00',
  },
  debit: {
    color: '#388e3c',
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
