<template>
  <q-card
    class="shadow-20"
  >
    <q-card-section class="q-pa-none q-ma-none brand-green-gradient">
      <div class="row justify-center items-center content-center">
        <div class="col-md-10 col-xs-7 q-pa-sm">
          <div class="text-grey-3 text-h4 text-weight-regular">Matches</div>
        </div>
        <div class="col-md-2 col-xs-5 q-pa-sm">
          <q-btn
            outline
            no-caps
            :ripple="false"
            label="Add Match"
            class="fit text-grey-3"
          />
        </div>
      </div>
    </q-card-section>
    <q-card-section class="q-pa-none q-ma-none bg-brand-4">
      <div class="row justify-start items-center content-center overflow-auto hide-scrollbar no-wrap q-pa-md">
        <div
          class="col-md-4 col-xs-11 q-ma-sm"
          v-for="(match, idx) in matches"
          :key="idx"
          @click="loadMatch(idx)"
        >
          <Match :match="match" :idx="idx" :selectedMatch="selectedMatch" />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>
<script>
import Match from 'components/Single/Match'
export default {
  name: 'Matches',
  components: { Match },
  data () {
    return {
      loading: false,
      selectedMatch: 0,
      matches: [
        {
          time: '07:00 PM',
          date: '06/16/21',
          teamA: { name: 'Finland', link: 'https://flagcdn.com/80x60/fi.png' },
          teamB: { name: 'Russia', link: 'https://flagcdn.com/80x60/ru.png' },
          scoreA: 0,
          scoreB: 1,
          predictionA: 0,
          predictionB: 0,
          winner: null
        },
        {
          time: '07:00 PM',
          date: '06/16/21',
          teamA: { name: 'Turkey', link: 'https://flagcdn.com/80x60/tr.png' },
          teamB: { name: 'Wales', link: 'https://flagcdn.com/80x60/gb-wls.png' },
          scoreA: 0,
          scoreB: 2,
          predictionA: 0,
          predictionB: 0,
          winner: null
        },
        {
          time: '06:00 PM',
          date: '06/16/21',
          teamA: { name: 'Italy', link: 'https://flagcdn.com/80x60/it.png' },
          teamB: { name: 'Switzerland', link: 'https://flagcdn.com/80x60/ch.png' },
          scoreA: 3,
          scoreB: 0,
          predictionA: 0,
          predictionB: 0,
          winner: null
        },
        {
          time: '06:00 PM',
          date: '06/17/21',
          teamA: { name: 'Ukraine', link: 'https://flagcdn.com/80x60/ua.png' },
          teamB: { name: 'North Macedonia', link: 'https://flagcdn.com/80x60/mk.png' },
          scoreA: 2,
          scoreB: 1,
          predictionA: 0,
          predictionB: 0,
          winner: null
        },
        {
          time: '06:00 PM',
          date: '06/17/21',
          teamA: { name: 'Denmark', link: 'https://flagcdn.com/80x60/dk.png' },
          teamB: { name: 'Belgium', link: 'https://flagcdn.com/80x60/be.png' },
          scoreA: 1,
          scoreB: 2,
          predictionA: 0,
          predictionB: 0,
          winner: null
        },
        {
          time: '08:00 PM',
          date: '06/17/21',
          teamA: { name: 'Netherlands', link: 'https://flagcdn.com/80x60/nl.png' },
          teamB: { name: 'Austria', link: 'https://flagcdn.com/80x60/at.png' },
          scoreA: 2,
          scoreB: 0,
          predictionA: 0,
          predictionB: 0,
          winner: null
        }
      ]
    }
  },
  methods: {
    loadMatch (idx) {
      this.selectedMatch = idx
    }
  }

}
</script>
