
export async function loadPools ({ commit }, phone) {
  return this._vm.$axios.get(`pool/get/by-phone/${phone}`).then((response) => {
    if (response.data.type === 'success') {
      const data = response.data.body
      console.log(data.pools)
      commit('setPools', data.pools)
      return data
    }
  })
}

export function createPool ({ state, commit, dispatch, rootState }, body) {
  return this._vm.$axios.post('pool/create', body)
    .then((response) => {
      if (response.data.type === 'success') {
        const result = response.data.body
        console.log('Pool created', result)
        commit('addPool', result)
        dispatch('pools/loadPools', rootState.member.phone, { root: true })
        return result
      } else {
        this._vm.$q.notify({
          color: 'warning',
          position: 'top',
          textColor: 'brand-4',
          message: response.data.message,
          icon: 'report_problem'
        })
      }
    })
    .catch((error) => {
      this._vm.$q.notify({
        color: 'negative',
        position: 'top',
        textColor: 'brand-4',
        message: 'Could create pool successfully!',
        icon: 'report_problem'
      })
      return error
    })
}

export function addPoolMember ({ state, commit, dispatch, rootState }, body) {
  return this._vm.$axios.post('pool-member/create', body)
    .then((response) => {
      if (response.data.type === 'success') {
        const result = response.data.body
        console.log('Pool member added', result)
        dispatch('pools/loadPools', rootState.member.phone, { root: true })
        return result
      } else {
        this._vm.$q.notify({
          color: 'warning',
          position: 'top',
          textColor: 'brand-4',
          message: response.data.message,
          icon: 'report_problem'
        })
      }
    })
    .catch((error) => {
      this._vm.$q.notify({
        color: 'negative',
        position: 'top',
        textColor: 'brand-4',
        message: 'Could add pool member successfully!',
        icon: 'report_problem'
      })
      return error
    })
}
