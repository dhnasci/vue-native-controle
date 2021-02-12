import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'http://192.168.0.20:8082',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })

export default {
    getAtivos() {
        return apiClient.get('/ativos')
    },
    postAtivo(ativo) {
      console.log('postAtivo ', ativo)
      return apiClient.post('/ativos', ativo)
    },
    getAtivoPorId(id) {
      console.log('getAtivoPorId AtivoService > ', id)
      return apiClient.get(`/ativos/${id}`)
    },
    removeAtivo(id) {
      console.log('removeAtivo em ativo Service', id)
      return apiClient.delete(`/ativos/${id}`)
    },
    putAtivo(ativo) {
      console.log('edita ativo no AtivoService > ', ativo)
      return apiClient.put(`/ativos/${ativo.id}`, ativo)
    }

}