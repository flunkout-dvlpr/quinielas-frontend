
export async function loadMember ({ commit, dispatch }, phone) {
  return this._vm.$axios.get(`member/get/by-phone/${phone}`).then((response) => {
    if (response.data.type === 'success') {
      const data = response.data.body
      // Set SignedIn User
      commit('setMember', data.member)
      // Soccer Data
      dispatch('fixtures/loadFixtures', null, { root: true })
      dispatch('leagues/loadLeagues', null, { root: true })
      dispatch('rounds/loadRounds', null, { root: true })
      // Quinielas Data
      dispatch('pools/loadPools', phone, { root: true })
      dispatch('poolRounds/loadPoolRounds', phone, { root: true })
      dispatch('predictions/loadPredictions', phone, { root: true })
      return data
    }
  })
}
