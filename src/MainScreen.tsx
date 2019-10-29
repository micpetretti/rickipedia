import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {Appbar, DarkTheme, List, Avatar} from 'react-native-paper';

const data = [
  {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: {
      name: 'Earth (C-137)',
      url: 'https://rickandmortyapi.com/api/location/1',
    },
    location: {
      name: 'Earth (Replacement Dimension)',
      url: 'https://rickandmortyapi.com/api/location/20',
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    episode: ['https://rickandmortyapi.com/api/episode/1'],
    url: 'https://rickandmortyapi.com/api/character/1',
    created: '2017-11-04T18:48:46.250Z',
  },
  {
    id: 2,
    name: 'Morty Smith',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: {
      name: 'Earth (C-137)',
      url: 'https://rickandmortyapi.com/api/location/1',
    },
    location: {
      name: 'Earth (Replacement Dimension)',
      url: 'https://rickandmortyapi.com/api/location/20',
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
    episode: ['https://rickandmortyapi.com/api/episode/1'],
    url: 'https://rickandmortyapi.com/api/character/2',
    created: '2017-11-04T18:50:21.651Z',
  },
];

const MainScreen = () => (
  <SafeAreaView style={{flex: 1, backgroundColor: DarkTheme.colors.background}}>
    <Appbar.Header>
      <Appbar.Content title="Rickipedia" subtitle="The Original" />
      <Appbar.Action
        icon="magnify"
        onPress={() => console.warn('Coming Soon')}
      />
    </Appbar.Header>
    {data.map(entry => (
      <List.Item
        title={entry.name}
        left={() => <Avatar.Image size={44} source={{uri: entry.image}} />}
        description={`Status: ${entry.status}`}
      />
    ))}
  </SafeAreaView>
);

export {MainScreen};
