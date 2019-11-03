import {QueryHookOptions, useQuery} from '@apollo/react-hooks';
import {gql} from 'apollo-boost';
import {
  CharacterDetailQuery,
  CharacterDetailQueryVariables,
} from '../__generated/apollogen-types';

export const CHARACTER_DETAIL_QUERY = gql`
  query CharacterDetailQuery($id: ID) {
    character(id: $id) {
      name
      status
      species
      type
      gender
      origin {
        name
        type
        dimension
        created
      }
      location {
        name
        type
        dimension
        created
      }
      image
      episode {
        name
        episode
      }
      created
    }
  }
`;

const useCharacterDetailQuery = (
  options?: QueryHookOptions<
    CharacterDetailQuery,
    CharacterDetailQueryVariables
  >,
) => {
  return useQuery<CharacterDetailQuery, CharacterDetailQueryVariables>(
    CHARACTER_DETAIL_QUERY,
    options,
  );
};
export {useCharacterDetailQuery};
