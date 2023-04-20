import React, {useEffect} from 'react';
import {Text, View, SectionList, RefreshControl} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useRoute} from '@react-navigation/native';
import Row from './Row';
import {fetchRows, deleteRow, setEditRow} from '../../states/sheet';
import {toggleAddRowDialog} from '../../states/app';
import {IRow} from '../../types/cashbook';
import {RootState} from '../../states/store';
import {row} from '../../styles';
import { formatDate } from '../../utils/helper-functions';

const CashbookEntries = () => {
  const dispatch = useDispatch();
  const route: any = useRoute();
  const {rows, total, loading} = useSelector((state: RootState) => state.sheet);
  const {id} = route.params;

  useEffect(() => {
    dispatch(fetchRows(id));
  }, [id, dispatch]);

  const onRefresh = () => dispatch(fetchRows(id));

  const onDelete = (data: {id: string; index: number}) =>
    dispatch(deleteRow(data));

  const onEdit = (data: IRow) => {
    dispatch(setEditRow(data));
    dispatch(toggleAddRowDialog());
  };

  return (
    <>
      <View style={row.header}>
        <View style={{flex: 3}}>
          <Text style={row.headerText}>Remark</Text>
        </View>
        <View style={row.root}>
          <Text style={row.headerText}>Cr/Dr</Text>
        </View>
        <View style={row.root}>
          <Text style={row.headerText}>Balance</Text>
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
        renderSectionHeader={({section: {date}}) => (
          <Text style={row.section}>{formatDate(date)}</Text>
        )}
      />
      <View style={row.header}>
        <View style={{flex: 3}}>
          <Text>Total</Text>
        </View>
        <View style={row.root}>
          <Text>Cr: {total.credit}</Text>
        </View>
        <View style={row.root}>
          <Text>Dr: {total.debit}</Text>
        </View>
      </View>
    </>
  );
};

export default CashbookEntries;
