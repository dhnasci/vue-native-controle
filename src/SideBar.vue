 <template>
    <view>
        <touchable-opacity :onPress="callHome">
            <text style="font-size: 18; font-weight: bold; color:  #3F51B5; padding-top:16; padding-bottom:16; padding-left:25;">
                <image :source="require('./../assets/home.png')" /> 
                Home 
            </text>
        </touchable-opacity>
        <text style="font-size: 18; font-weight: bold; color:  #3F51B5; padding-top:16; padding-bottom:16; padding-left:25;"> 
            <image :source="require('./../assets/campaign.png')" /> 
        Notificações 
        </text>
        <text style="font-size: 18; font-weight: bold; color: #3F51B5; padding-top:16; padding-bottom:16; padding-left:25;"> 
        <image :source="require('./../assets/qr_code.png')" /> 
        Controle de Ativos 
        </text>
        <text style="font-size: 18; font-weight: bold; color: #3F51B5; padding-top:16; padding-bottom:16; padding-left:25;"> 
        <image :source="require('./../assets/transfer_within_a_station.png')" /> 
        Transferência </text>
        <text style="font-size: 18; font-weight: bold; color: #3F51B5; padding-top:16; padding-bottom:16; padding-left:25;"> 
        <image :source="require('./../assets/home_repair_service.png')" /> 
        Manutenção </text>
        <text style="font-size: 18; font-weight: bold; color: #3F51B5; padding-top:16; padding-bottom:16; padding-left:25;"> 
        <image :source="require('./../assets/inventory.png')" /> 
        Controle de Inventário </text>
        <touchable-opacity :onPress="controleUsuarios">
            <text style="font-size: 18; font-weight: bold; color: #3F51B5; padding-top:16; padding-bottom:16; padding-left:25;"> 
                <image :source="require('./../assets/account_circle.png')" />
                 Usuários 
            </text>
        </touchable-opacity>
    </view>
</template>

<script>
export default {
    props: {
        navigation: {
        type: Object
        }
    },
    methods: {

        callHome() {
            console.log('vue-controle-bem: clicou em Home no drawer');
            this.navigation.navigate('Home');
            this.navigation.closeDrawer();
        },
        controleUsuarios() {
            this.navigation.navigate('ControleUsuarios');
            this.navigation.closeDrawer();
        }
  }
}
</script>