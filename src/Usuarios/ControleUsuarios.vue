<template>
	<scroll-view>
		<Navbar @openDrawer="handleMenu" />
			<view class="home-container">
				<view class="drawer-text">
          <text style="font-family: Roboto; font-style: normal; font-weight: bold; font-size: 18; line-height: 21; margin-bottom: 10;">
            Controle de Usuários </text>
              <touchable-opacity :on-press="() => 
                { 
                  this.props.navigation.navigate('CadastrarUsuario');
                }" >
                <image :source="require('../../assets/add_box.png')" /> 
              </touchable-opacity>
        </view>
        
				<view class="header-list">
					<text style="font-family: Roboto; font-weight: bold; font-size: 13; line-height: 21;">Nome</text>
					<text style="font-family: Roboto; font-weight: bold; font-size: 13; line-height: 21;">Celular</text>
					<text style="font-family: Roboto; font-weight: bold; font-size: 13; line-height: 21;">Perfil</text>
					
				</view>  
        <view v-if="!isReady">
          <nb-spinner color="blue" />
        </view>
        <view v-else>    
            <nb-list v-for="usuario in usuarios" :key="usuario.id">
              <nb-list-item>
                <nb-body>
                  <nb-text>{{usuario.nome}} {{usuario.sobrenome}}</nb-Text>
                  <nb-text note :numberOfLines="1">{{usuario.telefone}}</nb-Text>
                </nb-body>
                <nb-right>
                  <nb-text note :style="{fontFamily: 'Roboto', fontSize: 11, fontWeight: 'bold'}">
                    {{usuario.perfil.slice(0,11)}}</nb-text>
                  <touchable-opacity :on-press="() => 
                    { editarUsuario(usuario); 
                      this.props.navigation.navigate('EditarUsuario');
                    }" >
                    <image :source="require('../../assets/loupe.png')" /> 
                  </touchable-opacity>
                </nb-right>
              </nb-list-item>
          </nb-list>
        </view>
			</view>
	</scroll-view>
    
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
      usuarios: Store.state.usuarios,
      isReady: false
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
    console.log('Controle Usuarios created');
    const st = Store;
    const _this = this;
    st.dispatch('listarUsuarios')
     .then(() => {
       console.log('controle usuarios entrou no dispatch...');
       _this.usuarios = st.state.usuarios;
       _this.isReady = true;
       });
    
    this.navigation.addListener('willFocus', () => {
      console.log('ativou willFocus controle');
      st.dispatch('listarUsuarios')
         .then(() => {
            _this.usuarios = st.state.usuarios;
            _this.isReady = true;
         });
      
    } );
  },
  mounted() {
    console.log('vue-controle-bem mounted > Controle Usuarios ');
  },
  methods: {
    editarUsuario: (usuarioS) => {   
      console.log('Controle Usuarios');
      console.log('vue-controle-bem editar usuário > ', usuarioS.login);
      try {
        Store.dispatch('selectUsuario', usuarioS);
      } catch (error) {
        console.log('erro1 :', error)
      }
      console.log('selecionado > ', Store.state.usuarioSelecionado);
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