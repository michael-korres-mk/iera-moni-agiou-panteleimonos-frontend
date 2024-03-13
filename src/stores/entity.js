import axios from '@/libs/axios'

export default function useGenericEntityStore(endpoint) {
  return {
    actions: {
      getEntities(queryParams, search = '/search') {
        return new Promise((resolve, reject) => {
          axios
            .get(`${endpoint}${search}`, { params: queryParams })
            .then(response => resolve(response.data))
            .catch(error => reject(error))
        })
      },
      getEntity(id) {
        return new Promise((resolve, reject) => {
          axios
            .get(`${endpoint}/${id}`)
            .then(response => resolve(response.data))
            .catch(error => reject(error))
        })
      },
      saveEntity(entityData, update) {        
        return new Promise((resolve, reject) => {
          axios({
            method: update ? 'put' : 'post',
            url: endpoint,
            data: entityData,
          })
            .then(response => resolve(response.data))
            .catch(error => reject(error))
        })
      },
      deleteEntity(id) {
        return new Promise((resolve, reject) => {
          axios
            .delete(`${endpoint}/${id}`)
            .then(response => resolve(response))
            .catch(error => reject(error))
        })
      },
      toggleEnabled(item) {
        return new Promise((resolve, reject) => {
          axios
            .put(`${endpoint}/enabled`, {
              id: item.id,
              enabled: !item.enabled,
            })
            .then(response => resolve(response.data))
            .catch(error => reject(error))
        })
      },
      extraAction(actionEndpoint) {
        return new Promise((resolve, reject) => {
          axios
            .get(`${endpoint}/${actionEndpoint}`)
            .then(response => resolve(response.data))
            .catch(error => reject(error))
        })
      },
    },
  }
}
