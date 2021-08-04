
export function setPools (state, payload) {
  state.pools = payload
}

export function setRounds (state, payload) {
  state.rounds = payload
}

export function setMembers (state, payload) {
  state.members = payload
}

export function addPool (state, payload) {
  state.pools.push(payload)
}

export function addRound (state, payload) {
  state.rounds.push(payload)
}

export function addMember (state, payload) {
  state.members.push(payload)
}

export function addPoolMember (state, payload) {
  state.pools.forEach(function (pool) {
    if (pool.id === payload.pool_id) {
      pool.members.push(payload.member)
    }
  })
}
