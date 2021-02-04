<template>
	<view>
		<Navbar @openDrawer="handleMenu" />
			<view class="home-container">
				<view class="drawer-text">
          <text style="font-family: Roboto; font-style: normal; font-weight: bold; font-size: 18; line-height: 21; margin-bottom: 10;">
            Controle de Usuários </text>
          <image :source="require('../../assets/add_box.png')" /> 
        </view>
				<view class="header-list">
					<text style="font-family: Roboto; font-weight: bold; font-size: 13; line-height: 21;">Nome</text>
					<text style="font-family: Roboto; font-weight: bold; font-size: 13; line-height: 21;">Celular</text>
					<text style="font-family: Roboto; font-weight: bold; font-size: 13; line-height: 21;">Perfil</text>
					
				</view>  
        <scroll-view>    
            <nb-list v-for="usuario in usuarios" :key="usuario.login">
              <nb-list-item avatar >
                <nb-body>
                  <nb-text>{{usuario.nome}} {{usuario.sobrenome}}</nb-Text>
                  <nb-text note :numberOfLines="1">{{usuario.telefone}}</nb-Text>
                </nb-body>
                <nb-right>
                  <nb-text note>{{usuario.perfil}}</nb-text>
                  <touchable-opacity :on-press="() => 
                    { editarUsuario(usuario); 
                      this.props.navigation.navigate('EditarUsuario');
                    }" >
                    <image :source="require('../../assets/loupe.png')" /> 
                  </touchable-opacity>
                </nb-right>
              </nb-list-item>
          </nb-list>
        </scroll-view>
			</view>
	</view>
    
</template>

<script>
import Navbar from './../Navbar.vue'
import * as Font from 'expo-font';
import { Content, List, ListItem, Text, Left, Right, Icon } from 'native-base';
import dirceu from '../../assets/faces/pierreperson.png';
import flavio from '../../assets/faces/donaldperson.png';
import sheila from '../../assets/faces/greta.png';
import sonia from '../../assets/faces/girl.png';
import Store from '../../store'

export default {
  data() {
    return { 
      usuarioSel: {
      },
      usuarios: [
        { nome: 'Dirceu', 
          sobrenome: 'Henrique', 
          cpf: '98135865082',
          email: 'dirceu.vital@arkosolucoes.com.br',
          ativo: true,
          telefone: '92 98135-3776',
          perfil: 'Administrador',
          foto: dirceu,
          login: 'dirceu.henrique'
          },
        { nome: 'Flavio', 
          sobrenome: 'Rodhen', 
          cpf: '47914461008',
          email: 'flavio@email.com',
          ativo: true,
          telefone: '92 98886-7744',
          perfil: 'Líder',
          foto: flavio,
          login: 'flavio.rodhen'
          },
        { nome: 'Sheila', 
          sobrenome: 'Cruz',
          cpf: '90838963072',
          email: 'sheila@email.com',
          ativo: true, 
          telefone: '11 97125-1125',
          perfil: 'Controlador',
          foto: sheila,
          login: 'sheila.cruz'
          },
        { nome: 'Sonia', 
          sobrenome: 'Maria',
          cpf: '34726625063',
          email: 'sonia@email.com',
          ativo: true, 
          telefone: '92 98886-7744',
          perfil: 'Auditor',
          foto: sonia,
          login: 'sonia.maria'
          }
      ],
    }
  },
	components: {
		Navbar,
    Content, List, ListItem, Text, Left, Right, Icon
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
    console.log('vue-controle-bem mounted > Controle Usuarios ');
  },
  methods: {
    editarUsuario: (usuarioS) => {   
      var vm = this;
      console.log('vue-controle-bem editar usuário > ', usuarioS.login);
      try {
        Store.dispatch('selectUsuario', usuarioS);
      } catch (error) {
        console.log('erro1 :', error)
      }
      console.log('selecionado > ', Store.state.usuarioSelecionado);
    },
    goEdit() {
      console.log('apertou button ', usuario.login)
      try {
        this.navigation.navigate('EditarUsuario'); 
      } catch (error) {
        console.log('erro2 :', error)
      }
    },
    getItem() {
      console.log('vue-controle-bem getItem > ', usuario.nome);
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
	.header-list {
		padding-top: 20px;
		display: flex;
		align-items: center;
		flex-direction: row;
		justify-content: space-around;
		border-bottom-width: 2px;

	}

</style>