import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import App from '../src/App';

describe('App', () => {
  it('Render the App correctly', async () => {
    const {getByTestId, queryByTestId} = render(<App />);
    const appBar = getByTestId('app-bar');
    const formElement = queryByTestId('credit-card-form');
    expect(appBar).toBeDefined();
    expect(formElement).toBeDefined();
  });
});