<template>
  <nb-container>
      <Navbar @openDrawer="handleMenu" />
      <nb-content class="home-container">
          <view class ="drawer-text">
            <text style="font-family: Roboto; font-style: normal; font-weight: bold; font-size: 18; line-height: 21; margin-bottom: 10;">
                Cadastro de Usuários </text>
            </view>
              <nb-form>
            <nb-item inlineLabel>
                <nb-label>Nome</nb-label>
                <nb-input v-model="usuario.nome" />
            </nb-item>
            <nb-item inlineLabel>
                <nb-label>Sobrenome</nb-label>
                <nb-input v-model="usuario.sobrenome" />
            </nb-item>
            <nb-item inlineLabel>
                <nb-label>CPF</nb-label>
                <nb-input v-model="usuario.cpf" keyboard-type="numeric" />
            </nb-item>
            <nb-item inlineLabel>
                <nb-label>Telefone</nb-label>
                <nb-input v-model="usuario.telefone" />
            </nb-item>
            <nb-item inlineLabel>
                <nb-label>E-mail</nb-label>
                <nb-input v-model="usuario.email" keyboard-type="email-address" />
            </nb-item>
            <nb-item inlineLabel>
                <nb-label>Centro Custo</nb-label>
                <nb-picker
                    mode="dropdown"
                    :selectedValue="usuario.centroCusto"
                    :onValueChange="callCentroCusto"
                    >
                    <item label="Tecnologia Informação" value="DTI" />
                    <item label="Controladoria" value="DCO" />
                    <item label="Planejamento" value="DPL" />
                    <item label="Vendas" value="OVN" />
                    <item label="Marketing" value="DMN" />
                    <item label="Engenharia" value="EOP" />
                </nb-picker>
            </nb-item>
            <nb-card transparent>
                <nb-card-item  class="container-row">
                    <nb-button rounded success :on-press="submit" >
                        <nb-text>Concluir</nb-text>
                    </nb-button>
                    <nb-button rounded primary :on-press="cancel" >
                        <nb-text>Cancelar</nb-text>
                    </nb-button>
                </nb-card-item>
          </nb-card>
        </nb-form>
      </nb-content>
  </nb-container>
</template>

<script>
import Navbar from './../Navbar.vue'
import * as Font from 'expo-font';
import { Container,  Content, Form, Item, Input, Label, Card, CardItem, Text, Body, Picker  } from 'native-base';

export default {
    components: {
		Navbar,
        Content, 
        Container, 
        Form, 
        Item, 
        Input, 
        Label,
        Card, CardItem, Text, Body, 
        Item: Picker.Item,
    },
    props: { 
        navigation: {
            type: Object
            }
    },
    data() {
      return{ 
          usuario: {
            nome: '',
            sobrenome: '',
            cpf: '',
            telefone: '',
            email: '',
            centroCusto: 'DTI',
            perfil: 'Lider'
          }
    }
  },
  methods: {
    submit() {
        console.log('clicou no submit...', this.usuario);
        this.navigation.navigate('ControleUsuarios');
    },
    cancel() {
      console.log('clicou no cancel...');
      this.navigation.navigate('Home');
    },
    callCentroCusto(value, index) {
        this.usuario.centroCusto = value;
    },
    handleMenu() {
      this.navigation.openDrawer();
    },
    async loadFonts() {
      try {
        this.isAppReady = false;
        await Font.loadAsync({
          Roboto: require("../../fonts/Roboto-Bold.ttf"),
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
  .container-row-one-btn {
        margin-top: 50px;
        align-items: center;
        justify-content: center;
    }
  .container-row {
        margin-top: 50px;
        align-items: center;
        justify-content: space-around;
    }
</style>