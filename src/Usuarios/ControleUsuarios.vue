<template>
	<view>
		<Navbar @openDrawer="handleMenu" />
			<view class="home-container">
				<view class="drawer-text">
          <text style="font-family: Roboto; font-style: normal; font-weight: bold; font-size: 18; line-height: 21; margin-bottom: 10;">
            Controle de Usuários </text>
          <image :source="require('./../../assets/add_box.png')" /> 
        </view>
				<view class="header-list">
					<text style="font-family: Roboto; font-weight: bold; font-size: 13; line-height: 21;">Nome</text>
					<text style="font-family: Roboto; font-weight: bold; font-size: 13; line-height: 21;">Login</text>
					<text style="font-family: Roboto; font-weight: bold; font-size: 13; line-height: 21;">Celular</text>
					<text style="font-family: Roboto; font-weight: bold; font-size: 13; line-height: 21;">Perfil</text>
					
				</view>
			</view>
	</view>
    
</template>

<script>
import React from "react";
import Navbar from './../Navbar.vue'
import * as Font from 'expo-font';

export default {
	components: {
		Navbar
	},
	props: { 
    navigation: {
        type: Object
        }
  },
  created() {
    this.loadFonts();
  },
  mounted() {
    console.log('vue-controle-bem mounted > Controle Usuarios');
  },
  methods: {
    handleMenu() {
      this.navigation.openDrawer();
    },
    async loadFonts() {
      try {
        this.isAppReady = false;
        await Font.loadAsync({
          Roboto: require("../../fonts/Roboto-Bold.ttf"),
          RobotoReg: require("../../fonts/Roboto-Regular.ttf"),
          Nunito: require("../../fonts/NunitoSans-Bold.ttf"),
          Lato: require("../../fonts/Lato-Regular.ttf")
        });
        this.isAppReady = true;
      } catch (error) {
        console.log("some error occured", error);
        this.isAppReady = true;
      }
    }
  }
}
</script>

<style>
	.home-container {
		padding-top: 22px;
		padding-left: 22px;
		padding-right: 19px;
	}
	.drawer-text {
			display: flex;
			align-items: center;
			flex-direction: row;
			justify-content: space-around;
	}
	.header-list {
		padding-top: 20px;
		display: flex;
		align-items: center;
		flex-direction: row;
		justify-content: space-around;
		border-bottom-width: 2px;

	}

</style>