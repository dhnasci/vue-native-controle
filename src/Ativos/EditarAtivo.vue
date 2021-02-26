<template>
  <nb-container>
      <Navbar @openDrawer="handleMenu" />
      <scroll-view>
      <nb-content class="home-container">
          <view class ="drawer-text">
          <text style="font-family: Roboto; font-style: normal; font-weight: bold; font-size: 18; line-height: 21; margin-bottom: 10;">
            Edição de Ativos </text>
            <touchable-opacity :on-press="() => 
                { 
                    removeAtivo();
                    this.props.navigation.navigate('Ativos');
                }" >
                  <image :source="require('../../assets/delete.png')" /> 
            </touchable-opacity>
        </view>
        <nb-form>
             <nb-item inlineLabel>
                <nb-label>Patrimonio*</nb-label>
                <nb-input autoFocus v-model="ativo.codigo" />
            </nb-item>
            <nb-item inlineLabel>
                <nb-label>Resumo*</nb-label>
                <nb-input 
                    multiline 
                    :numberOfLines="3" 
                    v-model="ativo.resumo" 
                    textBreakStrategy="balanced" />
            </nb-item>
            <nb-item inlineLabel>
                <nb-label>Descrição*</nb-label>
                <nb-input 
                    multiline 
                    :numberOfLines="4" 
                    placeholder="Descreva mais detalhes..." 
                    v-model="ativo.descricao"
                    textBreakStrategy="balanced" />
            </nb-item>
             <nb-item inlineLabel disabled>
                <nb-label>Valor* R$</nb-label>
                <nb-input v-model="ativo.valor" keyboard-type="numeric"/>
            </nb-item>
             <nb-item inlineLabel>
                <nb-label>Nota Fiscal*</nb-label>
                <nb-input v-model="ativo.notaFiscal" keyboard-type="numeric" />
            </nb-item>
             <nb-item inlineLabel disabled>
                <nb-label>Aquisição</nb-label>
                <nb-input v-model="ativo.aquisicao" disabled/>
                
            </nb-item>
            <nb-item inlineLabel>
                <nb-label>Fornecedor</nb-label>
                <nb-input v-model="ativo.fornecedor" disabled/>
               
            </nb-item>
           
            <nb-item inlineLabel>
                <nb-label>Centro de Custo</nb-label>
                    <nb-input v-model="ativo.centroCusto" disabled/>
            </nb-item>
            <nb-item inlineLabel>
                <nb-label>Tipo de Ativo</nb-label>
                <nb-input v-model="ativo.tipo" disabled/>
                
            </nb-item>
            <nb-item inlineLabel>
                <nb-label>Responsável</nb-label>

                <nb-input v-model="ativo.usuresp" disabled/>
            </nb-item>
             <nb-item inlineLabel class="container-row">
                <nb-label>Foto</nb-label>
                <nb-thumbnail square large :source="{uri: ativo.foto}" />
                <nb-button rounded info :on-press="uploadFoto">
                    <nb-text>ACHAR</nb-text></nb-button>
            </nb-item>
             <nb-card transparent>
            <nb-card-item  class="container-row">
                      <nb-button rounded success :on-press="submit" >
                  <nb-text>Concluir</nb-text>
              </nb-button>
              <nb-button rounded primary :on-press="cancel" >
                  <nb-text>Cancelar</nb-text>
              </nb-button>
            </nb-card-item>
          </nb-card>
        </nb-form>
      </nb-content>
      </scroll-view>
  </nb-container>
</template>

