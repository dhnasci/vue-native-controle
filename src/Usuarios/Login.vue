<template>
    <nb-container class="container">
        <view class="container-toolbar">
            <text class="text-color-login">Controle Bem</text>
        </view>
        <nb-content class="content-box">
            <nb-form>
                <nb-item inlinelabel class="container-row">
                    <text class="text-label-login">Usuário</text>
                    <nb-input v-model="usuario" />
                </nb-item>
                <nb-item class="container-row-senha">
                    <text class="text-label-login">Senha </text>
                    <nb-input secureTextEntry  v-model="senha"  />
                </nb-item>
                <nb-item class="container-row-one-btn">
                    <touchable-opacity class="button-blue" :on-press="doLogin">
                        <text class="button-text">LOGIN</text>
                    </touchable-opacity>
                </nb-item>
                <nb-item class="container-row-one-btn">
                <touchable-opacity class="link-esqueci-senha" :on-press="doEsqueciSenha">
                    <text class="text-link">Esqueci minha senha</text>
                </touchable-opacity>
                </nb-item>
            </nb-form>
        </nb-content>
    </nb-container>
</template>

<script>

import { Container, Content, Form, Item, Input, Toast } from "native-base";
import Store from '../../store'

export default {
    props: {
        navigation: {
        type: Object
        }
    },
    components: {
        Container,
        Content, 
        Form, 
        Item, 
        Input,
        Toast
    },
    data () {
        return { 
            usuario: undefined, 
            senha: undefined
        }
    },    
    created () {
        console.log("vue-controle-bem > Login Created");
    }, 

    mounted () {
        console.log("vue-controle-bem > mounted ");
    },
    methods: {
        doLogin () {
            console.log("vue-controle-bem > Do Login pressed");
            console.log("login > ", this.usuario);
            console.log("senha > ", this.senha);
            if (this.usuario == undefined || this.senha == undefined) {
                Toast.show({
                    text:'login ou senha não preenchida',
                    buttonText:'Ok', 
                    position: 'bottom',
                    duration: 3000
                    })

            } else {
                const credential = {
                    login: this.usuario,
                    senha: this.senha
                }
                const _this = this;
                const st = Store;
                Store.dispatch('fazerLogin',  {credential})
                .then(() => {
                    if (st.state.autenticado){
                        _this.navigation.navigate("Home");
                    } else {
                        console.log(st.state.erro);
                        Toast.show({
                                text:'Login não autenticado',
                                buttonText:'Ok', 
                                position: 'bottom',
                                duration: 3000
                                })
                    }
                }).catch((erro) => {
                    console.log('Erro no login ', erro)
                    
                })
            }
            
            
            
        },
        doEsqueciSenha() {
            console.log("vue-controle-bem > Do Esqueci Senha");
            this.navigation.navigate("EsqueciSenha");
        }
    }
}
</script>

<style>
    .container {
        margin-top: 120px;
        margin-bottom: 120px;
        width: 250px;
        height: 360px;
        min-height: 300px;
        background-color: #E5E5EF;
        margin-left: 55px;
        border-radius: 10px;
    }

    .container-toolbar {
        margin-top: 0px;
        width: 250px;
        height: 50px;
        background-color: #3F51B5;
        align-items: center;
        justify-content: center;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }

    .content-box {
        margin-right: 10px;
    }

    .container-row {
        margin-top: 30px;
        flex-direction: row;
    }

    .container-row-senha {
       
        flex-direction: row;
    }

    .container-row-one-btn {
        margin-top: 50px;
        align-items: center;
        justify-content: center;
    }

    .text-color-login {
        color: white;
        font-weight: bold;
        font-size: 23;
    }

    .text-label-login {
        color: black;
        font-weight: bold;
        font-size: 18;
        margin-left: 15px;
    }

    .button-blue {
        border-radius: 10px;
        background-color: #3F51B5;
        width: 150px;
        height: 30px;
        align-items: center;
        justify-content: center;
    }

    .button-text {
        color:white;
        font-size: 16;
        
    }

    .link-esqueci-senha {
        align-items: center;
        justify-content: center;
    }

    .text-link {
        color: black;
        font-weight: bold;
        font-size: 15;
        
    }
</style>