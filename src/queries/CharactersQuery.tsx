import {QueryHookOptions, useQuery} from '@apollo/react-hooks';
import {gql} from 'apollo-boost';
import {
  CharactersQuery,
  CharactersQueryVariables,
} from '../__generated/apollogen-types';

export const CHARACTERS_QUERY = gql`
  query CharactersQuery($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
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
      __typename: previousResult.characters.__typename,
      info: fetchMoreResult.characters.info,
      results,
    },
  };
};

const useCharactersQuery = (
  options?: QueryHookOptions<CharactersQuery, CharactersQueryVariables>,
) => {
  return useQuery<CharactersQuery, CharactersQueryVariables>(
    CHARACTERS_QUERY,
    options,
  );
};
export {useCharactersQuery};
