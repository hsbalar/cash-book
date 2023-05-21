import React, {useEffect} from 'react';
import {FlatList, RefreshControl, SafeAreaView, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {
  fetchCashbooks,
  deleteCashbook,
  setEditRow,
  setRows,
  aggregatedRows,
} from '../../states/sheet';
import {toggleAddCashbookDialog} from '../../states/app';

import Item from './Row';
import {RootState} from '../../states/store';
import {ICashbook} from '../../types/cashbook';

const CashbookList = () => {
  const dispatch = useDispatch();
  const navigation: any = useNavigation();
  const {cashbooks, loading} = useSelector((state: RootState) => state.sheet);

  useEffect(() => {
    dispatch(fetchCashbooks());
  }, [dispatch]);

  const onRefresh = () => dispatch(fetchCashbooks());

  const onEdit = (row: ICashbook) => {
    dispatch(setEditRow(row));
    dispatch(toggleAddCashbookDialog());
  };

  const onDelete = (id: string) => dispatch(deleteCashbook(id));

  const onClick = (item: any) => {
    dispatch(setRows(aggregatedRows([])));
    navigation.navigate('Edit', item);
  };

  return (
    <SafeAreaView>
      <View style={{paddingTop: 4}}>
        <FlatList
          data={cashbooks}
          renderItem={({item}) => (
            <Item
              {...item}
              handleClick={() => onClick(item)}
              handleDelete={onDelete}
              handleEdit={onEdit}
            />
          )}
          keyExtractor={item => item.id}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={onRefresh} />
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default CashbookList;
