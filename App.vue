<template>
	<root>
    <app-navigator></app-navigator>
	</root>
</template>

<script>
import { Root } from "native-base";
import Vue from "vue-native-core";
import { VueNativeBase } from "native-base";
import Store from './store'

// registering all native-base components to the global scope of the Vue
Vue.use(VueNativeBase);

import ListaScreen from './src/Lista.vue'
import LoginScreen from './src/Usuarios/Login.vue'
import EsqueciSenhaScreen from './src/Usuarios/EsqueciSenha.vue'
import ControleUsuarioScreen from './src/Usuarios/ControleUsuarios.vue'
import EditarUsuarioScreen from './src/Usuarios/EditarUsuario.vue'
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
		EsqueciSenha: EsqueciSenhaScreen,
    ControleUsuarios: ControleUsuarioScreen, 
    EditarUsuario: EditarUsuarioScreen,
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
    ControleUsuarios: ControleUsuarioScreen
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
