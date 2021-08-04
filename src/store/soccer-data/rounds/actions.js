
// SOCCER Data
export async function loadRounds ({ commit }) {
  return this._vm.$axios.get('https://59f5tguc6l.execute-api.us-east-2.amazonaws.com/Prod/round/get').then((response) => {
    if (response.data.type === 'success') {
      const data = response.data.body
      console.log(data.rounds)
      commit('setRounds', data.rounds)
      return data
    }
  })
}
