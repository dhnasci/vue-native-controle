<template>
  <view class="main-navbar">
      <StatusBar backgroundColor="teal" barStyle="light-content" />
      <text class="navbar-title">Controle Bem</text>
  </view>
</template>

<script>
import { StatusBar } from 'react-native'

export default {
    components: {
        StatusBar
    }
}
</script>

<style>
.main-navbar {
    background-color: teal;
    height: 60px;
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    padding-bottom: 10px;
}

.navbar-title {
    color: white;
    font-weight: bold;
    font-size: 21px;
    line-height: 33px;
    letter-spacing: -0.24;
    color: #fff;
    padding-left: 15px;
}

</style>