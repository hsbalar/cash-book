import React from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {store} from './states/store';
import Cashbooks from './modules/Cashbooks';
import Cashbook from './modules/Cashbook';
import AddRowButton from './modules/Cashbook/AddRowButton';
import AddCashbookButton from './modules/Cashbooks/AddCashbookButton';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Cashbooks}
            options={{
              title: 'My Cashbook',
              headerRight: () => <AddCashbookButton />,
            }}
          />
          <Stack.Screen
            name="Edit"
            component={Cashbook}
            options={({route}: any) => ({
              title: route.params.title,
              headerRight: () => <AddRowButton />,
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
