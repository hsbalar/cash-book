/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchRows} from '../states/sheet';
import AddRowDialog from './AddRowDialog';

export default function Home() {
  const dispatch = useDispatch();
  const {rows, refetch} = useSelector((state: any) => state.sheet);
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    dispatch(fetchRows() as any);
  }, [refetch, dispatch]);

  return (
    <>
      {/* <ScrollView
        automaticallyAdjustKeyboardInsets={true}
        contentContainerStyle={{
          flex: 1,
        }}> */}
      <View style={styles.rowHeader}>
        <View style={{flex: 3}}>
          <Text style={{fontSize: 18, fontWeight: '500'}}>Remark</Text>
        </View>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <Text style={{fontSize: 18, fontWeight: '500'}}>Cr/Dr</Text>
        </View>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <Text style={{fontSize: 18, fontWeight: '500'}}>Balance</Text>
        </View>
      </View>
      <SectionList
        automaticallyAdjustKeyboardInsets={true}
        // contentContainerStyle={{
        //   flex: 1,
        // }}
        sections={rows}
        keyExtractor={(item, index) => item + index}
        renderItem={({item: {remark, amount, balance}}) => (
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
        )}
        renderSectionHeader={({section: {date}}) => (
          <Text style={styles.sectionHeader}>{date}</Text>
        )}
      />
      <Pressable onPress={() => setModalVisible(true)}>
        <Text>Show Modal</Text>
      </Pressable>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => setModalVisible(true)}
        style={styles.touchableOpacityStyle}>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <Text>+</Text>
        </View>
      </TouchableOpacity>
      {/* </ScrollView> */}
      <AddRowDialog
        modalVisible={modalVisible}
        setModalVisible={() => {
          setModalVisible(false);
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  rowHeader: {
    padding: 8,
    fontWeight: 'bold',
    flexDirection: 'row',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  row: {
    flex: 1,
    padding: 8,
    paddingLeft: 24,
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    paddingTop: 22,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    opacity: 0.5,
    backgroundColor: 'rgba(247,247,247,1.0)',
    borderBottomColor: 'red',
    borderBottomWidth: 4,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  credit: {
    color: 'green',
  },
  debit: {
    color: 'red',
  },
  touchableOpacityStyle: {
    backgroundColor: 'red',
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },
});
