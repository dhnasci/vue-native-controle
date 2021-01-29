<template>
    <app-navigator></app-navigator>
</template>

<script>

import Vue from "vue-native-core";
import { VueNativeBase } from "native-base";

// registering all native-base components to the global scope of the Vue
Vue.use(VueNativeBase);

import ListaScreen from './src/Lista.vue'
import LoginScreen from './src/Usuarios/Login.vue'
import EsqueciSenha from './src/Usuarios/EsqueciSenha.vue'
import HomeScreen from './src/HomeNovo.vue'
import SideBarScreen from './src/SideBar.vue'
import ControleAtivos from './src/Ativos/ControleAtivos.vue'

import {
  createAppContainer,
  createStackNavigator,
  createDrawerNavigator
} from 'vue-native-router'

const DrawerNavigator = createDrawerNavigator(
  {
    Home: HomeScreen,
    Lista: ListaScreen,
    Login: LoginScreen,
    Ativos: ControleAtivos,
    EsqueciSenha
  },
  {
    initialRouteName: 'Login',
    contentComponent: SideBarScreen
  }
);

const StackNavigator = createStackNavigator(
  {
    Drawer: DrawerNavigator,
    Lista: ListaScreen,
    Home: HomeScreen,
    Login: LoginScreen,
    Ativos: ControleAtivos
  },
  {
    initialRouteName: "Drawer",
    headerMode: "none"
  }
);

const AppNavigator = createAppContainer(StackNavigator);

export default {
  components: { AppNavigator },
}
</script>

<style>


</style>
