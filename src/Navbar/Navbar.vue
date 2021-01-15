<template>
  <view>
    <TouchableWithoutFeedback :onPress="callMenuDrawer">
        <view class="main-navbar" >
            <StatusBar backgroundColor="#5C6BC0" barStyle="light-content" />
            <image :source="require('../../assets/menu1.png')" />
            <text class="navbar-title">Controle Bem</text>
        </view>
    </TouchableWithoutFeedback>
  </view>
  
</template>

<script>
import { StatusBar } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

export default {
    components: {
        StatusBar,
        TouchableWithoutFeedback
    },
    methods: {
        callMenuDrawer() {
            console.log('controle-bem callMenuDrawer');
            this.$emit('openDrawer') ;
        }
    }
}
</script>

<style>
.main-navbar {
    background-color: #3F51B5;
    height: 60px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    padding-bottom: 10px;
    padding-left: 10px;
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