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

const rightActions = StyleSheet.create({
  root: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontWeight: '600',
    paddingLeft: 8,
  },
});

const dialog = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#dadde17a',
  },
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

const row = StyleSheet.create({
  header: {
    padding: 8,
    flexDirection: 'row',
    backgroundColor: '#ddf4ff',
    borderWidth: 1,
    borderColor: '#54aeff66',
  },
  headerText: {
    fontSize: 16,
    fontWeight: '500',
  },
  root: {
    flex: 1,
    alignItems: 'flex-end',
  },
  section: {
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
});

const cashbookRow = StyleSheet.create({
  root: {
    flex: 1,
    padding: 8,
    paddingLeft: 24,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  credit: {
    color: '#2da44e',
  },
  debit: {
    color: '#cf222e',
  },
});

const navigationButton = StyleSheet.create({
  root: {
    fontSize: 20,
    fontWeight: '800',
    width: 30,
    textAlign: 'center',
  },
});

const rippleButton = {
  color: '#858a96a1',
  borderless: false,
  foreground: true,
};

export {
  button,
  input,
  header,
  actions,
  dialog,
  row,
  cashbookRow,
  rightActions,
  navigationButton,
  rippleButton,
};
