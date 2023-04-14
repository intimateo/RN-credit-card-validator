import React from 'react';
import { Control, Controller, FieldValues,  } from 'react-hook-form';
import { TextInput, Text } from '@react-native-material/core';
import { InputProps } from '@types';


const Input: React.FC<InputProps> = ({ control, name, rules, defaultValue = '', label = '', keyboardType = 'default', variant = 'outlined', ...rest }) => {
    return (
    <>
      <Controller
        control={control as Control<FieldValues>}
        name={name}
        rules={rules}
        defaultValue={defaultValue}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            variant={variant}
            label={label}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType={keyboardType}
            {...rest}
          />
        )}
      />
    </>
    );
  };
  
  export default Input;