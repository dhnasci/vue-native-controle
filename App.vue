<template>
     <DrawerLayoutAndroid
        ref="drawer"
        drawerPosition="left" 
      >
      <view render-prop-fn="renderNavigationView">
        <template>
          <text style="font-size: 18; font-weight: bold; color: teal; padding-top:16; padding-bottom:16; padding-left:25;"> Home </text>
          <text style="font-size: 18; font-weight: bold; color: teal; padding-top:16; padding-bottom:16; padding-left:25;"> Notificações </text>
          <text style="font-size: 18; font-weight: bold; color: teal; padding-top:16; padding-bottom:16; padding-left:25;"> Controle de Ativos </text>
          <text style="font-size: 18; font-weight: bold; color: teal; padding-top:16; padding-bottom:16; padding-left:25;"> Transferência </text>
          <text style="font-size: 18; font-weight: bold; color: teal; padding-top:16; padding-bottom:16; padding-left:25;"> Manutenção </text>
          <text style="font-size: 18; font-weight: bold; color: teal; padding-top:16; padding-bottom:16; padding-left:25;"> Controle de Inventário </text>
          <text style="font-size: 18; font-weight: bold; color: teal; padding-top:16; padding-bottom:16; padding-left:25;"> Usuários </text>
          <text :style="{fontSize:14, color: 'red'}"> Novo texto </text>
        </template>
      </view>
      <view class="container" >
        <Navbar />
        <text class="text-color-primary">Controle Bem App</text>
        <Lista />
      </view>
     </DrawerLayoutAndroid>
</template>

<script>
import Navbar from './src/Navbar/Navbar.vue';
import Lista from './src/Lista.vue';
import { DrawerLayoutAndroid } from 'react-native'

export default {
  components: {
    Navbar,
    Lista, 
    DrawerLayoutAndroid
  },
  created() {
    console.log('controle-bem ');
    console.log('controle-bem: ', this.$refs);
  },
  methods: {
    getTextStyleDrawer() {
      const estilo = {
        fontSize:14, 
        color: 'red',
        fontWeight:'bold'
      }
      return estilo;
    }
  }
}
</script>

<style>
.container {
  background-color: white;
}
.text-color-primary {
  color: blue;
}
.texto-drawer {
  color: brown;

}

</style>
