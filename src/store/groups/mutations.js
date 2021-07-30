
export function setGroups (state, payload) {
  state.groups = payload
}

export function addGroup (state, payload) {
  state = state.groups.push(payload)
}

export function addRound (state, payload) {
  state = state.rounds.push(payload)
}
