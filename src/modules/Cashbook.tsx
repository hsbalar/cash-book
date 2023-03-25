/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  RefreshControl,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchRows} from '../states/sheet';
import AddRowDialog from './AddRowDialog';
import {toggleAddRowDialog} from '../states/app';
import Row from './Row';
import {formatDate} from '../utils/helper-functions';

const Cashbook = ({route}: any) => {
  const dispatch = useDispatch();
  const {rows, loading} = useSelector((state: any) => state.sheet);
  const {showAddRowDialog} = useSelector((state: any) => state.app);

  const {id} = route.params;

  useEffect(() => {
    dispatch(fetchRows(id) as any);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onRefresh = () => {
    dispatch(fetchRows(id) as any);
  };

  return (
    <>
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
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
        sections={rows}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => <Row {...item} id={id} />}
        renderSectionHeader={({section: {date}}) => (
          <Text style={styles.sectionHeader}>{formatDate(date.iso)}</Text>
        )}
      />
      <AddRowDialog
        id={id}
        visible={showAddRowDialog}
        handleClose={() => {
          dispatch(toggleAddRowDialog());
        }}
      />
    </>
  );
};

export default Cashbook;

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
