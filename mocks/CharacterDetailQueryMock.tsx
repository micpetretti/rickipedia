import {CHARACTER_DETAIL_QUERY} from '../src/queries/CharacterDetailQuery';

export const episodesMock = [
  {
    __typename: 'Episode',
    name: 'Pilot',
    episode: 'S01E01',
  },
  {
    __typename: 'Episode',
    name: 'Lawnmower Dog',
    episode: 'S01E02',
  },
  {
    __typename: 'Episode',
    name: 'Anatomy Park',
    episode: 'S01E03',
  },
];

export const locationMock = {
  __typename: 'Location',
  name: 'Earth (Replacement Dimension)',
  type: 'Planet',
  dimension: 'Replacement Dimension',
};

export const originMock = {
  __typename: 'Location',
  name: 'Earth (C-137)',
  type: 'Planet',
  dimension: 'Dimension C-137',
};

const mortyMock = {
  character: {
    __typename: 'Character',
    name: 'Morty Smith',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: originMock,
    location: locationMock,
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
    episode: episodesMock,
  },
};

export const fullCharacterDetailProviderMock = [
  {
    request: {
      query: CHARACTER_DETAIL_QUERY,
      variables: {id: 2},
    },
    result: {
      data: mortyMock,
    },
  },
];
