
export function setPoolRounds (state, payload) {
  state.pool_rounds = payload
}

export function addPoolRound (state, payload) {
  state.pool_rounds.push(payload)
}
