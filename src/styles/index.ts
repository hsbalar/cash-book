import {StyleSheet} from 'react-native';

const button = StyleSheet.create({
  root: {
    padding: 8,
    elevation: 2,
  },
  close: {
    backgroundColor: '#f6f8fa',
    borderColor: '#1b1f2426',
    borderWidth: 1,
    borderRadius: 4,
    marginRight: 12,
  },
  save: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#2da44e',
    backgroundColor: '#2da44e',
  },
  saveText: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
  text: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const input = StyleSheet.create({
  root: {
    borderRadius: 4,
    height: 40,
    borderWidth: 1,
    padding: 8,
    borderColor: '#d0d7de',
  },
});

const header = StyleSheet.create({
  root: {
    fontSize: 18,
    paddingBottom: 16,
    fontWeight: '500',
  },
});

const actions = StyleSheet.create({
  root: {
    paddingTop: 16,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

const dialog = StyleSheet.create({
  root: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 3,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export {button, input, header, actions, dialog};
