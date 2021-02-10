import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'http://192.168.0.20:8082',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })

export default {
    getUsuarios() {
        return apiClient.get('/usuarios')
    },
    postUsuario(usuario) {
      console.log('postUsuario ', usuario)
      return apiClient.post('/usuarios', usuario)
    },
    getUsuarioPorId(id) {
      console.log('getUsuarioPorId UsuarioService > ', id)
      return apiClient.get(`/usuarios/${id}`)
    },
    removeUsuario(id) {
      console.log('removeUsuario em Usuario Service', id)
      return apiClient.delete(`/usuarios/${id}`)
    },
    putUsuario(usuario) {
      console.log('edita usuario no UsuarioService > ', usuario)
      return apiClient.put(`/usuarios/${usuario.id}`, usuario)
    }

}