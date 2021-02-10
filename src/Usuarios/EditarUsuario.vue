<template>
    <nb-container>
      <Navbar @openDrawer="handleMenu" />
      <nb-content class="home-container">
          <view class ="drawer-text">
          <text style="font-family: Roboto; font-style: normal; font-weight: bold; font-size: 18; line-height: 21; margin-bottom: 10;">
            Edição de Usuários </text>
            <touchable-opacity :on-press="() => 
                { 
                  deletaUsuario();
                  this.props.navigation.navigate('ControleUsuarios');
                }" >
                  <image :source="require('../../assets/delete.png')" /> 
            </touchable-opacity>
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
import { Container,  Content, Form, Item, Input, Label, Card, CardItem, Text, Body, Toast } from 'native-base';
import Store from '../../store'
import { Alert } from 'react-native'

export default {
    components: {
		Navbar,
        Content, 
        Container, 
        Form, 
        Item, 
        Input, 
        Label,
        Card, CardItem, Text, Body, Toast
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
          },
          usuarioSelect: Store.state.usuarioSelecionado,
    }
  },
  created() {
    this.loadFonts();
    
    console.log("vue-controle-bem Editar Usuarios >  created");
    this.sincronizar(this.usuarioSelect);
    if (this.usuarioSelect) {
      this.usuario = this.usuarioSelect;
    }
    const st =  Store; 
    
    const _this = this;
    this.navigation.addListener('willFocus', () => {
      console.log('ativou focus editar plus... ', st.state.usuarioSelecionado);
      
      _this.sincronizar(st.state.usuarioSelecionado);
      if (st.state.usuarioSelecionado) {
        _this.usuario = st.state.usuarioSelecionado;
      }
    });
  },
  watch: {
      usuarioSelect( usuarioNovo, usuarioAntigo){
        this.sincronizar(usuarioNovo)
      }
  },
  methods: {
    submit() {
        console.log('clicou no submit...', this.usuario);
        Store.state.erro = '';
        const _this = this;
        Store.dispatch('editarUsuario', { usuario: this.usuario })
           .then(() => { 

             if (Store.state.erro != '') {
              console.log('erro > ', Store.state.erro);
              Toast.show({
                text:'Erro: ' + Store.state.erro,
                buttonText:'Ok', 
                position: 'bottom',
                duration: 3000
                })
            }else {

             Toast.show({
                text:'Usuário editado com sucesso',
                buttonText:'Ok', 
                position: 'bottom',
                duration: 2000
                })
              this.navigation.navigate('ControleUsuarios');
            }
           }).catch(error => console.log('Erro > ', error));
        
    },
    cancel() {
      console.log('clicou no cancel...');
      this.navigation.navigate('Home');
    },
    deletaUsuario() {
      Store.state.erro = '';
      const _this = this;
      Alert.alert(
        'Confirmação',
        'Deseja realmente remover usuário?',
        [
          { 
            text: 'SIM', onPress: () => { _this.confirmaRemocao(); } 
          }, 
          { 
            text: 'NÃO', onPress: () => { console.log('Não faz nada...'); }
          }, 
        ]
      );
      
    },
    confirmaRemocao() {
      try {
        Store.dispatch('removerUsuario', {usuario: this.usuario})
          .then(() => { 
        
            if (Store.state.erro != '') {
              console.log('erro > ', Store.state.erro);
            }else {
              console.log('Usuário removido com sucesso');
            }
               
          }).catch(error => console.log('erro promise removerUsuario > ', error));
        
      } catch (error) {
        console.log('não consegui remover ... ', error)
      }
    },
    handleMenu() {
      this.navigation.openDrawer();
    },
    sincronizar(novoUsuario) {
      this.usuario = Object.assign( {}, novoUsuario || this.usuario);
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