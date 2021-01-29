<template>
	<root>
    <app-navigator></app-navigator>
	</root>
</template>

<script>
import { Root } from "native-base";
import Vue from "vue-native-core";
import { VueNativeBase } from "native-base";

// registering all native-base components to the global scope of the Vue
Vue.use(VueNativeBase);

import ListaScreen from './src/Lista.vue'
import LoginScreen from './src/Usuarios/Login.vue'
import EsqueciSenha from './src/Usuarios/EsqueciSenha.vue'
import ControleUsuarios from './src/Usuarios/ControleUsuarios.vue'
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
		EsqueciSenha,
		ControleUsuarios
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
		Ativos: ControleAtivos,
		ControleUsuarios
  },
  {
    initialRouteName: "Drawer",
    headerMode: "none"
  }
);

const AppNavigator = createAppContainer(StackNavigator);

export default {
  components: { Root, AppNavigator },
}
</script>

<style>


</style>
