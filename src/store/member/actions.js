
export async function loadMember ({ commit, dispatch }, phone) {
  return this._vm.$axios.get(`https://59f5tguc6l.execute-api.us-east-2.amazonaws.com/Prod/member/get/by-phone/${phone}`).then((response) => {
    if (response.data.type === 'success') {
      const data = response.data.body
      console.log(data)
      commit('setMember', data.member)
      commit('pools/setPools', data.pools, { root: true })
      dispatch('fixtures/loadFixtures', null, { root: true })
      dispatch('leagues/loadLeagues', null, { root: true })
      dispatch('rounds/loadRounds', null, { root: true })
      dispatch('poolRounds/loadPoolRounds', phone, { root: true })
      dispatch('predictions/loadPredictions', phone, { root: true })
      return data
    }
  })
}
