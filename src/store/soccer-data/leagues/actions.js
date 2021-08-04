
export async function loadLeagues ({ commit }) {
  return this._vm.$axios.get('https://59f5tguc6l.execute-api.us-east-2.amazonaws.com/Prod/league/get').then((response) => {
    if (response.data.type === 'success') {
      const data = response.data.body
      console.log('loadLeagues():', data.leagues)
      commit('setLeagues', data.leagues)
      return data
    }
  })
}
