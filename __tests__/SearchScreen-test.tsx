import React from 'react';
import {MockedProvider} from '@apollo/react-testing';
import {SearchScreen} from '../src/SearchScreen';
import {render, waitForElement, fireEvent} from 'react-native-testing-library';
import {
  resultRick,
  fullCharactersProviderMockPage1,
  fullCharactersProviderMockSearch,
} from '../mocks/CharactersQueryMock';

it('navigates back with the header button', async () => {
  const navigationMock = {goBack: jest.fn()};
  const rendering = render(
    <MockedProvider mocks={fullCharactersProviderMockPage1}>
      <SearchScreen navigation={navigationMock as any} />
    </MockedProvider>,
  );
  const backButton = rendering.getByTestId('SearchScreenBackButton');
  fireEvent.press(backButton);
  expect(navigationMock.goBack).toBeCalled();
});

it('passes the correct data to CharactersList after Searching', async () => {
  const rendering = render(
    <MockedProvider mocks={fullCharactersProviderMockSearch}>
      <SearchScreen navigation={jest.fn() as any} />
    </MockedProvider>,
  );

  const searchBar = rendering.getByTestId('SearchScreenSearchbar');
  fireEvent.changeText(searchBar, 'Rick');

  const characterList = await waitForElement(() =>
    rendering.getByTestId('CharactersList'),
  );
  expect(characterList.props.data).toStrictEqual([resultRick]);
});
