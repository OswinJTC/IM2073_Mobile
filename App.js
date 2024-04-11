// App.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './screen/WelcomeScreen';
import EMcqScreens from './screen/EMcqScreens';
import MMcqScreens from './screen/MMcqScreens';
import HMcqScreens from './screen/HMcqScreens';
import LevelScreen from './screen/LevelScreen';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Level" component={LevelScreen} options={{ title: 'Choose Difficulty' }} />
        <Stack.Screen name="EMcq" component={EMcqScreens} options={{ title: 'Quiz (Easy)' }} />
        <Stack.Screen name="MMcq" component={MMcqScreens} options={{ title: 'Quiz (Medium)' }} />
        <Stack.Screen name="HMcq" component={HMcqScreens} options={{ title: 'Quiz (Hard)' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
