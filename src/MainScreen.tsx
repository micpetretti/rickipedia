import React, {useMemo} from 'react';
import {SafeAreaView, FlatList, Keyboard} from 'react-native';
import {
  Appbar,
  List,
  Avatar,
  ActivityIndicator,
  useTheme,
  IconButton,
} from 'react-native-paper';
import idx from 'idx';
import {NavigationStackProp} from 'react-navigation-stack';

import {
  useCharactersQuery,
  CHARACTERS_QUERY,
  fetchMoreCharactersUpdateQuery,
} from './queries/CharactersQuery';
import {CharactersQuery_characters_results} from './__generated/apollogen-types';
import {ErrorScreen} from './ErrorScreen';

export const CharacterItem = (props: {
  character: CharactersQuery_characters_results | null;
  navigation: NavigationStackProp;
}) => {
  const {character} = props;
  const id = (character && character.id) || '';
  const title = (character && character.name) || '';
  const status = (character && character.status) || '';
  const uri = (character && character.image) || undefined;
  return (
    <List.Item
      testID={'CharacterItem'}
      key={id}
      style={{paddingHorizontal: 16}}
      title={title}
      left={() => <Avatar.Image size={44} source={{uri}} />}
      right={() => <IconButton icon={'chevron-right'} />}
      description={`Status: ${status}`}
      onPress={() => {
        props.navigation.navigate('CharacterScreen', {id});
      }}
    />
  );
};

export const CharactersList = (props: {
  charactersResults: (CharactersQuery_characters_results | null)[] | undefined;
  onEndReached: () => void;
  loading: boolean;
  navigation: NavigationStackProp;
}) => {
  if (props.charactersResults) {
    return (
      <FlatList
        onScrollBeginDrag={Keyboard.dismiss}
        testID={'CharactersList'}
        data={props.charactersResults}
        renderItem={({item}) => (
          <CharacterItem character={item} navigation={props.navigation} />
        )}
        onEndReached={props.onEndReached}
      />
    );
  }
  if (props.loading) {
    return <ActivityIndicator testID={'CharactersListActivityIndicator'} />;
  } else {
    return null;
  }
};

export const MainScreen = (props: {navigation: NavigationStackProp}) => {
  const paperTheme = useTheme();
  const {
    loading: charactersLoading,
    error,
    data: charactersData,
    fetchMore,
    refetch,
  } = useCharactersQuery();
  const charactersInfoNext = idx(charactersData, _ => _.characters.info.next);
  const charactersResult =
    idx(charactersData, _ => _.characters.results) || undefined;

  const fetchMoreMemoized = useMemo(() => {
    if (!charactersLoading && charactersInfoNext) {
      fetchMore({
        query: CHARACTERS_QUERY,
        updateQuery: fetchMoreCharactersUpdateQuery,
        variables: {page: charactersInfoNext},
      });
    }
  }, [charactersInfoNext]);

  if (error || (!charactersLoading && !charactersData)) {
    return <ErrorScreen refetch={refetch} />;
  }
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: paperTheme.colors.background}}>
      <Appbar.Header>
        <Appbar.Content title="Rickipedia" subtitle="and some Morty stuff." />
        <Appbar.Action
          testID={'MainScreenHeaderSearchIcon'}
          icon="magnify"
          onPress={() => {
            props.navigation.navigate('SearchScreen');
          }}
        />
      </Appbar.Header>
      <CharactersList
        charactersResults={charactersResult}
        onEndReached={() => fetchMoreMemoized}
        loading={!charactersData}
        navigation={props.navigation}
      />
    </SafeAreaView>
  );
};
