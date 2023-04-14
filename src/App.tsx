/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  Alert
} from 'react-native';
import { AppBar } from "@react-native-material/core";
import Form from './Components/CreditCardForm';

function App(): JSX.Element {
  const handlePayment = () => {
    Alert.alert('Payment Succesfully', '', [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  }

  return (
    <SafeAreaView>
      <AppBar title="Credit Card Input Exercise" testID="app-bar"/>
      <Form testID="credit-card-form" submitAction={handlePayment}/>
    </SafeAreaView>
  );
}

export default App;
