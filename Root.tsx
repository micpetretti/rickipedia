import React from 'react';
import {Provider as PaperProvider, DarkTheme} from 'react-native-paper';
import {ApolloProvider} from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

const API_BASE = 'https://rickandmortyapi.com/graphql/';
const client = new ApolloClient({uri: API_BASE});

import {MainScreen} from './src/MainScreen';

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <PaperProvider theme={DarkTheme}>
        <MainScreen />
      </PaperProvider>
    </ApolloProvider>
  );
};

export default Root;
