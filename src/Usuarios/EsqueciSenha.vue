<template>
	<nb-container> 
		<Navbar @openDrawer="handleMenu" />
      <nb-content class="home-container">
				<view class="drawer-text">
					<text style="font-family: Roboto; font-style: normal; font-weight: bold; font-size: 18; line-height: 21;" >Esqueci minha Senha</text>
				</view>
			<nb-card :style="{marginLeft: 19, marginRight: 16, marginTop: 35}">
        <nb-card-item header>
          <nb-text :style="{fontFamily: 'Roboto', fontSize: 13, fontWeight: 'bold'}">Digite o seu e-mail cadastrado:</nb-text>
        </nb-card-item>
        <nb-card-item :style="{paddingTop:0, paddingBottom:0}">
          
				<nb-form class="form-box">
					
					<nb-item inlineLabel>
						<nb-label> E-mail: </nb-label>
						<nb-input  keyboard-type="email-address" v-model="email"  />
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
				
	  </nb-content>
	</nb-container>
</template>

<script>

import Navbar from './../Navbar.vue'
import * as Font from 'expo-font';
import { Container, Card, CardItem, Text, Body, Form, Content, Input, Toast } from "native-base";
//import email from 'react-native-email'


export default {
	data() {
		return { 
			email: '',
		}
	},
	components: {
			Navbar, 
			Container,
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
			// vai ser via axios através de um post para o servidor e 
			// o servidor envia o email via smtp
			//
			console.log('vue-controle-bem onSubmit ', this.email);
			const to = this.email;
			Toast.show( {
						text: 'Seu email de recuperação foi enviado!',
						buttonText: 'Ok',
						position: 'top',
						duration: 3000
					});
			// abre direto o gmail para envio de um email
			/*
			email(to, {
				subject: 'Esqueci minha senha',
				body: 'Segue o novo link para redefinição de senha...'
			}).then(() => {
					console.log('Seu e-mail de troca de senha já foi enviado!');
					Toast.show( {
						text: 'Seu email será aberto!',
						buttonText: 'Ok',
						position: 'bottom',
						duration: 3000
					});
			}).catch( error => {
				console.log(error);
				} );
			*/
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
.form-box {
	line-height: 16;
	width: 270px;
}
</style>