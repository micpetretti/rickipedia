import React from 'react';
import renderer from 'react-test-renderer';
import {MockedProvider} from '@apollo/react-testing';
import {CHARACTERS_QUERY} from '../src/queries/CharactersQuery';
import {MainScreen, CharactersList, CharacterItem} from '../src/MainScreen';
import {
  CharactersQuery_characters_results,
  CharactersQuery_characters,
} from '../src/__generated/apollogen-types';
import {render, waitForElement} from 'react-native-testing-library';

const nullResult: CharactersQuery_characters_results = {
  __typename: 'Character',
  id: '1',
  name: null,
  image: null,
  status: null,
};

const resultRick: CharactersQuery_characters_results = {
  __typename: 'Character',
  id: '1',
  name: 'Rick Sanchez',
  image: 'https:/bla.png',
  status: 'Alive',
};

const resultMorty: CharactersQuery_characters_results = {
  __typename: 'Character',
  id: '2',
  name: 'Morty Smith',
  image: null,
  status: 'Alive',
};

const charactersResults = [resultRick, resultMorty];

const characters: CharactersQuery_characters = {
  __typename: 'Characters',
  info: {
    __typename: 'Info',
    next: 2,
  },
  results: charactersResults,
};

const mocks = [
  {
    request: {
      query: CHARACTERS_QUERY,
      variables: {},
    },
    result: {
      data: {
        characters,
      },
    },
  },
];

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
    <CharactersList charactersResults={charactersResults} />,
  );
  expect(rendering.getAllByTestId('CharacterItem').length).toBe(2);
});

it('renders CharactersList correctly for empty data', () => {
  const rendering = render(<CharactersList charactersResults={null} />);
  expect(rendering.queryByTestId('CharacterItem')).toBeNull();
});

it('passes the correct data to CharactersList', async () => {
  const rendering = render(
    <MockedProvider mocks={mocks}>
      <MainScreen />
    </MockedProvider>,
  );
  const characterList = await waitForElement(() =>
    rendering.getByTestId('CharactersList'),
  );
  expect(characterList.props.data).toStrictEqual(charactersResults);
});

it('renders the MainScreen with the query hook without error', () => {
  renderer.create(
    <MockedProvider mocks={mocks}>
      <MainScreen />
    </MockedProvider>,
  );
});
