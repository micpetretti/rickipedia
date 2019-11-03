import React from 'react';
import {MockedProvider} from '@apollo/react-testing';
import {MainScreen, CharactersList, CharacterItem} from '../src/MainScreen';
import {render, waitForElement, fireEvent} from 'react-native-testing-library';
import {
  resultRick,
  nullResult,
  charactersResultPage1,
  fullCharactersProviderMockPage1,
} from '../mocks/CharactersQueryMock';

it('renders CharacterItem with correct Rick data', () => {
  const rendering = render(
    <CharacterItem character={resultRick} navigation={jest.fn() as any} />,
  );
  const characterItem = rendering.getByTestId('CharacterItem');
  expect(characterItem.props.title).toBe('Rick Sanchez');
  expect(characterItem.props.description).toBe('Status: Alive');
});

it('calls navigate with correct screen key and Rick id', () => {
  const navigationMock = {navigate: jest.fn()};
  const rendering = render(
    <CharacterItem character={resultRick} navigation={navigationMock as any} />,
  );
  const characterItem = rendering.getByTestId('CharacterItem');
  fireEvent.press(characterItem);
  expect(navigationMock.navigate).toBeCalledWith('CharacterScreen', {id: '1'});
});

it('renders one CharacterItem with correct defaults for null data', () => {
  const rendering = render(
    <CharacterItem character={nullResult} navigation={jest.fn() as any} />,
  );
  const characterItem = rendering.getByTestId('CharacterItem');
  expect(characterItem.props.title).toBe('');
  expect(characterItem.props.description).toBe('Status: ');
});

it('renders CharactersList correctly with 2 items', () => {
  const rendering = render(
    <CharactersList
      charactersResults={charactersResultPage1}
      onEndReached={jest.fn()}
      loading={false}
      navigation={jest.fn() as any}
    />,
  );
  expect(rendering.getAllByTestId('CharacterItem').length).toBe(2);
});

it('renders CharactersList correctly for empty data', () => {
  const rendering = render(
    <CharactersList
      charactersResults={undefined}
      onEndReached={jest.fn()}
      loading={false}
      navigation={jest.fn() as any}
    />,
  );
  expect(rendering.queryByTestId('CharacterItem')).toBeNull();
});

it('passes the correct data to CharactersList', async () => {
  const rendering = render(
    <MockedProvider mocks={fullCharactersProviderMockPage1}>
      <MainScreen navigation={jest.fn() as any} />
    </MockedProvider>,
  );
  const characterList = await waitForElement(() =>
    rendering.getByTestId('CharactersList'),
  );
  expect(characterList.props.data).toStrictEqual(charactersResultPage1);
});

it('navigates with the correct key', async () => {
  const navigationMock = {navigate: jest.fn()};
  const rendering = render(
    <MockedProvider mocks={fullCharactersProviderMockPage1}>
      <MainScreen navigation={navigationMock as any} />
    </MockedProvider>,
  );
  const searchIcon = rendering.getByTestId('MainScreenHeaderSearchIcon');
  fireEvent.press(searchIcon);
  expect(navigationMock.navigate).toBeCalledWith('SearchScreen');
});
