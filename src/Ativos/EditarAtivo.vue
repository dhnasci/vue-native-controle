<template>
  <nb-container>
      <Navbar @openDrawer="handleMenu" />
      <scroll-view>
      <nb-content class="home-container">
          <view class ="drawer-text">
          <text style="font-family: Roboto; font-style: normal; font-weight: bold; font-size: 18; line-height: 21; margin-bottom: 10;">
            Edição de Ativos </text>
            <touchable-opacity :on-press="() => 
                { 
                  
                  this.props.navigation.navigate('ControleAtivos');
                }" >
                  <image :source="require('../../assets/delete.png')" /> 
            </touchable-opacity>
        </view>
        <nb-form>
             <nb-item inlineLabel>
                <nb-label>Patrimonio</nb-label>
                <nb-input autoFocus v-model="ativo.codigo" keyboardType="numeric" />
            </nb-item>
            <nb-item inlineLabel>
                <nb-label>Resumo</nb-label>
                <nb-input v-model="ativo.resumo" />
            </nb-item>
            <nb-item inlineLabel>
                <nb-label>Descrição</nb-label>
                <nb-textarea :rowSpan="4" bordered placeholder="Descreva mais detalhes..." v-model="ativo.descricao" />
            </nb-item>
             <nb-item inlineLabel>
                <nb-label>Valor R$</nb-label>
                <nb-input v-model="ativo.valor" keyboardType="numeric" />
            </nb-item>
            <nb-item inlineLabel>
                <nb-label>Fornecedor</nb-label>
                <nb-picker
                mode="dropdown"
                :selectedValue="selecionado"
                :onValueChange="callFornecedor"
                >
                <item label="Dell" value="Dell" />
                <item label="Lojas Americanas" value="LojasAmericanas" />
                <item label="Magazine Luiza" value="MagazineLuiza" />
                <item label="Lojas Bahia" value="LojasBahia" />
                <item label="Extra" value="Extra" />
                <item label="Carrefour" value="Carrefour" />
                <item label="Amazon" value="Amazon" />
              </nb-picker>
            </nb-item>
             <nb-item inlineLabel>
                <nb-label>Nota Fiscal</nb-label>
                <nb-input v-model="ativo.notaFiscal" keyboardType="decimal-pad" />
            </nb-item>
            <nb-item inlineLabel>
                <nb-label>Centro de Custo</nb-label>
                <nb-picker
                mode="dropdown"
                :selectedValue="selCentroCusto"
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
            <nb-item inlineLabel>
                <nb-label>Tipo de Ativo</nb-label>
                <nb-picker
                mode="dropdown"
                :selectedValue="selTipoAtivo"
                :onValueChange="callTipoAtivo"
                >
                <item label="Próprio" value="PROPRIO" />
                <item label="Terceiros" value="TERCEIROS" />
              </nb-picker>
            </nb-item>
            <nb-item inlineLabel>
                <nb-label>Responsável</nb-label>
                <nb-picker
                mode="dropdown"
                :selectedValue="selResponsavel"
                :onValueChange="callResponsavel"
                >
                <item label="Dirceu" value="dirceu.nascimento" />
                <item label="Flávio" value="flavio.rodhen" />
                <item label="Sheila" value="sheila.cruz" />
                <item label="Sonia" value="sonia.maria" />
              </nb-picker>
            </nb-item>
             <nb-item inlineLabel>
                <nb-label>Foto</nb-label>
                <nb-input v-model="ativo.foto"  />
                <nb-button primary :on-press="uploadFoto"><nb-text>Upload</nb-text></nb-button>
            </nb-item>
        </nb-form>
      </nb-content>
      </scroll-view>
  </nb-container>
</template>

<script>
import Navbar from './../Navbar.vue'
import * as Font from 'expo-font';
import { Container,  Content, Form, Item, Input, Label, Card, CardItem, Text, Body, Toast } from 'native-base';
import Store from '../../store'
import { Alert } from 'react-native'
import * as Permissions from 'expo-permissions'

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
          selecionado: 'Dell',
          selCentroCusto: 'DTI',
          selTipoAtivo: 'PROPRIO',
          selResponsavel: 'dirceu.nascimento',
          hasCameraPermission: false,
          hasLibraryPermission: false,
          ativo: {
            codigo: '', 
            usucri: 'admin', 
            criacao: undefined,
            descricao: '', 
            resumo: '',
            centroCusto: 'DTI',
            notafiscal: '',
            valor: 0.0,
            fornecedor: 'Dell',
            status: 'ATIVO',
            tipo: 'PROPRIO',
            foto: ''
        }
      }
    },
    created() {
        this.loadFonts();
    },
    mounted() {
        console.log('vue-controle-bem','mounted')
        const _this = this;
        Permissions.askAsync(Permissions.CAMERA)
            .then( status => {
                _this.hasCameraPermission = status.status == 'granted' ? true : false
            }).catch( error => { console.log('error Camera', 'error > ' + error.message) });
        Permissions.askAsync(Permissions.MEDIA_LIBRARY)
            .then( status => { 
                _this.hasLibraryPermission = status.status == 'granted' ? true : false;
                console.log('vue-controle-bem Library Permission', status)
                }).catch( error => { console.log('error Library', 'error > ' + error.message) });
    },
    methods: {
        callFornecedor(value, index) {
            console.log('vue-controle-bem Fornecedor Status ', value);
            console.log('vue-controle-bem Fornecedor index ', index);
            this.selecionado = value;
        },
        callCentroCusto(value, index) {
            console.log('vue-controle-bem Centro Custo Status ', value);
            console.log('vue-controle-bem Centro Custo index ', index);
            this.selCentroCusto = value;
        },
        callTipoAtivo(value, index) {
            console.log('vue-controle-bem Tipo Ativo Status ', value);
            console.log('vue-controle-bem Tipo Ativo index ', index);
            this.selTipoAtivo = value;
        },
        callResponsavel(value, index){
            console.log('vue-controle-bem Tipo Ativo Status ', value);
            console.log('vue-controle-bem Tipo Ativo index ', index);
            this.selResponsavel = value;
        },
        uploadFoto() {
            console.log('uploadFoto');
            if (this.hasCameraPermission){
                console.log('pode usar camera...');
            } else {
                console.log('não pode usar camera...');
            }
            if (this.hasLibraryPermission){
                console.log('pode usar files...');
            } else {
                console.log('não pode usar files...');
            }
        },
        async loadFonts() {
            try {
                this.isAppReady = false;
                await Font.loadAsync({
                    Roboto: require("../../fonts/Roboto-Bold.ttf"),
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