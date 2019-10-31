import {gql} from 'apollo-boost';

export const CHARACTER = gql`
  {
    characters {
      info {
        next
      }
      results {
        name
        image
        status
      }
    }
  }
`;
