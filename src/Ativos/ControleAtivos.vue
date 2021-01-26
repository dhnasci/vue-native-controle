<template>
    <view>
      <Navbar @openDrawer="handleMenu" />
      <view>
        <text> Controle de Ativos </text>
      </view>
    </view>
</template>

<script>
import Navbar from './../Navbar.vue'

export default {
  components: {
    Navbar
  },
  props: { 
    navigation: {
        type: Object
        }
  },
  methods: {
    handleMenu() {
      console.log('vue-controle-bem Controle Ativos handleMenu');
      this.navigation.openDrawer();
    }
  }
}
</script>

<style>

</style>