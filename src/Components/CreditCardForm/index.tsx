import {useForm} from 'react-hook-form';
import { View, Text } from 'react-native';
import { CreditCardFormData } from '@types'
import { ReactElement, useEffect } from 'react';
import Input from '../Input';
import { Button } from '@react-native-material/core';
import moment from 'moment';
import styles from '../../styles/global';

export interface IForm {
  testID?: string,
  submitAction?(): void
}

function Form ({testID,submitAction}: IForm) : ReactElement {
    const {control, handleSubmit, formState: { errors }, register } = useForm<CreditCardFormData>();
    const onSubmit = (data: CreditCardFormData) => {
      console.log(data);
      submitAction?.();
    };

    const validateCreditCardNumber = (value: string): boolean => {
      if(!luhnCheck(value)) return false;
      return true;
    };

    const validateExpirationDate = (value: string) : boolean => {
      if(moment(new Date()).isAfter(moment(value,"MM/YY"))) return false
      return true
    }

    const luhnCheck =( num : String) => {
      let arr = (num + '')
        .split('')
        .reverse()
        .map(x => parseInt(x));
      let lastDigit = arr.splice(0, 1)[0];
      let sum = arr.reduce((acc, val, i) => (i % 2 !== 0 ? acc + val : acc + (((val * 2) % 9)) || 9), 0);
      sum += lastDigit;
      return sum % 10 === 0;
    };

  
    return(
        <View>
          <View style={styles.inputBlock}>
            <Input 
              control={control}
              name="creditCardNumber"
              variant={'outlined'}
              rules={{required: true,validate: validateCreditCardNumber}}
              label="Credit Card Number"
              keyboardType="number-pad"
              register={register}
              testID={"card-number-input"}
            />
            {errors.creditCardNumber && <Text style={styles.errorStyle} testID={"error-card-number"}>Invalid credit card number</Text>}
          </View>
          <View style={{flexDirection:'row'}}>
            <View style={styles.inputBlock}>
              <Input 
                control={control}
                name="expirationDate"
                rules={{ required: true, maxLength: 5, pattern: /^(0[1-9]|1[0-2])\/[0-9]{2}$/, validate: validateExpirationDate}}
                register={register}
                label="MM/YY"
                maxLength={5}
                style={styles.inputStyle}
                testID={"card-expiration-date-input"}
              />
              {errors.expirationDate && <Text style={styles.errorStyle}  testID={"error-expire-date"}>Invalid expiration date</Text>}
            </View>
            <View style={styles.inputBlock}>
              <Input
                control={control}
                name="cvvCode"
                rules={{ required: true, pattern: /^\d{3,4}$/ }}
                label="CVV Code"
                keyboardType="number-pad"
                register={register}
                maxLength={4}
                style={styles.inputStyle}
                testID={"card-cvv-code-input"}
              />
              {errors.cvvCode && <Text style={styles.errorStyle} testID={"error-cvv-code"}>Invalid CVV Code</Text>}
            </View>
           </View>
           <View style={{flexDirection:'row'}}>
              <View style={styles.inputBlock}>
                <Input
                  control={control}
                  name="firstName"
                  rules={{ required: true, minLength: 2, maxLength: 255 }}
                  label="First Name" register={register}
                  testID={"card-first-name-input"}
                />
                {errors.firstName && <Text style={styles.errorStyle} testID={"error-first-name"}>Enter the CardHolder First Name</Text>}
              </View>
              <View style={styles.inputBlock}>
                <Input
                  control={control}
                  name="lastName"
                  rules={{ required: true, minLength: 2, maxLength: 255 }}
                  label="Last Name" register={register}
                  testID={"card-last-name-input"}
                />
                {errors.lastName && <Text style={styles.errorStyle} testID={"error-last-name"}>Enter the CardHolder Last Name</Text>}
              </View>
          </View>
          <View style={styles.inputBlock}>
            <Button title="Submit" onPress={handleSubmit(onSubmit)} testID={"submit-button"}/>
          </View>
        </View>
    )
  };

export default Form;