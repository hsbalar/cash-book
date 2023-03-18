import React, {useState, useEffect} from 'react';
import {
  FlatList,
  Pressable,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchCashbooks} from '../states/sheet';
import AddCashbookDialog from './AddCashbookDialog';
import {toggleAddCashbookDialog} from '../states/app';

type ItemData = {
  id: string;
  title: string;
};

type ItemProps = {
  item: ItemData;
  onPress: () => void;
  backgroundColor: string;
  textColor: string;
};

const Item = ({item, onPress, backgroundColor, textColor}: ItemProps) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, {backgroundColor}]}>
    <Text style={[styles.title, {color: textColor}]}>{item.title}</Text>
  </TouchableOpacity>
);

const Cashbooks = ({navigation}) => {
  const dispatch = useDispatch();
  const {cashbooks, loading} = useSelector((state: any) => state.sheet);
  const {showAddCashbookDialog} = useSelector((state: any) => state.app);

  useEffect(() => {
    dispatch(fetchCashbooks() as any);
  }, [dispatch]);

  const onRefresh = () => {
    dispatch(fetchCashbooks() as any);
  };

  const [selectedId, setSelectedId] = useState<string>();

  const renderItem = ({item}: {item: ItemData}) => {
    const {id, title} = item;
    const backgroundColor = id === selectedId ? '#6e3b6e' : '#f9c2ff';
    const color = id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => {
          setSelectedId(id);
          navigation.navigate('Edit', {id, title});
        }}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  return (
    <SafeAreaView>
      <FlatList
        data={cashbooks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
      />
      <AddCashbookDialog
        modalVisible={showAddCashbookDialog}
        setModalVisible={() => dispatch(toggleAddCashbookDialog())}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default Cashbooks;
