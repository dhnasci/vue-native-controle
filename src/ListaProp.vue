<template>
  <flat-list
    :style="{backgroundColor: 'aquamarine', paddingLeft:20, paddingTop:20, height: 200, width: 200, overflow: 'hidden'}"
    :data="[{key: 'a'}, {key: 'b'}, {key: 'c'}]" >
    <view render-prop-fn="renderItem" >
        <text>{{args.item.key}}</text>
    </view>
    </flat-list>
</template>

<script>
export default {

}
</script>

<style>

</style>