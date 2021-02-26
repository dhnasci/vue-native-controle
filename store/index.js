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
    idUsuarioCriado: undefined,
    idAtivoCriado: undefined,
    scanned: false,
    ativoLido: '', // só o codigo
    ativoScanned: undefined,  // tudo,
    isCameraReady: false,
    mostraAtivo: false,
    autenticado: false,
    perfil: ''
}

const getters = {
    codigoAtivo: state => state.ativoLido,
    ativoPorCodigo: state => state.ativoScanned
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
    fazerLogin: async ( { commit }, {credential}) => {
        console.log('action fazerLogin > ', credential);
        try {
            await UsuarioService.getLogin(credential)
                .then((response) => {
                    const usuario = response.data;
                    if (usuario.login != 'nao.autenticado'){
                        commit('SETAR_AUTENTICADO')
                        commit('SETAR_PERFIL', usuario.perfil)
                    } else {
                        const erro1 = 'Erro: Senha não confere'
                        commit('SETAR_ERRO', {erro1});
                        commit('RESETAR_AUTENTICADO')
                    }

                }).catch( erro => {
                    console.log('erro no Login ', erro)
                    commit('SETAR_ERRO', {erro});
                })
              

        } catch (error) {
            
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
    editarAtivo: async ({ commit }, {ativo}) => {
        console.log('action editarAtivo...', ativo)
        try {
            const response = await AtivoService.putAtivo(ativo);
            console.log('response Service ok... ', response)
            commit('EDITAR_ATIVO', { ativo: response.data })
        } catch (erro) {
            commit('SETAR_ERRO', { erro })
            
        }
    },
    atualizarImagemAtivo: ( { commit }, {ativo} ) => {
        console.log('action atualizarImagemAtivo...', ativo);
        commit('ATUALIZAR_IMAGEM', {ativo})
    },
    criarAtivo: ({ commit }, {ativo}) => {
        console.log('criarAtivo entrou')
        return AtivoService.postAtivo(ativo)
            .then((response) => {
                console.log('url > ', response.headers.location);
                var url_criada = response.headers.location.split('/');
                const idAtivo = url_criada[4];
                console.log('id > ', idAtivo);
                commit('SETAR_ID_ATIVO', idAtivo);
            })
            .catch(erro => {
                console.log('criarAtivo erro', erro);
                commit('SETAR_ERRO', { erro })
            })
    }, 
    removerAtivo: async ({commit}, {ativo}) => {
        console.log('action removerAtivo...')
        try {
            const resp = await AtivoService.removeAtivo(ativo.id)
                .then( () => {
                    commit('REMOVER_ATIVO', { ativo });
                }).catch( erro => {
                    console.log('action removerAtivo error...', erro);
                    commit('SETAR_ERRO', { erro });
                })
        } catch (erro) {
            commit('SETAR_ERRO', { erro });
        }
    }, 
    setarAtivoLido: ( {commit}, ativoLido ) => {
        commit('SETAR_ATIVO_LIDO', ativoLido)
    },
    setScanned: ( {commit} ) => {
        commit('SETAR_SCAN')
    },
    resetScanned: ({commit} ) => {
        commit('RESETAR_SCAN')
    },
    lerAtivoPorCodigo: async ( {commit}, codigo ) => {
        try {
            const resp = await AtivoService.getAtivoPorCodigo(codigo)
            commit('SETAR_ATIVO', { ativo: resp.data })
        } catch (erro) {
            commit('SETAR_ERRO', { erro })
        }
    },
    getPorCentroDeCusto: async ( {commit}, centroCusto  ) => {
        try {
            const resp = await AtivoService.getAtivoPorCentroCusto(centroCusto)
            commit('LISTAR_ATIVOS', { ativos: resp.data })
        } catch (erro) {
            commit('SETAR_ERRO', { erro })
        }
    },
    getPorStatus: async ( {commit} , status  ) => {
        try {
            const resp = await AtivoService.getAtivoPorStatus(status)
            commit('LISTAR_ATIVOS', { ativos: resp.data })
        } catch (erro) {
            commit('SETAR_ERRO', { erro })
        }
    },
    zerarAtivo: ( {commit} ) => {
        commit('ZERAR_ATIVO')
    }, 
    avisarCameraOk: ({commit} ) => {
        commit('SETAR_CAMERA_OK')
    },
    mostrarAtivo: ({ commit }) => {
		commit('MOSTRAR_ATIVO')
	},
    resetErro: ( {commit} ) => {
        commit('RESET_ERRO')
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
        console.log('mutation REMOVER_USUARIO ')
        const indice = state.usuarios.findIndex( p => p.id === usuario.id)
        state.usuarios.splice(indice, 1)
    },
    SETAR_AUTENTICADO: (state) => {
        console.log('mutation SETAR_AUTENTICADO')
        state.autenticado = true
    },
    RESETAR_AUTENTICADO: (state) => {
        console.log('mutation RESETAR_AUTENTICADO')
        state.autenticado = false
    },
    SETAR_PERFIL: (state, perfil) => {
        console.log('Mutation SETAR_PERFIL ', perfil)
        state.perfil = perfil
    },
    LISTAR_ATIVOS: ( state, {ativos}) => {
        state.ativos = ativos
    },
    SELECIONA_ATIVO: (state, ativo)=>{
        state.ativoSelecionado = ativo
    },
    SETAR_ATIVO: (state, { ativo })=>{
        console.log('mutation SETAR_ATIVO ', ativo)
        state.ativoScanned = ativo
    },
    EDITAR_ATIVO: (state, ativo) => {
        const indice = state.ativos.findIndex( p => p.id === ativo.id)
        state.ativos.splice(indice, 1, ativo)
    }, 
    CRIAR_ATIVO: (state, { ativo }) => {
        console.log('entrou mutation CRIAR_ATIVO ', ativo )
        state.ativos.push(ativo)
    },
    SETAR_ID_ATIVO: (state, id) => {
        console.log('entrou mutation SETAR_ID_ATIVO ', id)
        state.idAtivoCriado = id
    },
    ATUALIZAR_IMAGEM: (state, ativo) => {
        const indice = state.ativos.findIndex( p => p.id === ativo.id)
        state.ativos.splice(indice, 1, ativo)
    },
    REMOVER_ATIVO: ( state, {ativo}) => {
        console.log('mutation REMOVER_ATIVO...', ativo.id);
        const indice = state.ativos.findIndex( p => p.id === ativo.id)
        state.ativos.splice(indice, 1)
    }, 
    SETAR_ATIVO_LIDO: (state, ativoLido) => {
        state.ativoLido = ativoLido
    },
    SETAR_SCAN: (state) => {
        state.scanned = true
    },
    RESETAR_SCAN: (state) => {
        state.scanned = false
    },
    ZERAR_ATIVO: (state) => {
        state.ativoLido = ''
    },
    SETAR_CAMERA_OK: (state) => {
        state.isCameraReady = true;
    },
    MOSTRAR_ATIVO: ( state ) => {
		state.mostraAtivo = true;
	},
    RESET_ERRO: (state) => {
        state.erro = ''
    }
}


const store = new Vuex.Store(
    {
        state,
        getters,
        actions,
        mutations
    }
)

export default store