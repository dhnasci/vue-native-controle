<template>
    <app-navigator></app-navigator>
</template>

<script>
import ListaScreen from './src/Lista.vue'
import LoginScreen from './src/Usuarios/Login.vue'

import {
  createAppContainer,
  createStackNavigator,
} from 'vue-native-router'

const StackNavigator = createStackNavigator(
  {
    Lista: ListaScreen,
    Login: LoginScreen,
  },
  {
    initialRouteName: 'Login',
  }
);

const AppNavigator = createAppContainer(StackNavigator);

export default {
  components: { AppNavigator },
}
</script>

<style>


</style>
