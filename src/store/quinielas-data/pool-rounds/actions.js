
// Rounds that are associated to the signed in member, association on pool/round
export async function loadPoolRounds ({ commit }, phone) {
  return this._vm.$axios.get(`https://59f5tguc6l.execute-api.us-east-2.amazonaws.com/Prod/pool-round/get/by-phone/${phone}`).then((response) => {
    if (response.data.type === 'success') {
      const data = response.data.body
      console.log(data.pool_rounds)
      commit('setPoolRounds', data.pool_rounds)
      return data
    }
  })
}

// Create an association/relationship between a pool and a league round
export async function createPoolRound ({ commit }, body) {
  return this._vm.$axios.post('https://59f5tguc6l.execute-api.us-east-2.amazonaws.com/Prod/pool-round/create', body).then((response) => {
    if (response.data.type === 'success') {
      const data = response.data.body
      console.log(data)
      commit('addPoolRound', data)
      return data
    }
  })
}
