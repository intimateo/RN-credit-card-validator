import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react-native';
import Form from '../src/Components/CreditCardForm';

describe('Form', () => {
    beforeEach(() => {
        render(<Form />);
      });
    
    it('renders all necessary components', () => {
      expect(screen.getByTestId('card-number-input')).toBeDefined();
      expect(screen.getByTestId('card-expiration-date-input')).toBeDefined();
      expect(screen.getByTestId('card-cvv-code-input')).toBeDefined();
      expect(screen.getByTestId('submit-button')).toBeDefined();
      expect(screen.getByTestId('card-first-name-input')).toBeDefined();
      expect(screen.getByTestId('card-last-name-input')).toBeDefined();
    });
  
    it('updates input values on change', () => {
      const cardNumberInput = screen.getByTestId('card-number-input');
      const cardExpiryInput = screen.getByTestId('card-expiration-date-input');
      const cardCvcInput = screen.getByTestId('card-cvv-code-input');
      const cardFirstNameInput = screen.getByTestId('card-first-name-input');
      const cardLastNameInput = screen.getByTestId('card-last-name-input')
  
      fireEvent.changeText(cardNumberInput, '1234 5678 9012 3456');
      fireEvent.changeText(cardExpiryInput, '12/24');
      fireEvent.changeText(cardCvcInput, '123');
      fireEvent.changeText(cardFirstNameInput, 'John');
      fireEvent.changeText(cardLastNameInput, 'Doe');
  
      expect(cardNumberInput.props.value).toBe('1234 5678 9012 3456');
      expect(cardExpiryInput.props.value).toBe('12/24');
      expect(cardCvcInput.props.value).toBe('123');
      expect(cardFirstNameInput.props.value).toBe('John');
      expect(cardLastNameInput.props.value).toBe('Doe');
    });

    it('should validate credit card number after submitting the form', async () => {
        const cardNumberInput = screen.getByTestId('card-number-input');
        const submitButton = screen.getByTestId('submit-button');
    
        // Enter valid credit card number
        fireEvent.changeText(cardNumberInput, '4111111111111111');
    
        // Submit form
        fireEvent.press(submitButton);
    
        // Check if credit card number is valid
        await waitFor(() => { expect(screen.queryByTestId("error-card-number")).toBeFalsy()});

        // Enter a not valid credit card number and shows the error message
        fireEvent.changeText(cardNumberInput, '378282246310005');
        await waitFor(() => {expect(screen.queryByTestId("error-card-number")).toBeTruthy()},{timeout: 2000});

        // Enter a Visa card number
        fireEvent.changeText(cardNumberInput, '4242424242424242');
        await waitFor(() => {expect(screen.queryByTestId("error-card-number")).toBeFalsy()},{timeout: 2000});

        // Enter a Mastercard card number
        fireEvent.changeText(cardNumberInput, '5555555555554444');
        await waitFor(() => {expect(screen.queryByTestId("error-card-number")).toBeFalsy()},{timeout: 2000});

        // Enter a Amex card number
        fireEvent.changeText(cardNumberInput, '378282246310005');
        await waitFor(() => {expect(screen.queryByTestId("error-card-number")).toBeFalsy()},{timeout: 2000});

        // Enter a Discover card number
        fireEvent.changeText(cardNumberInput, '6011111111111117');
        await waitFor(() => {expect(screen.queryByTestId("error-card-number")).toBeFalsy()},{timeout: 2000});
      });

      it('should validate an expired date', async () => {
        const cardExpiryInput = screen.getByTestId('card-expiration-date-input');
        const submitButton = screen.getByTestId('submit-button');
        fireEvent.changeText(cardExpiryInput, '03/23');
        fireEvent.press(submitButton);
        await waitFor(() => {expect(screen.queryByTestId("error-expire-date")).toBeTruthy()},{timeout: 2000});
      })

      it('should validate a valid expiration date', async () => {
        const cardExpiryInput = screen.getByTestId('card-expiration-date-input');
        const submitButton = screen.getByTestId('submit-button');
        fireEvent.changeText(cardExpiryInput, '08/25');
        fireEvent.press(submitButton);
        await waitFor(() => {expect(screen.queryByTestId("error-expire-date")).toBeFalsy()},{timeout: 2000});
      })

      it('should validate only digits and respect the format MM/YY', async () => {
        const cardExpiryInput = screen.getByTestId('card-expiration-date-input');
        const submitButton = screen.getByTestId('submit-button');
        fireEvent.changeText(cardExpiryInput, 'abc/25');
        fireEvent.press(submitButton);
        await waitFor(() => {expect(screen.queryByTestId("error-expire-date")).toBeTruthy()},{timeout: 2000});
      })

      it('should validate the CVV code could be 3 or 4 digits', async () => {
        const cardCvcInput = screen.getByTestId('card-cvv-code-input');
        const submitButton = screen.getByTestId('submit-button');
        fireEvent.changeText(cardCvcInput, 'abc');
        fireEvent.press(submitButton);
        await waitFor(() => {expect(screen.queryByTestId("error-cvv-code")).toBeTruthy()},{timeout: 2000});
        fireEvent.changeText(cardCvcInput, '3452');
        fireEvent.press(submitButton);
        await waitFor(() => {expect(screen.queryByTestId("error-cvv-code")).toBeFalsy()},{timeout: 2000});
      })

      it('Test submit the form with sucess', async () => {
        const cardNumberInput = screen.getByTestId('card-number-input');
        const cardExpiryInput = screen.getByTestId('card-expiration-date-input');
        const cardCvcInput = screen.getByTestId('card-cvv-code-input');
        const cardFirstNameInput = screen.getByTestId('card-first-name-input');
        const cardLastNameInput = screen.getByTestId('card-last-name-input');
        const submitButton = screen.getByTestId('submit-button');

    
        fireEvent.changeText(cardNumberInput, '1234 5678 9012 3456');
        fireEvent.changeText(cardExpiryInput, '12/24');
        fireEvent.changeText(cardCvcInput, '123');
        fireEvent.changeText(cardFirstNameInput, 'John');
        fireEvent.changeText(cardLastNameInput, 'Doe');
        fireEvent.press(submitButton);
        await waitFor(() => {
        expect(screen.queryByTestId("error-card-number")).toBeFalsy();
        expect(screen.queryByTestId("error-expire-date")).toBeFalsy();
        expect(screen.queryByTestId("error-cvv-code")).toBeFalsy();
        expect(screen.queryByTestId("error-first-name")).toBeFalsy();
        expect(screen.queryByTestId("error-last-name")).toBeFalsy();
        },{timeout: 2000});
      })
  });