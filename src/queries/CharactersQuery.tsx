import {QueryHookOptions, useQuery} from '@apollo/react-hooks';
import {gql} from 'apollo-boost';
import {
  CharactersQuery,
  CharactersQueryVariables,
} from '../__generated/apollogen-types';

export const CHARACTERS_QUERY = gql`
  query CharactersQuery($page: Int) {
    characters(page: $page) {
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

export const fetchMoreCharactersUpdateQuery = (
  previousResult: CharactersQuery,
  fetchMore: {fetchMoreResult?: CharactersQuery},
) => {
  const fetchMoreResult = fetchMore.fetchMoreResult;
  if (
    !fetchMoreResult ||
    !previousResult.characters ||
    !fetchMoreResult.characters ||
    !previousResult.characters.results ||
    !fetchMoreResult.characters.results
  ) {
    return previousResult;
  }
  const results = [
    ...previousResult.characters.results,
    ...fetchMoreResult.characters.results,
  ];
  return {
    characters: {
      __typename: 'Characters',
      info: fetchMoreResult.characters.info,
      results,
    },
  };
};

const useCharactersQuery = (variables?: CharactersQueryVariables) => {
  return useQuery<CharactersQuery, CharactersQueryVariables>(CHARACTERS_QUERY);
};
export {useCharactersQuery};
