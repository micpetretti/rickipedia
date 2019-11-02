import React from 'react';
import {SafeAreaView, FlatList} from 'react-native';
import {
  Appbar,
  DarkTheme,
  List,
  Avatar,
  ActivityIndicator,
} from 'react-native-paper';
import idx from 'idx';

import {
  useCharactersQuery,
  CHARACTERS_QUERY,
  fetchMoreCharactersUpdateQuery,
} from './queries/CharactersQuery';
import {
  CharactersQuery_characters_results,
  CharactersQuery_characters_info,
} from './__generated/apollogen-types';

export const CharacterItem = (props: {
  character: CharactersQuery_characters_results | null;
}) => {
  const {character} = props;
  const key = (character && character.id) || '';
  const title = (character && character.name) || '';
  const status = (character && character.status) || '';
  const uri = (character && character.image) || undefined;
  return (
    <List.Item
      testID={'CharacterItem'}
      key={key}
      style={{paddingHorizontal: 16}}
      title={title}
      left={() => <Avatar.Image size={44} source={{uri}} />}
      description={`Status: ${status}`}
    />
  );
};

export const CharactersList = (props: {
  charactersResults: (CharactersQuery_characters_results | null)[] | null;
  onEndReached: () => undefined;
}) => {
  if (props.charactersResults) {
    return (
      <FlatList
        testID={'CharactersList'}
        data={props.charactersResults}
        renderItem={({item}) => <CharacterItem character={item} />}
        onEndReached={props.onEndReached}
      />
    );
  } else {
    return <ActivityIndicator testID={'CharactersListActivityIndicator'} />;
  }
};

export const MainScreen = () => {
  const {
    loading,
    error,
    data: charactersData,
    fetchMore,
  } = useCharactersQuery();
  if (error || (!loading && !charactersData)) {
    console.warn('Needs Error Handling');
  }
  const charactersInfo = idx(charactersData, _ => _.characters.info);
  const charactersResult = idx(charactersData, _ => _.characters.results);
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
      <CharactersList
        charactersResults={charactersResult}
        onEndReached={() => {
          if (charactersInfo && charactersInfo.next) {
            fetchMore({
              query: CHARACTERS_QUERY,
              updateQuery: fetchMoreCharactersUpdateQuery,
              variables: {page: charactersInfo.next},
            });
          }
        }}
      />
    </SafeAreaView>
  );
};
