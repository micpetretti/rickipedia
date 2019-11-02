import React from 'react';
import renderer from 'react-test-renderer';
import {MockedProvider} from '@apollo/react-testing';
import {MainScreen, CharactersList, CharacterItem} from '../src/MainScreen';
import {render, waitForElement} from 'react-native-testing-library';
import {
  resultRick,
  nullResult,
  charactersResultPage1,
  fullCharactersProviderMockPage1,
} from '../mocks/CharactersQueryMock';

it('renders CharacterItem with correct Rick data', () => {
  const rendering = render(<CharacterItem character={resultRick} />);
  const characterItem = rendering.getByTestId('CharacterItem');
  expect(characterItem.props.title).toBe('Rick Sanchez');
  expect(characterItem.props.description).toBe('Status: Alive');
});

it('renders one CharacterItem with correct defaults for null data', () => {
  const rendering = render(<CharacterItem character={nullResult} />);
  const characterItem = rendering.getByTestId('CharacterItem');
  expect(characterItem.props.title).toBe('');
  expect(characterItem.props.description).toBe('Status: ');
});

it('renders CharactersList correctly with 2 items', () => {
  const rendering = render(
    <CharactersList
      charactersResults={charactersResultPage1}
      onEndReached={jest.fn()}
    />,
  );
  expect(rendering.getAllByTestId('CharacterItem').length).toBe(2);
});

it('renders CharactersList correctly for empty data', () => {
  const rendering = render(
    <CharactersList charactersResults={null} onEndReached={jest.fn()} />,
  );
  expect(rendering.queryByTestId('CharacterItem')).toBeNull();
});

it('passes the correct data to CharactersList', async () => {
  const rendering = render(
    <MockedProvider mocks={fullCharactersProviderMockPage1}>
      <MainScreen />
    </MockedProvider>,
  );
  const characterList = await waitForElement(() =>
    rendering.getByTestId('CharactersList'),
  );
  expect(characterList.props.data).toStrictEqual(charactersResultPage1);
});

it('renders the MainScreen with the query hook without error', () => {
  renderer.create(
    <MockedProvider mocks={fullCharactersProviderMockPage1}>
      <MainScreen />
    </MockedProvider>,
  );
});
