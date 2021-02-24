<template>
   <nb-container>
      <Navbar @openDrawer="handleMenu" />
      <nb-content class="home-container">
          <view class ="drawer-text">
            <text style="font-family: Roboto; font-style: normal; font-weight: bold; font-size: 18; line-height: 21; margin-bottom: 10;">
                Leitura do código de barras </text>
            </view>
            <camera class="caixaCamera" :type="type" :onCameraReady="verificarCamera" ref="minhaCamera"
            :onBarCodeScanned="verificarScanned"
            >
            </camera>
      </nb-content>
   </nb-container>
</template>

<script>


export default {

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
</style>