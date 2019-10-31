import React from 'react';
import {SafeAreaView, Text, FlatList} from 'react-native';
import {
  Appbar,
  DarkTheme,
  List,
  Avatar,
  ActivityIndicator,
} from 'react-native-paper';

import {CHARACTER} from './queries/CharactersQuery';
import {useQuery} from '@apollo/react-hooks';
import {
  CharactersQuery,
  CharactersQuery_characters_results,
} from './__generated/apollogen-types';

const CharacterItem = (props: {
  character: CharactersQuery_characters_results | null;
}) => {
  const {character} = props;
  const key = (character && character.id) || '';
  const title = (character && character.name) || '';
  const status = (character && character.status) || '';
  const uri = (character && character.image) || undefined;
  return (
    <List.Item
      key={key}
      style={{paddingHorizontal: 16}}
      title={title}
      left={() => <Avatar.Image size={44} source={{uri}} />}
      description={`Status: ${status}`}
    />
  );
};

const MainScreen = () => {
  const {loading, error, data} = useQuery<CharactersQuery>(CHARACTER);
  if (error || (!loading && !data)) {
    console.warn('Needs Error Handling');
  }
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: DarkTheme.colors.background}}>
      <Appbar.Header>
        <Appbar.Content title="Rickipedia" subtitle="and some Morty stuff." />
        <Appbar.Action
          icon="magnify"
          onPress={() => console.warn('Coming Soon')}
        />
      </Appbar.Header>
      {data && data.characters && data.characters.results ? (
        <FlatList
          data={data.characters.results}
          renderItem={({item}) => <CharacterItem character={item} />}
        />
      ) : (
        <ActivityIndicator />
      )}
    </SafeAreaView>
  );
};

export {MainScreen};
