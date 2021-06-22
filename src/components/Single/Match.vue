<template>
  <q-card
    square
    :class="idx === selectedMatch ? 'bg-brand-5 border-dark-green-box shadow-8' : 'bg-brand-5 border-dark-green-box'"
  >
    <!-- FLAGS -->
    <q-card-section class="q-pa-none q-ma-none">
      <div class="row justify-start items-center content-center">
        <div class="col-4 q-px-sm q-pt-md q-pb-xs">
          <q-img
            contain
            height="60px"
            :src="match.teamA.link"
          />
        </div>
        <div class="col-4 q-px-sm q-pt-md">
          <div class="text-h8 text-grey-3 text-center text-weight-regular">
            {{ match.date }}
          </div>
          <div class="text-h8 text-grey-3 text-center text-weight-regular">
            {{ match.time }}
          </div>
        </div>
        <div class="col-4 q-px-sm q-px-sm q-pt-md">
          <q-img
            contain
            height="60px"
            :src="match.teamB.link"
          />
        </div>
      </div>
    </q-card-section>
    <!-- TEAM NAME -->
    <q-card-section class="q-pa-none q-ma-none">
      <div class="row justify-center items-center content-center">
        <div class="col-4 q-px-sm q-pt-none q-pb-xs">
          <div class="text-h6 text-grey-3 text-center text-weight-regular">
            {{ match.teamA.name }}
          </div>
        </div>
        <div class="col-4 q-px-sm q-py-none">
          <div class="text-h6 text-grey-3 text-center text-weight-regular">
            VS
          </div>
        </div>
        <div class="col-4 q-px-sm q-pt-none q-pb-xs">
          <div class="text-h6 text-grey-3 text-center text-weight-regular">
            {{ match.teamB.name }}
          </div>
        </div>
      </div>
    </q-card-section>
    <!-- SCORE -->
    <q-card-section class="q-pa-none q-ma-none">
      <div class="row justify-center items-center content-center">
        <!-- :style="match.scoreA > match.scoreB ? {'background-color' : 'green'} : {'background-color' : 'red'}" -->
        <div
          class="col-4 q-px-sm q-py-none bg-brand-6"
        >
          <div class="text-h6 text-grey-3 text-center">
            {{ match.scoreA }}
          </div>
        </div>
        <div class="col-4 q-px-sm q-py-none bg-brand-6">
          <div class="text-h6 text-grey-3 text-center text-weight-regular">
            Score
          </div>
        </div>
        <!-- :style="match.scoreB > match.scoreA ? {'background-color' : 'green'} : {'background-color' : 'red'}" -->
        <div
          class="col-4 q-px-sm q-py-none bg-brand-6"
        >
          <div class="text-h6 text-grey-3 text-center">
            {{ match.scoreB }}
          </div>
        </div>
      </div>
    </q-card-section>
    <!-- Prediction -->
    <q-card-section class="q-pa-none q-ma-none">
      <div class="row justify-center items-center content-center">
        <div
          class="col-4 q-px-sm q-py-none"
          :style="match.predictionA === 'W' ? {'background-color': '#21ba45'} : match.predictionA === 'L' ? {'background-color': '#f44335'} : {'background-color': '#ff9801'}"
        >
          <div class="text-h6 text-grey-3 text-center">
            {{ match.predictionA }}
          </div>
        </div>
        <div class="col-4 q-px-sm q-py-none bg-brand-6">
          <div class="text-h6 text-grey-3 text-center text-weight-regular">
            Prediction
          </div>
        </div>
        <div
          class="col-4 q-px-sm q-py-none"
          :style="match.predictionB === 'W' ? {'background-color': '#21ba45'} : match.predictionB === 'L' ? {'background-color': '#f44335'} : {'background-color': '#ff9801'}"
        >
          <div class="text-h6 text-grey-3 text-center">
            {{ match.predictionB }}
          </div>
        </div>
      </div>
    </q-card-section>
    <!-- Date & Time -->
<!--     <q-card-section class="q-pa-none q-ma-none">
      <div class="row justify-center items-center content-center bg-brand-3">
        <div class="col-6 column justify-end items-start q-px-sm">
          <div class="text-h8 text-grey-3 text-center">
            Date: {{ match.date }}
          </div>
        </div>
        <div class="col-6 column justify-end items-end q-px-sm">
          <div class="text-h8 text-grey-3 text-center">
            @ {{ match.time }}
          </div>
        </div>
      </div>
    </q-card-section> -->
  </q-card>
</template>

<script>
export default {
  name: 'Match',
  props: {
    idx: Number,
    selectedMatch: Number,
    match: Object
  }
}
</script>
