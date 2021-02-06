import Vue from 'vue-native-core'
import Vuex from 'vuex'

import UsuarioService from '../src/Services/UsuarioService'

Vue.use(Vuex)

const state = {
    usuarioSelecionado: undefined,
    usuarios: [],
    error: undefined
}

const actions = {
    selectUsuario: ( {commit}, usuario) => {
        commit('SELECIONA_USUARIO', usuario)
    }, 
    listarUsuarios: async ({ commit }) => {
        try {
          const response = await UsuarioService.getUsuarios();
          commit('LISTAR_USUARIOS', { usuarios: response.data })
          console.log('usuarios na action..' , usuarios)
        } catch (erro) {
          commit('SETAR_ERRO', { erro })
        }
    },
    criarUsuario: ({ commit }, {usuario}) => {
        console.log('criarUsuario entrou')
        return UsuarioService.postUsuario(usuario)
            .then((response) => {
                commit('CRIAR_USUARIO', {usuario: response.data})
                console.log('response > ', response);
            })
            .catch(erro => {
                console.log('criarUsuario erro', erro);
                commit('SETAR_ERRO', { erro })
            })
    }
}

const mutations = {
    SELECIONA_USUARIO: (state, usuario)=>{
        state.usuarioSelecionado = usuario
    },
    LISTAR_USUARIOS: ( state, {usuarios}) => {
        state.usuarios = usuarios
    },
    SETAR_ERRO: (state, { erro }) => {
        state.erro = erro
    },
    CRIAR_USUARIO: (state, { usuario }) => {
        console.log('entrou mutation CRIAR_USUARIO ', usuario )
        usuario.login = usuario.nome + '.' + usuario.sobrenome
        console.log('login > ', usuario.login)
        state.usuarios.push(usuario)
    },
}

const store = new Vuex.Store(
    {
        state,
        actions,
        mutations
    }
)

export default store