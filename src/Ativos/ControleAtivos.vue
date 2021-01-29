<template>
    <view>
      <Navbar @openDrawer="handleMenu" />
      <view class="home-container">
                <view class="drawer-text">
          <text style="font-family: Roboto; font-style: normal; font-weight: bold; font-size: 18; line-height: 21; "> 
            Filtro de Ativos </text>
        </view>
        <view class="filter-box">
          <view class="filter-box-row">
            <image :style="{ marginRight:20}" :source="require('./../../assets/search.png')" /> 
            <text-input 
              :style="{
                lineHeight: 16,
                width:230,
                borderBottomWidth: 1,
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
          <image :source="require('./../../assets/add_box.png')" /> 
        </view>
         <view>
           <nb-card :style="{marginLeft: 19, marginRight: 16, marginTop: 26}">
                <nb-card-item header :style="{paddingBottom:1}"  >
                  <nb-text :style="{fontFamily: 'Nunito', fontSize: 15, fontWeight: 'bold', color: '#3F51B5'}">
                    Computador Easy Pc</nb-text> 
                </nb-card-item>
                <nb-card-item  :style="{paddingTop:0, paddingBottom:0, justifyContent: 'space-between'}">
                  <nb-text :style="{fontFamily: 'Lato', fontSize: 11, color: 'black'}">
                  Dell </nb-text>
                  <nb-text :style="{fontFamily: 'Nunito', fontSize: 15, color: 'black'}">
                  ATIVO </nb-text>
                </nb-card-item>
                <nb-card-item  :style="{ paddingBottom:0,justifyContent: 'space-around'}" >
                    <nb-text :style="{fontFamily: 'RobotoReg', fontSize: 12}">
                      7898109243137
                    </nb-text>
                    <nb-text :style="{fontFamily: 'RobotoReg', fontSize: 12}">
                      R$ 3091,58
                    </nb-text>
                </nb-card-item>
                <nb-card-item :style="{paddingTop:0, paddingBottom:10,justifyContent: 'space-around'}" >
                    <nb-text :style="{fontFamily: 'RobotoReg', fontSize: 12}">
                      Nota Fiscal 23456
                    </nb-text>
                    <nb-text :style="{fontFamily: 'RobotoReg', fontSize: 12}">
                      10/10/2020
                    </nb-text>
                </nb-card-item>
                <nb-card-item :style="{paddingTop:0}">
                  <nb-text :style="{fontFamily: 'RobotoReg', fontSize: 12}">
                    Responsável Joana Dark</nb-text>
                </nb-card-item>
              </nb-card>
         </view>
       </view>
    </view>
</template>

<script>

import Navbar from './../Navbar.vue'
import * as Font from 'expo-font';
import React from "react";
import { Picker, Container, Card, CardItem, Text, Body } from "native-base";

export default {
  data() {
    return {
      isAppReady: false,
      centroDeCusto: '',
      selecionado: 'ativo',
    };
  },
  components: {
    Navbar, 
    Item: Picker.Item,
    Card, 
    CardItem, 
    Text,
    Body,
    Container
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
    //console.log('vue-controle-bem mounted > ', this.$refs.myPicker);
    console.log('vue-controle-bem mounted > ');

  },
  methods: {
    handleMenu() {
      console.log('vue-controle-bem Controle Ativos handleMenu');
      this.navigation.openDrawer();
    },
    callStatus(value, index) {
      console.log('vue-controle-bem Controle Ativo Status ', value);
      console.log('vue-controle-bem Controle Ativo index ', index);
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