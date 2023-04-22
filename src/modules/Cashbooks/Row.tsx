import React, {useRef} from 'react';
import {Text, TouchableOpacity, StyleSheet, View, Animated} from 'react-native';
import {
  RectButton,
  Swipeable,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import {rightActions} from '../../styles';

interface IRowProps {
  id: string;
  title: string;
  handleClick: () => void;
  handleDelete: (id: string) => void;
  handleEdit: ({id, title}: {id: string; title: string}) => void;
}

interface IRightActions {
  onDelete: () => void;
  onEdit: () => void;
}

const RightActions = ({onDelete, onEdit}: IRightActions) => (
  <View
    style={{
      marginRight: 4,
      padding: 4,
      width: 192,
      flexDirection: 'row',
    }}>
    <Animated.View
      style={{flex: 1, marginRight: 4, transform: [{translateX: 0}]}}>
      <RectButton
        style={[
          rightActions.root,
          {
            borderRadius: 4,
            backgroundColor: '#cf222e',
          },
        ]}
        onPress={onDelete}>
        <Text style={rightActions.text}>Delete</Text>
      </RectButton>
    </Animated.View>
    <Animated.View
      style={{flex: 1, marginLeft: 4, transform: [{translateX: 0}]}}>
      <RectButton
        style={[
          rightActions.root,
          {borderRadius: 4, backgroundColor: '#2da44e'},
        ]}
        onPress={onEdit}>
        <Text style={rightActions.text}>Edit</Text>
      </RectButton>
    </Animated.View>
  </View>
);

const Row = ({id, title, handleClick, handleDelete, handleEdit}: IRowProps) => {
  const swipeableRef: any = useRef(null);

  const onDelete = () => {
    handleDelete(id);
    swipeableRef.current.close();
  };

  const onEdit = () => {
    handleEdit({id, title});
    swipeableRef.current.close();
  };

  return (
    <GestureHandlerRootView>
      <Swipeable
        ref={swipeableRef}
        rightThreshold={40}
        renderRightActions={() => (
          <RightActions onDelete={onDelete} onEdit={onEdit} />
        )}>
        <TouchableOpacity onPress={handleClick} style={styles.item}>
          <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
      </Swipeable>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 8,
    marginVertical: 4,
    marginHorizontal: 8,
    backgroundColor: '#f6f8fa',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#d0d7de',
    color: '#24292f',
  },
  title: {
    fontSize: 20,
  },
});

export default Row;
