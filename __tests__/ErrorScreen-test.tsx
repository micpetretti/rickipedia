import React from 'react';
import {render, fireEvent} from 'react-native-testing-library';
import {ErrorScreen} from '../src/ErrorScreen';

it('calls refetch when pressing the retry button ', () => {
  const refetch = jest.fn();
  const rendering = render(<ErrorScreen refetch={refetch} />);
  const retryButton = rendering.getByTestId('ErrorScreenButton');
  fireEvent.press(retryButton);
  expect(refetch).toBeCalled();
});
