/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import { AppBar } from "@react-native-material/core";
import {
  SafeAreaView,
} from 'react-native';
import Form from './Components/CreditCardForm';

const App: React.FC = () => { 
  return (
    <SafeAreaView>
      <AppBar title="Credit Card Input Exercise" />
      <Form/>
    </SafeAreaView>
  );
}

export default App;
