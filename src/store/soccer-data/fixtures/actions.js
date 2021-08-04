
export async function loadFixtures ({ commit }) {
  return this._vm.$axios.get('https://59f5tguc6l.execute-api.us-east-2.amazonaws.com/Prod/fixture/get').then((response) => {
    if (response.data.type === 'success') {
      const data = response.data.body
      commit('setFixtures', data.fixtures)
      return data
    }
  })
}
