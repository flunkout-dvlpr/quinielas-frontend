
export function setPredictions (state, payload) {
  state.predictions = payload
}
export function addPrediction (state, payload) {
  state.predictions = state.predictions.push(payload)
}
