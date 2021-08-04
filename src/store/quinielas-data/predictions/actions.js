
export async function loadPredictions ({ commit }, phone) {
  return this._vm.$axios.get(`http://127.0.0.1:3000/prediction/get/by-phone/${phone}`).then((response) => {
    if (response.data.type === 'success') {
      const data = response.data.body
      console.log(data)
      commit('setPredictions', data.predictions)
      return data
    }
  })
}

export async function createPrediction ({ commit }, body) {
  return this._vm.$axios.post('http://127.0.0.1:3000/prediction/create', body).then((response) => {
    if (response.data.type === 'success') {
      const data = response.data.body
      console.log(data)
      commit('addPrediction', data)
      return data
    }
  })
}

export async function updatePrediction ({ commit }, body) {
  return this._vm.$axios.post('http://127.0.0.1:3000/prediction/update', body).then((response) => {
    if (response.data.type === 'success') {
      const data = response.data.body
      console.log(data)
      // commit('updatePrediction', data)
      return data
    }
  })
}
