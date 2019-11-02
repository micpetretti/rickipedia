import {fetchMoreCharactersUpdateQuery} from '../src/queries/CharactersQuery';
import {
  fullMockResponsePage1,
  fullMockResponsePage2,
  charactersResultPage1,
  charactersResultPage2,
  infoPage2,
} from '../mocks/CharactersQueryMock';

const expectedMergeResult = {
  characters: {
    __typename: 'Characters',
    info: infoPage2,
    results: [...charactersResultPage1, ...charactersResultPage2],
  },
};

it('merges old and new results correctly', async () => {
  const merged = await fetchMoreCharactersUpdateQuery(fullMockResponsePage1, {
    fetchMoreResult: fullMockResponsePage2,
  });
  expect(merged).toStrictEqual(expectedMergeResult);
});
