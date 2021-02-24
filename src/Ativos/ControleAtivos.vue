<template>
    <scroll-view>
      <Navbar @openDrawer="handleMenu" />
      <view class="home-container">
        <view class="drawer-text">
          <text style="font-family: Roboto; font-style: normal; font-weight: bold; font-size: 18; line-height: 21; "> 
            Filtro de Ativos </text>
        </view>
        <view class="filter-box">
          <view class="filter-box-row">
            <image :style="{ marginRight:20 }" :source="require('./../../assets/search.png')" /> 
            <text-input 
              :style="{
                lineHeight: 16,
                width:230,
                borderBottomWidth: 1
              }" v-model="centroDeCusto" /> 
          </view>
          <view class="filter-box-row">
            <image :style="{ marginRight: 50}" :source="require('./../../assets/qr_code_black.png')" /> 
              <nb-picker
                mode="dropdown"
                :selectedValue="selecionado"
                :onValueChange="callStatus"
                >
                <item label="ATIVO" value="ativo" />
                <item label="EM MANUTENÇÃO" value="manutencao" />
                <item label="BAIXADO" value="baixado" />
                <item label="REMOVIDO" value="removido" />
              </nb-picker>
          </view>
        </view>
        <view class="drawer-text">
          <text style="font-family: Roboto; font-style: normal; font-weight: bold; font-size: 18; line-height: 21; margin-bottom: 10;">
            Controle de Ativos </text>
              <touchable-opacity :on-press="() => 
                { 
                  this.props.navigation.navigate('CadastrarAtivo');
                }" >
                <image :source="require('../../assets/add_box.png')" /> 
              </touchable-opacity>
        </view>
        <view v-if="!isReady">
          <nb-spinner color="blue" />
        </view>
         <view v-else>
           <nb-list v-for="ativo in ativos" :key="ativo.id">
             <nb-list-item :style="{paddingRight:0}">
              <nb-card :style="{marginLeft: 10, width: 315, marginTop: 5}">
                    <nb-card-item header :style="{paddingBottom:1}"  >
                      <nb-text :style="{fontFamily: 'Nunito', fontSize: 15, fontWeight: 'bold', color: '#3F51B5'}">
                        {{ativo.resumo}}</nb-text> 
                    </nb-card-item>
                    <nb-card-item :style="{paddingTop:0, paddingBottom:0, justifyContent: 'space-between'}">
                      <nb-thumbnail square large :source="{uri: ativo.foto}" />
                      <view>
                        <nb-card-item  :style="{paddingTop:0, paddingBottom:0, justifyContent: 'space-between'}">
                          <nb-text :style="{fontFamily: 'Lato', fontSize: 11, color: 'black'}">
                          {{ativo.fornecedor}} </nb-text>
                          <nb-text :style="{fontFamily: 'Nunito', fontSize: 15, color: 'black'}">
                          {{ativo.status}}</nb-text>
                        </nb-card-item>
                        <nb-card-item  :style="{ paddingBottom:0, justifyContent: 'space-around'}" >
                            <nb-text :style="{fontFamily: 'RobotoReg', fontSize: 12}">
                              {{ativo.codigo}}    
                            </nb-text>
                            <nb-text :style="{fontFamily: 'RobotoReg', fontWeight: 'bold', fontSize: 12}" > R$ </nb-text>
                            <nb-text :style="{fontFamily: 'RobotoReg', fontSize: 12}">
                               {{ativo.valor}}
                            </nb-text>
                        </nb-card-item>
                        <nb-card-item :style="{paddingTop:0, paddingBottom:10, justifyContent: 'space-around'}" >
                            <nb-text :style="{fontFamily: 'RobotoReg', fontSize: 12}">
                              {{ativo.aquisicao}}
                            </nb-text>
                            <nb-text :style="{fontFamily: 'RobotoReg', fontWeight: 'bold', fontSize: 12}" > NF </nb-text>
                            <nb-text :style="{fontFamily: 'RobotoReg', fontSize: 12}">
                                {{ativo.notaFiscal}}
                            </nb-text>
                        </nb-card-item>
                        <nb-card-item :style="{paddingTop:0, justifyContent: 'space-around'}">
                          <nb-text :style="{fontFamily: 'Roboto', fontSize: 12, fontWeight: 'bold'}">
                            Resp: {{ativo.usuresp}}</nb-text>
                            <touchable-opacity :on-press="() => 
                              { 
                                editarAtivo(ativo); 
                                this.props.navigation.navigate('EditarAtivo');
                              }" >
                              <image :source="require('../../assets/loupe.png')" /> 
                            </touchable-opacity>
                        </nb-card-item>
                      </view>
                      
                    </nb-card-item>
                </nb-card>
             </nb-list-item>
           </nb-list>
         </view>
       </view>
    </scroll-view>
</template>

<script>

import Navbar from './../Navbar.vue'
import * as Font from 'expo-font';
import { Picker, Container, List, ListItem, Card, CardItem, Text, Body } from "native-base";
import Store from '../../store'

export default {
  data() {
    return {
      isAppReady: false,
      centroDeCusto: '',
      selecionado: 'ativo',
      ativos: Store.state.ativos,
      isReady: false
    };
  },
  components: {
    Navbar, 
    Item: Picker.Item,
    Card, 
    CardItem, 
    Text,
    Body,
    Container,
    List,
    ListItem
  },
  props: { 
    navigation: {
        type: Object
        }
  },
  created() {
    this.loadFonts();
    console.log('Controle Ativos created');
    const st = Store;
    const _this = this;
    st.dispatch('listarAtivos')
     .then(() => {
       console.log('controle ativos entrou no dispatch...');
       _this.ativos = st.state.ativos;
       _this.isReady = true;
       });
    
    this.navigation.addListener('willFocus', () => {
      console.log('ativou willFocus controle');
      st.dispatch('listarAtivos')
         .then(() => {
           _this.ativos = [];
           
            _this.ativos = st.state.ativos;
            console.log('ativos...', _this.ativos);
            _this.isReady = true;
         }).catch( error => {
           console.log('error no willFocus...', error);
         });
    } );
  },
  mounted() {
    console.log('vue-controle-bem mounted > ');
  },
  methods: {
    editarAtivo: (ativoS) => {
      console.log('Controle Ativos');
      console.log('Ativo selecionado --> ', ativoS.codigo);
      try {
        Store.dispatch('selectAtivo', ativoS);
      } catch (error) {
        console.log('erro1 :', error)
      }
      console.log('selecionado > ', Store.state.usuarioSelecionado);
    },
    handleMenu() {
      console.log('Controle Ativos handleMenu');
      this.navigation.openDrawer();
    },
    callStatus(value, index) {
      console.log('Controle Ativo Status ', value);
      console.log('Controle Ativo index ', index);
      this.selecionado = value;
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
  padding-top: 18px;
}
.drawer-text {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-around;
}
.filter-box {
  padding-top: 17px;
  margin-left: 40px;
  padding-bottom: 16px;
  margin-right: 35px;
}
.filter-box-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding-bottom: 16px;
}
.centraliza {
  padding-left: 20px;
  
}

</style>