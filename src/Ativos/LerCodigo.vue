<template>
   <nb-container>
      <Navbar @openDrawer="handleMenu" />
      <nb-content class="home-container">
          <view class ="drawer-text">
            <text style="font-family: Roboto; font-style: normal; font-weight: bold; font-size: 18; line-height: 21; margin-bottom: 10;">
                Leitura do código de barras </text>
            </view>
            <view class="alinhaCamera">
                <camera class="caixaCamera" :type="type" :onCameraReady="verificarCamera" ref="minhaCamera"
                    :onBarCodeScanned="verificarScanned"
                    >
                </camera>
            </view>
             <nb-card transparent>
                <nb-card-item  class="container-row">
                    <nb-button rounded success :on-press="doScanner" >
                        <nb-text>Scannear</nb-text>
                    </nb-button>
                    <nb-button rounded primary :on-press="cancel" >
                        <nb-text>Reset</nb-text>
                    </nb-button>
                    <nb-button rounded info :on-press="goBack" >
                        <nb-text>Voltar</nb-text>
                    </nb-button>
                </nb-card-item>
            </nb-card>
            <nb-card 
                :style="{marginLeft: 10, width: 315, marginTop: 5}"
                v-if="mostra"
                >
                    <nb-card-item header :style="{paddingBottom:1}"  >
                      <nb-text :style="{fontFamily: 'Nunito', fontSize: 15, fontWeight: 'bold', color: '#3F51B5'}">
                        {{ativo.resumo}}</nb-text> 
                    </nb-card-item>
                    <nb-card-item :style="{paddingTop:0, paddingBottom:0, justifyContent: 'space-between'}">
                      <nb-thumbnail square large :source="{uri: ativo.foto}" />
                      <view>
                        <nb-card-item  :style="{paddingTop:0, paddingBottom:0, justifyContent: 'space-between'}">
                          <nb-text :style="{fontFamily: 'Lato', fontSize: 11, color: 'black'}">
                          {{ativo.fornecedor}} </nb-text>
                          <nb-text :style="{fontFamily: 'Nunito', fontSize: 15, color: 'black'}">
                          {{ativo.status}}</nb-text>
                        </nb-card-item>
                        <nb-card-item  :style="{ paddingBottom:0, justifyContent: 'space-around'}" >
                            <nb-text :style="{fontFamily: 'RobotoReg', fontSize: 12}">
                              {{ativo.codigo}}    
                            </nb-text>
                            <nb-text :style="{fontFamily: 'RobotoReg', fontWeight: 'bold', fontSize: 12}" > R$ </nb-text>
                            <nb-text :style="{fontFamily: 'RobotoReg', fontSize: 12}">
                               {{ativo.valor}}
                            </nb-text>
                        </nb-card-item>
                        <nb-card-item :style="{paddingTop:0, paddingBottom:10, justifyContent: 'space-around'}" >
                            <nb-text :style="{fontFamily: 'RobotoReg', fontSize: 12}">
                              {{ativo.aquisicao}}
                            </nb-text>
                            <nb-text :style="{fontFamily: 'RobotoReg', fontWeight: 'bold', fontSize: 12}" > NF </nb-text>
                            <nb-text :style="{fontFamily: 'RobotoReg', fontSize: 12}">
                                {{ativo.notaFiscal}}
                            </nb-text>
                        </nb-card-item>
                        <nb-card-item :style="{paddingTop:0, justifyContent: 'space-around'}">
                          <nb-text :style="{fontFamily: 'Roboto', fontSize: 12, fontWeight: 'bold'}">
                            Resp: {{ativo.usuresp}}</nb-text>
                            <touchable-opacity :on-press="() => 
                              { 
                                editarAtivo(ativo); 
                                this.props.navigation.navigate('EditarAtivo');
                              }" >
                              <image :source="require('../../assets/loupe.png')" /> 
                            </touchable-opacity>
                        </nb-card-item>
                      </view>
                      
                    </nb-card-item>
                </nb-card>
      </nb-content>
   </nb-container>
</template>

<script>
import * as Permissions from 'expo-permissions'
import { BarCodeScanner } from 'expo-barcode-scanner'
import Navbar from './../Navbar.vue'
import * as Font from 'expo-font';
import { Container,  Content, Form, Item, Input, Label, Card, CardItem, Text, Body, Toast } from 'native-base';
import { Camera } from 'expo-camera'
import Store from '../../store'
import { Alert } from 'react-native'

