<template>
    <nb-container>
      <Navbar @openDrawer="handleMenu" />
      <nb-content class="home-container">
          <view class ="drawer-text">
          <text style="font-family: Roboto; font-style: normal; font-weight: bold; font-size: 18; line-height: 21; margin-bottom: 10;">
            Edição de Usuários </text>
          <image :source="require('../../assets/delete.png')" /> 
        </view>
        <nb-form>
            <nb-item inlineLabel>
                <nb-label>Nome</nb-label>
            <nb-input v-model="usuario.nome" />
                </nb-item>
                <nb-item inlineLabel last>
                <nb-label>Senha</nb-label>
                
                <nb-input v-model="usuario.senha" secureTextEntry />
            </nb-item>
            <nb-button rounded success :on-press="submit" >
                <nb-text>Concluir</nb-text>
            </nb-button>
        </nb-form>
      </nb-content>
    </nb-container>
</template>

<script>
import Navbar from './../Navbar.vue'
import * as Font from 'expo-font';
import { Container,  Content, Form, Item, Input, Label } from 'native-base';

export default {
    components: {
		Navbar,
        Content, 
        Container, 
        Form, 
        Item, 
        Input, 
        Label
	},
props: { 
    navigation: {
        type: Object
        }
  },
  data() {
      return{ 
          usuario: { }
    }
  },
  created() {
    this.loadFonts();
  },
  mounted() {
    console.log('vue-controle-bem mounted > Editar Usuarios ');
  },
  methods: {
      submit() {
          console.log('clicou no submit...', this.usuario);
          this.navigation.navigate('ControleUsuario');
      },
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
          Lato: require("../../fonts/Lato-Regular.ttf"),
          MaterialIcons: require("../../node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/MaterialIcons.ttf")
        });
        this.isAppReady = true;
      } catch (error) {
        console.log("some error occurred", error);
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

</style>