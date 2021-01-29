<template>
    <view class="container">
        <view class="container-toolbar">
            <text class="text-color-login">Controle Bem</text>
        </view>
        <view class="container-row">
            <text class="text-label-login">Usuário </text>
            <text-input
                :style="{
                    height: 27, 
                    width: 134, 
                    borderColor: 'gray', 
                    backgroundColor:'#C4C4C4', 
                    borderWidth: 1,
                    marginLeft: 16
                    }"
                v-model="usuario"
             />
        </view>
        <view class="container-row-senha">
            <text class="text-label-login">Senha </text>
             <text-input
                text-content-type="password"
                :style="{
                    height: 27, 
                    width: 134, 
                    borderColor: 'gray', 
                    backgroundColor: '#C4C4C4',  
                    borderWidth: 1,
                    marginLeft: 29
                    }"
                v-model="senha"
             />
        </view>
        <view class="container-row-one-btn">
            <touchable-opacity class="button-blue" :on-press="doLogin">
                <text class="button-text">LOGIN</text>
            </touchable-opacity>
        </view>
        <view class="container-row-one-btn">
            <touchable-opacity class="link-esqueci-senha" :on-press="doEsqueciSenha">
                <text class="text-label-login">Esqueci minha senha</text>
            </touchable-opacity>
        </view>
    
    </view>
</template>

<script>
export default {
    props: {
        navigation: {
        type: Object
        }
    },
    data () {
        return { 
            usuario: '', 
            senha: ''
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
            console.log("vue-controle-bem > ", this.usuario);
            console.log("vue-controle-bem > ", this.senha);
            this.navigation.navigate("Home");
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
        margin-top: 143px;
        width: 250px;
        height: 330px;
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

    .container-row {
        margin-top: 36px;
        flex-direction: row;
    }

    .container-row-senha {
        margin-top: 19px;
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
</style>