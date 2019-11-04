import React from 'react';
import {MockedProvider} from '@apollo/react-testing';
import {CharacterScreen} from '../src/CharacterScreen';
import {render, fireEvent, waitForElement} from 'react-native-testing-library';
import {
  fullCharacterDetailProviderMock,
  episodesMock,
  locationMock,
  originMock,
} from '../mocks/CharacterDetailQueryMock';

const getNavigationMock = () => ({goBack: jest.fn(), getParam: () => 2});

it('navigates back with the header button', async () => {
  const navigationMock = getNavigationMock();
  const rendering = render(
    <MockedProvider mocks={fullCharacterDetailProviderMock}>
      <CharacterScreen navigation={navigationMock as any} />
    </MockedProvider>,
  );
  const backButton = rendering.getByTestId('CharacterScreenBackButton');
  fireEvent.press(backButton);
  expect(navigationMock.goBack).toBeCalled();
});

it('passes the correct data to the Cards', async () => {
  const navigationMock = getNavigationMock();
  const rendering = render(
    <MockedProvider mocks={fullCharacterDetailProviderMock} addTypename={true}>
      <CharacterScreen navigation={navigationMock as any} />
    </MockedProvider>,
  );

  const profileCard = await waitForElement(() =>
    rendering.getByTestId('ProfileCard'),
  );
  const episodesCard = await waitForElement(() =>
    rendering.getByTestId('EpisodesCard'),
  );
  const locationOriginCard = await waitForElement(() =>
    rendering.getByTestId('OriginLocationCard'),
  );
  expect(profileCard.props).toStrictEqual({
    gender: 'Male',
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
    species: 'Human',
    testID: 'ProfileCard',
    type: undefined,
  });
  expect(episodesCard.props.episodes).toStrictEqual(episodesMock);
  expect(locationOriginCard.props.origin).toStrictEqual(originMock);
  expect(locationOriginCard.props.location).toStrictEqual(locationMock);
});

it('Renders the error screen when querying for non existing Id', async () => {
  const navigationMock = getNavigationMock();
  navigationMock.getParam = () => 999;
  const rendering = render(
    <MockedProvider mocks={fullCharacterDetailProviderMock}>
      <CharacterScreen navigation={navigationMock as any} />
    </MockedProvider>,
  );

  await waitForElement(() => rendering.getByTestId('ErrorScreen'));
});
