
export async function signInOTP ({ commit, dispatch }, phone) {
  // return { otp: 1234 }
  return this._vm.$axios.post('authorization/sign-in/send-otp', { phone: phone }).then((response) => {
    if (response.data.type === 'success') {
      const data = response.data.body
      console.log(data)
      return data
    }
  })
}

export async function loadMember ({ commit, dispatch }, phone) {
  return this._vm.$axios.get(`member/get/by-phone/${phone}`).then((response) => {
    if (response.data.type === 'success') {
      const data = response.data.body
      // Set SignedIn User
      commit('setMember', data.member)
      // Soccer Data
      dispatch('leagues/loadLeagues', null, { root: true })
      dispatch('rounds/loadRounds', null, { root: true })
      dispatch('fixtures/loadFixtures', null, { root: true })
      // Quinielas Data
      dispatch('pools/loadPools', phone, { root: true })
      dispatch('poolRounds/loadPoolRounds', phone, { root: true })
      dispatch('predictions/loadPredictions', phone, { root: true })
      return data
    }
  })
}
