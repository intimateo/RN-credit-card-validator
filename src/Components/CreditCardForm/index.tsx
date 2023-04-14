import {useForm} from 'react-hook-form';
import { View } from 'react-native';
import { CreditCardFormData } from '@types'
import { ReactElement } from 'react';
import Input from '../Input';
import { Button } from '@react-native-material/core';
function Form () : ReactElement {
    const {control, handleSubmit} = useForm<CreditCardFormData>();
  
    const onSubmit = (data: CreditCardFormData) => {
      console.log(data);
    };
  
    return(
        <View>
          <Input control={control} name="creditCardNumber" rules={{ required: true }} label="Credit Card Number" keyboardType="number-pad" />
          <Input control={control} name="expirationDate" rules={{ required: true }} label="Expiration Date" keyboardType="number-pad" />
          <Input control={control} name="cvvCode" rules={{ required: true }} label="CVV Code" keyboardType="number-pad" />
          <Input control={control} name="firstName" rules={{ required: true }} label="First Name" />
          <Input control={control} name="lastName" rules={{ required: true }} label="Last Name" />
          <Button title="Submit" onPress={handleSubmit(onSubmit)}/>
        </View>
    )
  };

export default Form;