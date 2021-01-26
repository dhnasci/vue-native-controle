<template>
  <view class="container" >
    <Navbar @openDrawer="handleMenu" />
    <view class="home-container">
      <view class="home-container-row">
         <touchable-opacity  :on-press="callAtivos">
          <image :source="require('./../assets/qr_code_big.png')" />
        </touchable-opacity>
        <image :source="require('./../assets/transfer_within_a_station_big.png')" />
      </view>
      <view class="home-container-row">
       
          <text class="text-color-primary">Meus Ativos</text>
        
          <text class="text-color-primary">Transferência</text>
      </view>
      <view class="home-container-row home-container-row-spacer">
        <image :source="require('./../assets/home_repair_service_big.png')" />
        <image :source="require('./../assets/inventory_big.png')" />
      </view>
      <view class="home-container-row">
          <text class="text-color-primary">Manutenção</text>
          <text class="text-color-primary">Inventário</text>
      </view>
      <view class="home-container-row home-container-row-spacer">
          <image :source="require('./../assets/logoArko.png')" />
      </view>
        
    </view>
  </view>
</template>


<script>
import Navbar from './Navbar.vue'
import Lista from './Lista.vue'

export default {
  components: {
    Navbar,
    Lista
  },
   props: { 
    navigation: {
        type: Object
        }
  },
  created() {
    console.log('controle-bem created');  

  },
  mounted() {
    console.log('controle-bem mounted');

  },
  methods: {
     handleMenu() {
        console.log('vue-controle-bem > clicou no menu');
        this.navigation.openDrawer();
    },
    callHome() {
      console.log('vue-controle-bem: clicou em Home no drawer');
    },
    callAtivos() {
      this.navigation.navigate('Ativos');
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
    padding-top: 55px;
    }
</style>