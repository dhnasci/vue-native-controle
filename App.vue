<template>
  <view class="container">
    <Navbar />
    <text class="text-color-primary">Controle Bem App</text>
  </view>
</template>

<script>
import Navbar from './src/Navbar/Navbar.vue'

export default {
  components: {
    Navbar
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
</style>
