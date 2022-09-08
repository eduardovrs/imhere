import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Events from './src/pages/Events';
import Participants from './src/pages/Participants';
import {StatusBar} from 'react-native';

const Stack = createNativeStackNavigator();

export const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle={'light-content'} backgroundColor={'#000000'} />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Events" component={Events} />
        <Stack.Screen name="Participants" component={Participants} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
