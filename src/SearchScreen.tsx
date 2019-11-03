import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';
import {Appbar, Searchbar, useTheme} from 'react-native-paper';
import idx from 'idx';

import {useCharactersQuery} from './queries/CharactersQuery';
import {ErrorScreen} from './ErrorScreen';
import {CharactersList} from './MainScreen';
import {NavigationStackProp} from 'react-navigation-stack';

export const SearchScreen = (props: {navigation: NavigationStackProp}) => {
  const paperTheme = useTheme();
  const [searchText, setSearchText] = useState('');
  const {
    loading: charactersLoading,
    data: charactersData,
    error,
    refetch,
  } = useCharactersQuery({
    variables: {filter: {name: searchText}},
    skip: searchText === '',
  });
  const charactersResult =
    idx(charactersData, _ => _.characters.results) || undefined;

  if (error || (!charactersLoading && !charactersData && searchText !== '')) {
    return <ErrorScreen refetch={refetch} />;
  }
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: paperTheme.colors.background}}>
      <Appbar.Header>
        <Appbar.BackAction
          testID={'SearchScreenBackButton'}
          onPress={() => {
            props.navigation.goBack();
          }}
        />
        <Appbar.Content title="Search by name" />
      </Appbar.Header>
      <Searchbar
        testID={'SearchScreenSearchbar'}
        style={{margin: 8}}
        value={searchText}
        onChangeText={text => {
          setSearchText(text.trim());
        }}
      />
      <CharactersList
        charactersResults={charactersResult}
        onEndReached={() => undefined}
        loading={charactersLoading}
        navigation={props.navigation}
      />
    </SafeAreaView>
  );
};
