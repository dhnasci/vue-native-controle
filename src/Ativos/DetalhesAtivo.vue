<template>
   <nb-container>
      <Navbar @openDrawer="handleMenu" />
      <scroll-view>
      <nb-content class="home-container">
        <view class ="drawer-text">
            <text style="font-family: Roboto; font-style: normal; font-weight: bold; font-size: 18; line-height: 21; margin-bottom: 10;">
                Detalhes do Ativo </text>
        </view>
        
        <nb-form>
            <nb-item inlineLabel>
            <nb-label>Patrimonio</nb-label>
            <nb-input autoFocus v-model="ativo.codigo" disabled />
        </nb-item>
        <nb-item inlineLabel >
            <nb-label>Resumo</nb-label>
            <nb-input multiline :numberOfLines="2" v-model="ativo.resumo" disabled textBreakStrategy="balanced" />
        </nb-item>
        <nb-item inlineLabel>
            <nb-label>Descrição</nb-label>
            <nb-input multiline :numberOfLines="3" disabled v-model="ativo.descricao" textBreakStrategy="balanced"  />
        </nb-item>
            <nb-item inlineLabel disabled>
            <nb-label>Valor R$</nb-label>
            <nb-input v-model="ativo.valor" disabled/>
        </nb-item>
        <nb-item inlineLabel>
            <nb-label>Fornecedor</nb-label>
            <nb-input v-model="ativo.fornecedor" disabled/>
        </nb-item>
            <nb-item inlineLabel>
            <nb-label>Nota Fiscal</nb-label>
            <nb-input v-model="ativo.notaFiscal" disabled />
        </nb-item>
            <nb-item inlineLabel disabled>
            <nb-label>Aquisição</nb-label>
            <nb-input v-model="ativo.aquisicao" disabled/>
        </nb-item>
        <nb-item inlineLabel>
            <nb-label>Tipo de Ativo</nb-label>
            <nb-input v-model="ativo.tipo" disabled/>
        </nb-item>
        <nb-item inlineLabel class="container-row">
            <nb-label>Foto</nb-label>
            <nb-thumbnail square large :source="{uri: ativo.foto}" />
        </nb-item>
        
            <nb-item inlineLabel>
            <nb-label>Responsável</nb-label>
            <nb-input v-model="ativo.usuresp" disabled/>
        </nb-item>
        <nb-item inlineLabel>
            <nb-label>Centro de Custo</nb-label>
            <nb-input v-model="ativo.centroCusto" disabled/>
        </nb-item>
        <nb-item inlineLabel>
            <nb-label>Status</nb-label>
            <nb-input v-model="ativo.status" disabled/>
        </nb-item>
        </nb-form>
        <nb-card transparent>
            <nb-card-item  class="container-row">
                <touchable-opacity :on-press="() => 
                    { 
                        this.props.navigation.navigate('Ativos');
                    }" >
                    <image :source="require('../../assets/arrow_back.png')" /> 
                </touchable-opacity>
            </nb-card-item>
        </nb-card>
        
      </nb-content>
      </scroll-view>
  </nb-container>
</template>

<script>
import Navbar from './../Navbar.vue';
import * as Font from 'expo-font';
import { Container,  Content, Form, Item, Input, Label, Card, CardItem, Text, Body, Toast } from 'native-base';
import Store from '../../store';


export default {
    components: {
		Navbar,
        Content, 
        Container, 
        Form, 
        Item, 
        Input, 
        Label,
        Card, CardItem, Text, Body, Toast
	},
    props: { 
        navigation: {
            type: Object
            }
    },
    data() {
      return{ 
          hasCameraPermission: false,
          hasLibraryPermission: false,
          hasFotoLibraryPermissions: false,
          fileUri: '',
          ativo: {
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
        ativoSelect: Store.state.ativoSelecionado,
      }
    },
    created() {
        this.loadFonts();
        console.log('DetalhesAtivo created...');
        this.sincronizar(this.ativoSelect);
        if (this.ativoSelect) {
            this.ativo = this.ativoSelect;
        }
        const st =  Store; 
        const _this = this;
        this.navigation.addListener('willFocus', () => {
            console.log('ativou focus detalhes plus... ', st.state.ativoSelecionado);
        
            _this.sincronizar(st.state.ativoSelecionado);
            if (st.state.ativoSelecionado) {
                _this.ativo = st.state.ativoSelecionado;
            }
        });
    },
    watch: {
        ativoSelect( ativoNovo, ativoAntigo) {
            this.sincronizar(ativoNovo)
      }
    },
    methods: {
        sincronizar(novoAtivo) {
            this.ativo = Object.assign( {}, novoAtivo || this.ativo);
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
    .container-row {
            margin-top: 50px;
            align-items: center;
            justify-content: space-around;
        }
</style>