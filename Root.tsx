/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {Provider as PaperProvider, DarkTheme} from 'react-native-paper';

import {MainScreen} from './src/MainScreen';

const Root = () => {
  return (
    <PaperProvider theme={DarkTheme}>
      <MainScreen />
    </PaperProvider>
  );
};

export default Root;
