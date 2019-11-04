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
import {
  CharacterDetailQuery_character_location,
  CharacterDetailQuery_character_origin,
  CharacterDetailQuery_character_episode,
} from './__generated/apollogen-types';

const CARD_MARGIN = 16;
const CARD_WIDTH = Dimensions.get('screen').width / 2 - 2 * CARD_MARGIN;
const styles = StyleSheet.create({
  card: {
    margin: CARD_MARGIN,
    width: CARD_WIDTH,
  },
});

interface ProfileCardProps {
  gender: string;
  species: string;
  image?: string;
  type?: string;
  testID?: string;
}
export const ProfileCard = (props: ProfileCardProps) => (
  <Card style={styles.card}>
    <Card.Cover source={{uri: props.image}}></Card.Cover>
    <Card.Content style={{paddingTop: 16}}>
      <Paragraph>{`Gender: ${props.gender}`}</Paragraph>
      <Paragraph>{`Species: ${props.species}`}</Paragraph>
      <Paragraph>{props.type && `Type: ${props.type}`}</Paragraph>
    </Card.Content>
  </Card>
);

interface OriginLocationCardProps {
  location: CharacterDetailQuery_character_location | undefined;
  origin: CharacterDetailQuery_character_origin | undefined;
  testID?: string;
}
const OriginLocationCard = (props: OriginLocationCardProps) => {
  const locationName = idx(props.location, _ => _.name) || 'unknown';
  const locationType = idx(props.location, _ => _.type) || 'unknown';
  const locationDimension = idx(props.location, _ => _.dimension) || 'unknown';
  const originName = idx(props.origin, _ => _.name) || 'unknown';
  const originType = idx(props.origin, _ => _.type) || 'unknown';
  const originDimension = idx(props.origin, _ => _.dimension) || 'unknown';
  return (
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
  );
};

interface EpisodesCardProps {
  episodes: (CharacterDetailQuery_character_episode)[];
  testID?: string;
}
const EpisodesCard = (props: EpisodesCardProps) => {
  return (
    <Card style={{margin: CARD_MARGIN}}>
      <Card.Content style={{paddingTop: 16}}>
        <Title>{'Episodes'}</Title>
        {props.episodes.map((episode, index) => {
          return (
            <Paragraph
              key={index}>{`${episode.episode}: ${episode.name}`}</Paragraph>
          );
        })}
      </Card.Content>
    </Card>
  );
};

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
  const status = idx(characterData, _ => _.character.status) || '';

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
        <Appbar.Content
          title={idx(characterData, _ => _.character.name) || ''}
          subtitle={`Status: ${status}`}
        />
      </Appbar.Header>
      <ScrollView style={{flex: 1}}>
        <View style={{flexDirection: 'row'}}>
          <ProfileCard
            testID={'ProfileCard'}
            gender={idx(characterData, _ => _.character.gender) || ''}
            type={idx(characterData, _ => _.character.type) || undefined}
            image={idx(characterData, _ => _.character.image) || undefined}
            species={idx(characterData, _ => _.character.species) || ''}
          />
          <OriginLocationCard
            testID={'OriginLocationCard'}
            location={
              idx(characterData, _ => _.character.location) || undefined
            }
            origin={idx(characterData, _ => _.character.origin) || undefined}
          />
        </View>
        <EpisodesCard
          testID={'EpisodesCard'}
          episodes={idx(characterData, _ => _.character.episode) || []}
        />
        {characterLoading && (
          <ActivityIndicator
            testID={'CharacterScreenActivityIndicator'}
            style={{paddingTop: 16}}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
