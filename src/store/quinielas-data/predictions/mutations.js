
export function setPredictions (state, payload) {
  state.predictions = payload
}

export function addPrediction (state, payload) {
  state.predictions = state.predictions.push(payload)
}

export function setUpdatedPrediction (state, payload) {
  state.predictions.forEach(function (prediction, idx) {
    if (parseInt(prediction.id) === parseInt(payload.id)) {
      console.log(state.predictions[idx], payload)
      state.predictions[idx] = payload
    }
  })
}
