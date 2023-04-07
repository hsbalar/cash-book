import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  RefreshControl,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useRoute} from '@react-navigation/native';
import Row from './Row';
import {fetchRows, deleteRow, setEditRow} from '../../states/sheet';
import {toggleAddRowDialog} from '../../states/app';
import {IRow} from '../../types/cashbook';
import {RootState} from '../../states/store';

const CashbookEntries = () => {
  const dispatch = useDispatch();
  const route: any = useRoute();
  const {rows, total, loading} = useSelector((state: RootState) => state.sheet);
  const {id} = route.params;

  useEffect(() => {
    dispatch(fetchRows(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onRefresh = () => {
    dispatch(fetchRows(id));
  };

  const onDelete = (data: any) => {
    dispatch(deleteRow(data));
  };

  const onEdit = (data: IRow) => {
    dispatch(setEditRow(data));
    dispatch(toggleAddRowDialog());
  };

  return (
    <>
      <View style={styles.rowHeader}>
        <View style={{flex: 3}}>
          <Text style={{fontSize: 16, fontWeight: '500'}}>Remark</Text>
        </View>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <Text style={{fontSize: 16, fontWeight: '500'}}>Cr/Dr</Text>
        </View>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <Text style={{fontSize: 16, fontWeight: '500'}}>Balance</Text>
        </View>
      </View>
      <SectionList
        automaticallyAdjustKeyboardInsets={true}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
        sections={rows}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={({item}) => (
          <Row {...item} id={id} handleDelete={onDelete} handleEdit={onEdit} />
        )}
        renderSectionHeader={({section: {dateString}}) => (
          <Text style={styles.sectionHeader}>{dateString}</Text>
        )}
      />
      <View style={styles.rowHeader}>
        <View style={{flex: 3}}>
          <Text>Total</Text>
        </View>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <Text>Cr: {total.credit}</Text>
        </View>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <Text>Dr: {total.debit}</Text>
        </View>
      </View>
    </>
  );
};

export default CashbookEntries;

const styles = StyleSheet.create({
  rowHeader: {
    padding: 8,
    flexDirection: 'row',
    backgroundColor: '#ddf4ff',
    borderWidth: 1,
    borderColor: '#54aeff66',
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
    color: '#57606a',
    backgroundColor: '#f6f8fa',
    borderWidth: 0.5,
    borderColor: '#d0d7de',
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
