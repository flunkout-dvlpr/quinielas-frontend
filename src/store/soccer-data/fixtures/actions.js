
export async function loadFixtures ({ commit }) {
  return this._vm.$axios.get('fixture/get').then((response) => {
    if (response.data.type === 'success') {
      const data = response.data.body
      commit('setFixtures', data.fixtures)
      return data
    }
  })
}