<script>
import Navbar from './../Navbar.vue'
import * as Font from 'expo-font';
import { Container,  Content, Form, Item, Input, Label, Card, CardItem, Text, Body, Toast } from 'native-base';
import Store from '../../store'
import { Alert } from 'react-native'
import * as Permissions from 'expo-permissions'
import * as FileSystem from 'expo-file-system'
import * as ImagePicker from 'expo-image-picker'

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
          selecionado: 'Dell',
          selCentroCusto: 'DTI',
          selTipoAtivo: 'PROPRIO',
          selResponsavel: 'dirceu.nascimento',
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
        console.log('Editar Ativo created...');
        this.sincronizar(this.ativoSelect);
        if (this.ativoSelect) {
            this.ativo = this.ativoSelect;
        }
        const st =  Store; 
        const _this = this;
        this.navigation.addListener('willFocus', () => {
            console.log('ativou focus editar plus... ', st.state.ativoSelecionado);
        
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
    mounted() {
        console.log('vue-controle-bem','mounted')
        const _this = this;
        Permissions.askAsync(Permissions.CAMERA)
            .then( status => {
                _this.hasCameraPermission = status.status == 'granted' ? true : false
            }).catch( error => { console.log('error Camera', 'error > ' + error.message) });
        Permissions.askAsync(Permissions.MEDIA_LIBRARY)
            .then( status => { 
                _this.hasLibraryPermission = status.status == 'granted' ? true : false;
                }).catch( error => { console.log('error Library', 'error > ' + error.message) });
        
        ImagePicker.requestMediaLibraryPermissionsAsync()
            .then( status => {
                console.log('status foto library permissions > ', status);
                _this.hasFotoLibraryPermissions = status == 'granted' ? true : false;
            })
    },
    methods: {
        async ensureDirectoryExist(myDir) {
            const dirInfo = await FileSystem.getInfoAsync(myDir);
            if (!dirInfo.exists) {
                console.log('cbem não existe ainda... criando...');
                await FileSystem.makeDirectoryAsync(myDir, { intermediates: true});
                console.log('cbem criado...')
            }
        },
        callFornecedor(value, index) {
            console.log('vue-controle-bem Fornecedor Status ', value);
            console.log('vue-controle-bem Fornecedor index ', index);
            this.selecionado = value;
        },
        callCentroCusto(value, index) {
            console.log('vue-controle-bem Centro Custo Status ', value);
            console.log('vue-controle-bem Centro Custo index ', index);
            this.selCentroCusto = value;
        },
        callTipoAtivo(value, index) {
            console.log('vue-controle-bem Tipo Ativo Status ', value);
            console.log('vue-controle-bem Tipo Ativo index ', index);
            this.selTipoAtivo = value;
        },
        callResponsavel(value, index){
            console.log('vue-controle-bem Tipo Ativo Status ', value);
            console.log('vue-controle-bem Tipo Ativo index ', index);
            this.selResponsavel = value;
        },
        uploadFoto() {
            console.log('rodando o imagepicker...');
            const _this = this;
            const pickerOptions = {
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            }
            ImagePicker.launchImageLibraryAsync(pickerOptions)
                 .then( response => {
                    console.log('saida imagepicker ...', response);
                    console.log('uri imagepicker ...', response.uri);
                    _this.ativo.foto = response.uri;
                 })
                 .catch( e => {
                     console.log('erro no imagepicker > ', e);
                 })            
        },
        sincronizar(novoAtivo) {
            this.ativo = Object.assign( {}, novoAtivo || this.ativo);
        },
        submit() {
            console.log('clicou no submit...', this.ativo);
            Store.state.erro= '';
            // atualiza update de foto 
            if (this.hasFotoLibraryPermissions){
                console.log('faz update da foto...', this.ativo);
                const myoptions = {
                    httpMethod: 'POST',
                    uploadType: FileSystem.FileSystemUploadType.MULTIPART,
                    fieldName: 'file'
                };
                FileSystem.uploadAsync(`http://192.168.0.20:8082/ativos/picture/${_this.ativo.id}`, _this.ativo.foto, myoptions)
                    .then( response => {
                        console.log('response foto upload ok...', response);
                    }).catch( (error) => { 
                        console.log('error upload...', error);
                    })
            }
            Store.dispatch('editarAtivo', { ativo: this.ativo })
                .then(() => {
                    if (Store.state.erro != '') {
                        console.log('erro > ', Store.state.erro);
                        Toast.show({
                            text:'Erro: ' + Store.state.erro,
                            buttonText:'Ok', 
                            position: 'bottom',
                            duration: 3000
                            })
                    }else {
                        Toast.show({
                            text:'Ativo editado com sucesso',
                            buttonText:'Ok', 
                            position: 'bottom',
                            duration: 2000
                            })
                        this.navigation.navigate('Ativos');
                    }
                }).catch(error => console.log('Erro > ', error));
                
        }, 
        cancel() {
            console.log('clicou no cancel...');
            this.navigation.navigate('Home');
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
        removeAtivo() {
            Store.state.erro = '';
            const _this = this;
            Alert.alert(
                'Confirmação',
                'Deseja realmente remover Ativo?',
                [
                { 
                    text: 'SIM', onPress: () => { _this.confirmaRemocao(); } 
                }, 
                { 
                    text: 'NÃO', onPress: () => { console.log('Não faz nada...'); }
                }, 
                ]
            );
            
        }, 
        confirmaRemocao() {
            try {
                Store.dispatch('removerAtivo', {ativo: this.ativo})
                .then(() => { 
                    if (Store.state.erro != '') {
                        console.log('erro > ', Store.state.erro);
                        Toast.show({
                            text:'Erro: ' + Store.state.erro,
                            buttonText:'Ok', 
                            position: 'bottom',
                            duration: 3000
                            })
                    }else {
                        console.log('Ativo removido com sucesso');
                        Toast.show({
                            text:'Ativo removido com sucesso',
                            buttonText:'Ok', 
                            position: 'bottom',
                            duration: 2000
                            })
                    }  
                }).catch(error => console.log('erro promise removerAtivo > ', error));
                
            } catch (error) {
                console.log('não consegui remover Ativo ... ', error)
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
  .container-row-one-btn {
        margin-top: 50px;
        align-items: center;
        justify-content: center;
    }
  .container-row {
        margin-top: 50px;
        align-items: center;
        justify-content: space-around;
    }

</style>