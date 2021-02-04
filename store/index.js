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
          const response = await UsuarioService.getUsuarios()
          commit('LISTAR_USUARIOS', { usuarios: response.data })
          console.log('usuarios na action..' , usuarios)
        } catch (erro) {
          commit('SETAR_ERRO', { erro })
        }
      },
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
      }
}

const store = new Vuex.Store(
    {
        state,
        actions,
        mutations
    }
)

export default store