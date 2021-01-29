<template>
	<view> 
		<Navbar @openDrawer="handleMenu" />
      <view class="home-container">
				<view class="drawer-text">
					<text style="font-family: Roboto; font-style: normal; font-weight: bold; font-size: 18; line-height: 21;" >Esqueci minha Senha</text>
				</view>
			<nb-card :style="{marginLeft: 19, marginRight: 16, marginTop: 35}">
        <nb-card-item header>
          <nb-text :style="{fontFamily: 'Roboto', fontSize: 13, fontWeight: 'bold'}">Digite o seu e-mail cadastrado:</nb-text>
        </nb-card-item>
        <nb-card-item :style="{paddingTop:0, paddingBottom:0}">
          
						<nb-form :style="{
                lineHeight: 16,
                width:250}">
							<nb-item>
								<nb-input  placeholder="Aqui..." v-model.lazy="email"  />
							</nb-item>
							<nb-item regular>
								<nb-text> {{ email }}
									</nb-text>
							</nb-item>
						</nb-form>
          
        </nb-card-item>
				<nb-card-item :style="{paddingTop:20, paddingBottom: 15, justifyContent: 'center'}">
					<view class="drawer-text">
						<nb-button rounded success :on-press="onSubmit">
							<nb-text :style="{fontWeight: 'bold'}"> Enviar </nb-text>
						</nb-button>
					</view>
				</nb-card-item>
      </nb-card>
				
			</view>
 	</view>
</template>

<script>

import Navbar from './../Navbar.vue'
import * as Font from 'expo-font';
import { Card, CardItem, Text, Body, Form, Content, Input } from "native-base";

export default {
	data() {
		return { 
			email: '',
		}
	},
	components: {
			Navbar, 
			Card, 
			CardItem, 
			Text,
			Body,
			Form,
			Content,
			Input
		},
  props: { 
    navigation: {
        type: Object
        }
	},
	methods: {
    handleMenu() {
      console.log('vue-controle-bem Esqueci Senha handleMenu');
      this.navigation.openDrawer();
		},
		onSubmit() {
			console.log('vue-controle-bem onSubmit ', this.email);
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
  padding-top: 28px;
}
.drawer-text {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-around;
}
</style>