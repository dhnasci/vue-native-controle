<template>
   <flat-list
        :data="[{key: 'a'}, {key: 'b'}]"
        :render-item="(item) => renderList(item)"
    />
</template>

<script>

import React from 'react';
import {Text} from 'react-native';
    export default {
        methods: {
            renderList: function(item) {
                return (<Text>{item.item.key}</Text>)
            }
        }
    }

</script>
