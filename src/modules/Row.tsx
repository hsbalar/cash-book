import React from 'react';
import {Swipeable} from 'react-native-gesture-handler';
import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Item} from '../types/cashbook';

const LeftActions = (progress: any, dragX: any) => {
  const scale = dragX.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  return (
    <View style={styles.leftAction}>
      <Animated.Text style={[styles.actionText, {transform: [{scale}]}]}>
        Edit
      </Animated.Text>
    </View>
  );
};

const RightActions = ({progress, dragX, onPress}: any) => {
  const scale = dragX.interpolate({
    inputRange: [-100, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
  console.log(progress);

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.rightAction}>
        <Animated.Text style={[styles.actionText, {transform: [{scale}]}]}>
          Delete
        </Animated.Text>
      </View>
    </TouchableOpacity>
  );
};

const Row = ({remark, amount, balance, onRightPress}: any) => {
  return (
    <Swipeable
      renderLeftActions={LeftActions}
      renderRightActions={(progress, dragX) => (
        <RightActions
          progress={progress}
          dragX={dragX}
          onPress={onRightPress}
        />
      )}
      onSwipeableOpen={(directions: any) => {
        console.log(directions);
      }}>
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
    color: 'green',
  },
  debit: {
    color: 'red',
  },
  leftAction: {
    backgroundColor: '#388e3c',
    justifyContent: 'center',
    flex: 1,
  },
  rightAction: {
    backgroundColor: '#dd2c00',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  actionText: {
    color: '#fff',
    fontWeight: '600',
    paddingLeft: 8,
  },
});

export default Row;
