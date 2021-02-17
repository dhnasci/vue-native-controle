import Vue from 'vue-native-core'
import Vuex from 'vuex'

import UsuarioService from '../src/Services/UsuarioService'
import AtivoService from '../src/Services/AtivoService'

Vue.use(Vuex)

const state = {
    usuarioSelecionado: undefined,
    ativoSelecionado: undefined,
    usuarios: [],
    erro: '', 
    ativos: [],
    idUsuarioCriado: undefined
}

const actions = {
    selectUsuario: ( {commit}, usuario) => {
        commit('SELECIONA_USUARIO', usuario)
    }, 
    listarUsuarios: async ({ commit }) => {
        try {
          const response = await UsuarioService.getUsuarios();
          commit('LISTAR_USUARIOS', { usuarios: response.data })
        } catch (erro) {
          commit('SETAR_ERRO', { erro })
        }
    },
    criarUsuario: ({ commit }, {usuario}) => {
        console.log('criarUsuario entrou')
        return UsuarioService.postUsuario(usuario)
            .then((response) => {
                console.log('url > ', response.headers.location);
                var url_criada = response.headers.location.split('/');
                const idUsuario = url_criada[4];
                console.log('id > ', idUsuario);
                commit('SETAR_ID_USUARIO', idUsuario);
            })
            .catch(erro => {
                console.log('criarUsuario erro', erro);
                commit('SETAR_ERRO', { erro })
            })
    }, 
    editarUsuario: async ( {commit}, {usuario}) => {
        console.log('action editarUsuario...');
        try {
            const response = await UsuarioService.putUsuario(usuario)
               .then((response) => {
                console.log('response Service ok... ', response);
                commit('EDITAR_USUARIO', { usuario: response.data})
               })
               .catch(erro => {
                console.log('error response Service...', erro)
                commit('SETAR_ERRO', {erro})
               })
            
        } catch (erro) {
            commit('SETAR_ERRO', {erro})
        }
    },
    removerUsuario: async ( {commit}, {usuario}) => {
        console.log('action removerUsuario...');
        try {
            const response = await UsuarioService.removeUsuario(usuario.id)
                .then( (response) => {
                    console.log('response Service ok... ', response)
                    commit('REMOVER_USUARIO', {usuario})
                }).catch(erro => {
                    console.log('error response Service...', erro)
                    commit('SETAR_ERRO', {erro})
                })
            
            
        } catch (erro) {
            commit('SETAR_ERRO', {erro})
        }
        
    },
    buscarUsuarioId: async ( {commit} , id ) => {
        console.log('buscarUsuario action > ', id);
        try {
            const response = await UsuarioService.getUsuarioPorId(id)
                .then((response) => {
                    commit('CRIAR_USUARIO', {usuario: response.data} );
                })
                .catch((erro) => {
                    commit('SETAR_ERRO', {erro});
                })
            
        } catch (erro) {
            console.log('Erro ao buscar Id do Usuario > ', erro)
        }

    },
    listarAtivos: async ({ commit }) => {
        try {
          const response = await AtivoService.getAtivos();
          commit('LISTAR_ATIVOS', { ativos: response.data })
        } catch (erro) {
          commit('SETAR_ERRO', { erro })
        }
    },
    selectAtivo: ( {commit}, ativo) => {
        commit('SELECIONA_ATIVO', ativo)
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
        console.log('mutation SETAR ERRO > ', erro)
        state.erro = erro
    },
    CRIAR_USUARIO: (state, { usuario }) => {
        console.log('entrou mutation CRIAR_USUARIO ', usuario )
        state.usuarios.push(usuario)
    },
    SETAR_ID_USUARIO: (state, id) => {
        console.log('entrou mutation SETAR_ID_USUARIO ', id)
        state.idUsuarioCriado = id
    }, 
    EDITAR_USUARIO: (state, {usuario}) => {
        const indice = state.usuarios.findIndex( p => p.id === usuario.id)
        state.usuarios.splice(indice, 1, usuario)
    }, 
    REMOVER_USUARIO: (state, {usuario}) => {
        console.log('entrou mutation REMOVER_USUARIO ')
        const indice = state.usuarios.findIndex( p => p.id === usuario.id)
        state.usuarios.splice(indice, 1)
    },
    LISTAR_ATIVOS: ( state, {ativos}) => {
        state.ativos = ativos
    },
    SELECIONA_ATIVO: (state, ativo)=>{
        state.ativoSelecionado = ativo
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