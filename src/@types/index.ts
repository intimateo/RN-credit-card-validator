import { Control } from 'react-hook-form';

export interface CreditCardFormData {
    creditCardNumber: string;
    expirationDate: string;
    cvvCode: string;
    firstName: string;
    lastName: string;
  }
export interface InputProps {
    control: Control;
    name: string;
    rules?: Record<string, unknown>;
    defaultValue?: string;
    label?: string;
    keyboardType?: 'default' | 'number-pad' | 'decimal-pad' | 'numeric' | 'email-address' | 'phone-pad';
    variant?: 'standard' | 'outlined' | 'filled';
  }