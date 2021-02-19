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
                    this.props.navigation.navigate('ControleAtivos');
                }" >
                  <image :source="require('../../assets/delete.png')" /> 
            </touchable-opacity>
        </view>
        <nb-form>
             <nb-item inlineLabel>
                <nb-label>Patrimonio</nb-label>
                <nb-input autoFocus v-model="ativo.codigo" />
            </nb-item>
            <nb-item inlineLabel>
                <nb-label>Resumo</nb-label>
                <nb-input v-model="ativo.resumo" />
            </nb-item>
            <nb-item inlineLabel>
                <nb-label>Descrição</nb-label>
                <nb-textarea :rowSpan="4" bordered placeholder="Descreva mais detalhes..." v-model="ativo.descricao" />
            </nb-item>
             <nb-item inlineLabel>
                <nb-label>Valor R$</nb-label>
                <nb-input v-model="ativo.valor" keyboardType="numeric" />
            </nb-item>
            <nb-item inlineLabel>
                <nb-label>Fornecedor</nb-label>
                <nb-picker
                mode="dropdown"
                :selectedValue="selecionado"
                :onValueChange="callFornecedor"
                >
                <item label="Dell" value="Dell" />
                <item label="Lojas Americanas" value="LojasAmericanas" />
                <item label="Magazine Luiza" value="MagazineLuiza" />
                <item label="Lojas Bahia" value="LojasBahia" />
                <item label="Extra" value="Extra" />
                <item label="Carrefour" value="Carrefour" />
                <item label="Amazon" value="Amazon" />
              </nb-picker>
            </nb-item>
             <nb-item inlineLabel>
                <nb-label>Nota Fiscal</nb-label>
                <nb-input v-model="ativo.notaFiscal" />
            </nb-item>
            <nb-item inlineLabel>
                <nb-label>Centro de Custo</nb-label>
                <nb-picker
                mode="dropdown"
                :selectedValue="selCentroCusto"
                :onValueChange="callCentroCusto"
                >
                <item label="Tecnologia Informação" value="DTI" />
                <item label="Controladoria" value="DCO" />
                <item label="Planejamento" value="DPL" />
                <item label="Vendas" value="OVN" />
                <item label="Marketing" value="DMN" />
                <item label="Engenharia" value="EOP" />
              </nb-picker>
            </nb-item>
            <nb-item inlineLabel>
                <nb-label>Tipo de Ativo</nb-label>
                <nb-picker
                mode="dropdown"
                :selectedValue="selTipoAtivo"
                :onValueChange="callTipoAtivo"
                >
                <item label="Próprio" value="PROPRIO" />
                <item label="Terceiros" value="TERCEIROS" />
              </nb-picker>
            </nb-item>
            <nb-item inlineLabel>
                <nb-label>Responsável</nb-label>
                <nb-picker
                mode="dropdown"
                :selectedValue="selResponsavel"
                :onValueChange="callResponsavel"
                >
                <item label="Dirceu" value="dirceu.nascimento" />
                <item label="Flávio" value="flavio.rodhen" />
                <item label="Sheila" value="sheila.cruz" />
                <item label="Sonia" value="sonia.maria" />
              </nb-picker>
            </nb-item>
             <nb-item inlineLabel>
                <nb-label>Foto</nb-label>
                <nb-thumbnail square large :source="{uri: ativo.foto}" />
                <nb-button primary :on-press="uploadFoto"><nb-text>Upload</nb-text></nb-button>
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
            codigo: 0, 
            usucri: 'admin', 
            criacao: undefined,
            descricao: '', 
            resumo: '',
            centroCusto: 'DTI',
            notafiscal: 0,
            valor: 0.0,
            fornecedor: 'Dell',
            status: 'ATIVO',
            tipo: 'PROPRIO',
            foto: ''
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
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            }
            ImagePicker.launchImageLibraryAsync(pickerOptions)
                 .then( response => {
                    console.log('saida imagepicker ...', response);
                    console.log('uri imagepicker ...', response.uri);
                    _this.ativo.foto = response.uri;
                    if (_this.hasFotoLibraryPermissions){
                        console.log('pode usar files...');
                        try {
                            console.log('enviando foto via api...');
                            const myoptions = {
                                httpMethod: 'POST',
                                uploadType: FileSystem.FileSystemUploadType.MULTIPART,
                                fieldName: 'file'
                            };
                            FileSystem.uploadAsync(`http://192.168.0.20:8082/ativos/picture/${_this.ativo.id}`, response.uri, myoptions)
                                .then( (response) => {
                                    console.log('response upload Ok ...', response);
                                    _this.ativo.foto = { uri: response.headers.Location };
                                }).catch( (error) => { 
                                    console.log('error upload...', error);
                                })
                        } catch (error) {
                            console.log('Error: ', error)
                        }
                        
                    } else {
                        console.log('não pode usar files...');
                    }

                 })
                 .catch( e => {
                     console.log('erro no imagepicker > ', e);
                 })

            //console.log('uploadFoto de ...', this.fileUri);
            
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
                FileSystem.uploadAsync(`http://192.168.0.20:8082/ativos/picture/${_this.ativo.id}`, response.uri, myoptions)
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
                    this.navigation.navigate('ControleAtivos');
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
        }   
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