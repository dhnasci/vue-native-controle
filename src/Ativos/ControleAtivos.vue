<template>
    <view>
      <Navbar @openDrawer="handleMenu" />
      <view class="home-container">
        <view class="drawer-text">
          <text style="font-family: Roboto; font-style: normal; font-weight: bold; font-size: 18; line-height: 21; "> Filtro de Ativos </text>
        </view>
        <view class="filter-box">
          <view class="filter-box-row">
            <image :source="require('./../../assets/search.png')" /> 
            <text-input 
              :style="{
                lineHeight: 16,
                width:230,
                borderBottomWidth: 1,
              }" v-model="centroDeCusto" /> 
          </view>
          <view class="filter-box-row">
            <image :source="require('./../../assets/qr_code_black.png')" /> 
           
            <Picker
              mode="dropdown"
              ref="myPicker"
              :onValueChange="callStatus"
              :selectedValue="selecionado"
              :style="{ fontSize: 16, lineHeight: 16, width: 234, borderBottomWidth: 1 }" >

              <Picker.Item label="ATIVO" value="ativo" />
              <Picker.Item label="EM MANUTENÇÃO" value="manutencao" />
              <Picker.Item label="BAIXADO" value="baixado" />
              
            </Picker>
          
          </view>
        </view>
        <view class="drawer-text">
          <text style="font-family: Roboto; font-style: normal; font-weight: bold; font-size: 18; line-height: 21; ">Controle de Ativos </text>
          <image :source="require('./../../assets/add_box.png')" /> 
          
        </view>
      </view>
    </view>
</template>

<script>

import Navbar from './../Navbar.vue'
import * as Font from 'expo-font';
import  { Picker } from '@react-native-picker/picker';


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
    Picker,
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
    callStatus (value, index) {
      console.log('vue-controle-bem Controle Ativo Status ', value);
      console.log('vue-controle-bem Controle Ativo index ', index);
    },
    async loadFonts() {
      try {
        this.isAppReady = false;
        await Font.loadAsync({
          Roboto: require("../../fonts/Roboto-Bold.ttf"),
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
  padding-bottom: 32px;
  margin-right: 45px;
}
.filter-box-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding-bottom: 16px;
}
.centraliza {
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>