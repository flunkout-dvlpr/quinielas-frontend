
export async function loadLeagues ({ commit }) {
  return this._vm.$axios.get('league/get').then((response) => {
    if (response.data.type === 'success') {
      const data = response.data.body
      console.log('loadLeagues():', data.leagues)
      commit('setLeagues', data.leagues)
      return data
    }
  })
}
