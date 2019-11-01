import {QueryHookOptions, useQuery} from '@apollo/react-hooks';
import {gql} from 'apollo-boost';
import {CharactersQuery} from '../__generated/apollogen-types';

export const CHARACTERS_QUERY = gql`
  query CharactersQuery {
    characters {
      info {
        next
      }
      results {
        id
        name
        image
        status
      }
    }
  }
`;

const useCharactersQuery = () => {
  return useQuery<CharactersQuery>(CHARACTERS_QUERY);
};
export {useCharactersQuery};
