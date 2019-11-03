import React from 'react';
import {MockedProvider} from '@apollo/react-testing';
import {CharacterScreen} from '../src/CharacterScreen';
import {render, fireEvent} from 'react-native-testing-library';
import {fullCharactersProviderMockPage1} from '../mocks/CharactersQueryMock';

it('navigates back with the header button', async () => {
  const navigationMock = {goBack: jest.fn(), getParam: () => 1};
  const rendering = render(
    <MockedProvider mocks={fullCharactersProviderMockPage1}>
      <CharacterScreen navigation={navigationMock as any} />
    </MockedProvider>,
  );
  const backButton = rendering.getByTestId('CharacterScreenBackButton');
  fireEvent.press(backButton);
  expect(navigationMock.goBack).toBeCalled();
});
