
export function setMember (state, payload) {
  for (const key in payload) {
    state[key] = payload[key]
  }
}
