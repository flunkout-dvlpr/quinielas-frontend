
export function createPool ({ state, commit }, body) {
  return this._vm.$axios.post('pool/create', body)
    .then((response) => {
      if (response.data.type === 'success') {
        const result = response.data.body
        console.log('Pool created', result)
        commit('addPool', result)
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

export function createPoolRound ({ commit }, payload) {
  commit('addRound', payload)
}

export function addMember ({ commit }, payload) {
  commit('addMember', payload)
}

export function addPoolMember ({ state, commit }, body) {
  return this._vm.$axios.post('pool-member/create', body)
    .then((response) => {
      if (response.data.type === 'success') {
        const result = response.data.body
        console.log('Pool member added', result)
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