export default {
    data() {
        return {
            hasCameraPermission: false,
            type: Camera.Constants.Type.back,
            isAppReady: false, 
            mensagem: '',
            mostra: Store.state.mostraAtivo,
            ativo:  {
                codigo: '', 
                usucri: 'admin', 
                usuresp: 'dirceu.nascimento',
                descricao: '', 
                resumo: '',
                centroCusto: 'DTI',
                notaFiscal: '',
                valor: '0.0',
                fornecedor: 'Dell',
                status: 'ATIVO',
                tipo: 'PROPRIO',
                foto: 'https://controle-bem.s3-sa-east-1.amazonaws.com/ativoGenerico.jpeg',
                aquisicao: '1990-01-31'
            },
        }
    },
    components: {
        Navbar,
        Content, 
        Container, 
        Camera,
        BarCodeScanner,
        Card, CardItem, Text, Toast
    },
    props: { 
        navigation: {
            type: Object
            }
    },
    created () {
        console.log('Ler Codigo','created');
        const st =  Store; 
        const _this = this;
        this.navigation.addListener('willFocus', () => {
            Permissions.askAsync(Permissions.CAMERA)
                .then( status => {
                    console.log('status > ', status)
                    _this.hasCameraPermission = status.status == 'granted' ? true : false
                }).catch( error => { console.log('Ler Codigo', 'error > ' + error.message) })
        })
    },
    mounted: function () {
        console.log('Ler Codigo','mounted')
        Permissions.askAsync(Permissions.CAMERA)
            .then( status => {
                console.log('status > ', status)
                this.hasCameraPermission = status.status == 'granted' ? true : false
            }).catch( error => { console.log('Ler Codigo', 'error > ' + error.message) })
    },
    methods: {
        verificarCamera: async () => {
            console.log('Ler Codigo --- verificarCamera')
            await Store.dispatch('avisarCameraOk');
            console.log('Camera Ok')
        },
        verificarScanned: async ( {type, data} ) => {
            const scanOk = Store.state.scanned
            
            if (!scanOk) {
                console.log('verificarScanned iniciado')
                console.log('Ler Codigo', type)
                console.log('Ler Codigo', data)
                if (data != ''){
                    await Store.dispatch('setarAtivoLido', data)
                    console.log('ativoLido')
                    await Store.dispatch('setScanned')
                    console.log('set scanned')
                    await Store.dispatch('resetErro');
                    console.log('reset erro')
                    await Store.dispatch('lerAtivoPorCodigo', data);
                    console.log('ativo lido por codigo')
                } else {
                    console.log('não consegui ler o codigo')
                }

            }else {
                console.log('camera não ok - scanOk?', scanOk)
            }
        }, 
        async loadFonts() {
            try {
                this.isAppReady = false;
                await Font.loadAsync({
                    Roboto: require("../../fonts/Roboto-Bold.ttf"),
                });
                this.isAppReady = true;
            } catch (error) {
                console.log("some error occurred", error);
                this.isAppReady = true;
            }
        },
        doScanner () {
            console.log('Ler Codigo', 'submit > do Scanner')
            const cameraOk = Store.state.isCameraReady
            console.log('do Scanner > cameraOk? ', cameraOk)
            if (this.verificarPermissao() && cameraOk) {
                console.log('camera ok...')
                const codigoLido =  Store.getters.codigoAtivo
                console.log('codigo ativoLido', codigoLido)
                const erro1 = Store.state.erro
                if (codigoLido != '' && erro1 == ''){
                    this.ativo = Store.getters.ativoPorCodigo
                    Store.dispatch('setScanned')
                    this.mostra = true
                } else {
                    console.log('li zerado ou erro > ', erro1)
                    Toast.show({
                            text:'Não consegui achar o ativo ' + codigoLido,
                            buttonText:'Ok', 
                            position: 'bottom',
                            duration: 3000
                            })
                }
                    
            }else {
                console.log('camera não permitida...')
            }
        }, 
        verificarPermissao: async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync()
            console.log('vue-controle-bem', 'verificarPermissao > ' + status)
            if (status === 'granted') {
                return true
            }
            else {
                return false
            }
        },
        cancel()  {
            console.log('clicou no cancel...');
            try {
                Store.dispatch('resetScanned');
                console.log('resetScanned');
                Store.dispatch('zerarAtivo')
                console.log('ativo zerado...');
                Store.dispatch('resetErro');
                this.mostra = false;
            } catch (error) {
                console.log(error => console.log("erro cancel > ", error))
            }
            
        },
        goBack() {
            this.navigation.navigate('Ativos');
        },
        editarAtivo: (ativoS) => {
            console.log('Ler codigo --> ', ativoS.codigo);
            try {
                Store.dispatch('selectAtivo', ativoS);
            } catch (error) {
                console.log('erro1 :', error)
            }
        
        },
        handleMenu() {
            console.log('Controle Ativos handleMenu');
            this.navigation.openDrawer();
        },
    }
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
    .alinhaCamera {
        align-items: center;
        justify-content: center;
        flex: 1;
    }
    .caixaCamera {
        
        width: 200px;
        height: 200px;
        background-color: transparent;
        
        }
    .container-row {
        margin-top: 50px;
        align-items: center;
        justify-content: space-around;
    }
</style>