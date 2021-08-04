
export async function loadLeagues ({ commit }) {
  return this._vm.$axios.get('http://127.0.0.1:3000/league/get').then((response) => {
    if (response.data.type === 'success') {
      const data = response.data.body
      console.log('loadLeagues():', data.leagues)
      commit('setLeagues', data.leagues)
      return data
    }
  })
}
