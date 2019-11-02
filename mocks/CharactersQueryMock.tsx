import {CHARACTERS_QUERY} from '../src/queries/CharactersQuery';
import {
  CharactersQuery_characters_results,
  CharactersQuery_characters_info,
  CharactersQuery,
} from '../src/__generated/apollogen-types';

export const nullResult: CharactersQuery_characters_results = {
  __typename: 'Character',
  id: '1',
  name: null,
  image: null,
  status: null,
};

export const resultRick: CharactersQuery_characters_results = {
  __typename: 'Character',
  id: '1',
  name: 'Rick Sanchez',
  image: 'https:/bla.png',
  status: 'Alive',
};

export const resultMorty: CharactersQuery_characters_results = {
  __typename: 'Character',
  id: '2',
  name: 'Morty Smith',
  image: null,
  status: 'Alive',
};

const resultSummer: CharactersQuery_characters_results = {
  __typename: 'Character',
  id: '3',
  name: 'Summer Smith',
  image: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg',
  status: 'Alive',
};

const resultBeth: CharactersQuery_characters_results = {
  __typename: 'Character',
  id: '4',
  name: 'Beth Smith',
  image: 'https://rickandmortyapi.com/api/character/avatar/4.jpeg',
  status: 'Alive',
};

export const charactersResultPage1 = [resultRick, resultMorty];
export const charactersResultPage2 = [resultSummer, resultBeth];

const infoPage1: CharactersQuery_characters_info = {
  __typename: 'Info',
  next: 2,
};

export const infoPage2: CharactersQuery_characters_info = {
  __typename: 'Info',
  next: 3,
};

export const fullMockResponsePage1: CharactersQuery = {
  characters: {
    __typename: 'Characters',
    info: infoPage1,
    results: charactersResultPage1,
  },
};

export const fullMockResponsePage2: CharactersQuery = {
  characters: {
    __typename: 'Characters',
    info: infoPage2,
    results: charactersResultPage2,
  },
};

export const fullCharactersProviderMockPage1 = [
  {
    request: {
      query: CHARACTERS_QUERY,
      variables: {},
    },
    result: {
      data: fullMockResponsePage1,
    },
  },
];

export const fullCharactersProviderMockPage2 = [
  {
    request: {
      query: CHARACTERS_QUERY,
      variables: {page: 2},
    },
    result: {
      data: fullMockResponsePage2,
    },
  },
];
