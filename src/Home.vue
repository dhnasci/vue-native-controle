<template>
     <DrawerLayoutAndroid
        ref="drawer" 
        drawerPosition="left" 
        drawerBackgroundColor="#E5E5EF"
      >
      <view render-prop-fn="renderNavigationView">
        <template>
          <TouchableWithoutFeedback :onPress="callHome">
            <text style="font-size: 18; font-weight: bold; color:  #3F51B5; padding-top:16; padding-bottom:16; padding-left:25;">
              <image :source="require('./assets/home.png')" /> 
               Home 
            </text>
          </TouchableWithoutFeedback>
          <text style="font-size: 18; font-weight: bold; color:  #3F51B5; padding-top:16; padding-bottom:16; padding-left:25;"> 
             <image :source="require('./assets/campaign.png')" /> 
            Notificações 
          </text>
          <text style="font-size: 18; font-weight: bold; color: #3F51B5; padding-top:16; padding-bottom:16; padding-left:25;"> 
            <image :source="require('./assets/qr_code.png')" /> 
            Controle de Ativos 
          </text>
          <text style="font-size: 18; font-weight: bold; color: #3F51B5; padding-top:16; padding-bottom:16; padding-left:25;"> 
            <image :source="require('./assets/transfer_within_a_station.png')" /> 
            Transferência </text>
          <text style="font-size: 18; font-weight: bold; color: #3F51B5; padding-top:16; padding-bottom:16; padding-left:25;"> 
            <image :source="require('./assets/home_repair_service.png')" /> 
            Manutenção </text>
          <text style="font-size: 18; font-weight: bold; color: #3F51B5; padding-top:16; padding-bottom:16; padding-left:25;"> 
            <image :source="require('./assets/inventory.png')" /> 
            Controle de Inventário </text>
          <text style="font-size: 18; font-weight: bold; color: #3F51B5; padding-top:16; padding-bottom:16; padding-left:25;"> 
            <image :source="require('./assets/account_circle.png')" />
            Usuários </text>
        </template>
      </view>
      <view class="container" >
        <Navbar @openDrawer="handleMenu" />
        <view class="home-container">
          <view class="home-container-row">
            <image :source="require('./assets/qr_code_big.png')" />
            <image :source="require('./assets/transfer_within_a_station_big.png')" />
          </view>
          <view class="home-container-row">
              <text class="text-color-primary">Meus Ativos</text>
              <text class="text-color-primary">Transferência</text>
          </view>
          <view class="home-container-row home-container-row-spacer">
            <image :source="require('./assets/home_repair_service_big.png')" />
            <image :source="require('./assets/inventory_big.png')" />
          </view>
          <view class="home-container-row">
              <text class="text-color-primary">Manutenção</text>
              <text class="text-color-primary">Inventário</text>
          </view>
          <view class="home-container-row home-container-row-spacer">
              <image :source="require('./assets/inventario.png')" />
          </view>
           
        </view>
      </view>
     </DrawerLayoutAndroid>
</template>


<script>
import Navbar from './src/Navbar/Navbar.vue'
import Lista from './src/Lista.vue';
import { DrawerLayoutAndroid } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

export default {
  components: {
    Navbar,
    Lista, 
    DrawerLayoutAndroid, 
    TouchableWithoutFeedback
  },
  created() {
    console.log('controle-bem created');  

  },
  mounted() {
    console.log('controle-bem mounted refs: ', this.$refs.drawer);

  },
  methods: {
     handleMenu() {
        console.log('vue-controle-bem > clicou no menu');
        this.$refs.drawer.openDrawer();
    },
    callHome() {
      console.log('vue-controle-bem: clicou em Home no drawer');
    }
  }
}
</script>

<style>
    .container {
    background-color: white;
    }
    .text-color-primary {
    color:#3F51B5;
    font-weight: bold;
    font-size: 18;
    }
    .home-container{
    padding-top: 60px;
    }
    .home-container-row {
    display: flex;
    align-items: flex-start;
    flex-direction: row;
    justify-content: space-around;
    }
    .home-container-row-spacer {
    padding-top: 60px;
    }
</style>