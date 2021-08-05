
// Rounds that are associated to the signed in member, association on pool/round
export async function loadPoolRounds ({ commit }, phone) {
  return this._vm.$axios.get(`pool-round/get/by-phone/${phone}`).then((response) => {
    if (response.data.type === 'success') {
      const data = response.data.body
      console.log(data.pool_rounds)
      commit('setPoolRounds', data.pool_rounds)
      return data
    }
  })
}

// Create an association/relationship between a pool and a league round
export async function createPoolRound ({ commit, dispatch, rootState }, body) {
  return this._vm.$axios.post('pool-round/create', body).then((response) => {
    if (response.data.type === 'success') {
      const data = response.data.body
      console.log(data)
      // commit('addPoolRound', data)
      dispatch('rounds/loadRounds', null, { root: true })
      dispatch('fixtures/loadFixtures', null, { root: true })
      dispatch('poolRounds/loadPoolRounds', rootState.member.phone, { root: true })
      dispatch('predictions/loadPredictions', rootState.member.phone, { root: true })
      return data
    }
  })
}
