import Vue from 'vue-native-core'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    usuarioSelecionado: undefined,
    usuarios: [],
}

const actions = {
    selectUsuario: ( {commit}, usuario) => {
            commit('selecionaUsuario', usuario)
    }
}

const mutations = {
    selecionaUsuario: (state, usuario)=>{
        state.usuarioSelecionado = usuario
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