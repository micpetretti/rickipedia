import React from 'react';
import {
  SafeAreaView,
  View,
  Dimensions,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {
  Appbar,
  useTheme,
  Card,
  Paragraph,
  Title,
  ActivityIndicator,
} from 'react-native-paper';
import idx from 'idx';

import {ErrorScreen} from './ErrorScreen';
import {NavigationStackProp} from 'react-navigation-stack';
import {useCharacterDetailQuery} from './queries/CharacterDetailQuery';

const CARD_MARGIN = 16;
const CARD_WIDTH = Dimensions.get('screen').width / 2 - 2 * CARD_MARGIN;
const styles = StyleSheet.create({
  card: {
    margin: CARD_MARGIN,
    width: CARD_WIDTH,
  },
});

export const CharacterScreen = (props: {navigation: NavigationStackProp}) => {
  const paperTheme = useTheme();
  const characterId = props.navigation.getParam('id');

  const {
    loading: characterLoading,
    data: characterData,
    error,
    refetch,
  } = useCharacterDetailQuery({
    variables: {id: characterId},
  });

  const name = idx(characterData, _ => _.character.name) || '';
  const status = idx(characterData, _ => _.character.status) || '';
  const image = idx(characterData, _ => _.character.image) || undefined;
  const gender = idx(characterData, _ => _.character.gender) || '';
  const species = idx(characterData, _ => _.character.species) || '';
  const type = idx(characterData, _ => _.character.type) || undefined;
  const locationName =
    idx(characterData, _ => _.character.location.name) || 'unknown';
  const locationType =
    idx(characterData, _ => _.character.location.type) || 'unknown';
  const locationDimension =
    idx(characterData, _ => _.character.location.dimension) || 'unknown';
  const originName =
    idx(characterData, _ => _.character.origin.name) || 'unknown';
  const originType =
    idx(characterData, _ => _.character.origin.type) || 'unknown';
  const originDimension =
    idx(characterData, _ => _.character.origin.dimension) || 'unknown';
  const episode = idx(characterData, _ => _.character.episode) || [];

  if (error || (!characterLoading && !characterData)) {
    return <ErrorScreen refetch={refetch} />;
  }
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: paperTheme.colors.background}}>
      <Appbar.Header>
        <Appbar.BackAction
          testID={'CharacterScreenBackButton'}
          onPress={() => {
            props.navigation.goBack();
          }}
        />
        <Appbar.Content title={name} subtitle={`Status: ${status}`} />
      </Appbar.Header>
      <ScrollView style={{flex: 1}}>
        <View style={{flexDirection: 'row'}}>
          <Card style={styles.card}>
            <Card.Cover source={{uri: image}}></Card.Cover>
            <Card.Content style={{paddingTop: 16}}>
              <Paragraph>{`Gender: ${gender}`}</Paragraph>
              <Paragraph>{`Species: ${species}`}</Paragraph>
              <Paragraph>{type && `Type: ${type}`}</Paragraph>
            </Card.Content>
          </Card>
          <Card style={styles.card}>
            <Card.Content style={{paddingTop: 16}}>
              <Title>{'Origin:'}</Title>
              <Paragraph>{`Name: ${originName}`}</Paragraph>
              <Paragraph>{`Type: ${originType}`}</Paragraph>
              <Paragraph>{`Dimension: ${originDimension}`}</Paragraph>
            </Card.Content>
            <Card.Content style={{paddingTop: 16}}>
              <Title>{'Location:'}</Title>
              <Paragraph>{`Name: ${locationName}`}</Paragraph>
              <Paragraph>{`Type: ${locationType}`}</Paragraph>
              <Paragraph>{`Dimension: ${locationDimension}`}</Paragraph>
            </Card.Content>
          </Card>
        </View>
        <Card
          style={{
            margin: CARD_MARGIN,
          }}>
          <Card.Content style={{paddingTop: 16}}>
            <Title>{'Episodes'}</Title>
            {episode.map(episode => {
              return (
                <Paragraph>{`${episode.episode}: ${episode.name}`}</Paragraph>
              );
            })}
          </Card.Content>
        </Card>
        {characterLoading && <ActivityIndicator style={{paddingTop: 16}} />}
      </ScrollView>
    </SafeAreaView>
  );
};
