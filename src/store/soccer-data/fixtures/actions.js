
export async function loadFixtures ({ commit }) {
  return this._vm.$axios.get('http://127.0.0.1:3000/fixture/get').then((response) => {
    if (response.data.type === 'success') {
      const data = response.data.body
      commit('setFixtures', data.fixtures)
      return data
    }
  })
}
