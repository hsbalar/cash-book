import React, {useEffect} from 'react';
import {FlatList, RefreshControl, SafeAreaView, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchCashbooks, deleteCashbook, setEditRow} from '../../states/sheet';
import {toggleAddCashbookDialog} from '../../states/app';

import Item from './Row';

const CashbookList = ({navigation}: any) => {
  const dispatch = useDispatch();
  const {cashbooks, loading} = useSelector((state: any) => state.sheet);

  useEffect(() => {
    dispatch(fetchCashbooks());
  }, [dispatch]);

  const onRefresh = () => {
    dispatch(fetchCashbooks());
  };

  const onEdit = (row: any) => {
    dispatch(setEditRow(row));
    dispatch(toggleAddCashbookDialog());
  };

  const onDelete = (id: string) => {
    dispatch(deleteCashbook(id));
  };

  return (
    <SafeAreaView>
      <View style={{paddingTop: 4}}>
        <FlatList
          data={cashbooks}
          renderItem={({item}) => (
            <Item
              {...item}
              handleClick={() => {
                navigation.navigate('Edit', item);
              }}
              handleDelete={onDelete}
              handleEdit={onEdit}
            />
          )}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={onRefresh} />
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default CashbookList;
