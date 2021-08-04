
// SOCCER Data
export async function loadRounds ({ commit }) {
  return this._vm.$axios.get('http://127.0.0.1:3000/round/get').then((response) => {
    if (response.data.type === 'success') {
      const data = response.data.body
      console.log(data.rounds)
      commit('setRounds', data.rounds)
      return data
    }
  })
}
