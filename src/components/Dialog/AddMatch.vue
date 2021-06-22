<template>
  <q-dialog ref="dialog">
  <q-card
    style="width: 25rem;"
    class="shadow-20 bg-brand-6"
  >
    <q-card-section class="q-pa-xs q-mb-md brand-green-gradient">
      <div class="row justify-center items-center content-center">
        <div class="col-md-12 col-xs-7 q-pa-sm">
          <div class="text-center text-grey-3 text-h4 text-weight-regular">Add Match</div>
        </div>
      </div>
    </q-card-section>
    <!-- Fixture -->
    <q-card-section class="q-pa-sm">
      <div class="row justify-center items-center content-center">
        <div class="col-12 q-px-sm q-pt-none q-pb-xs">
          <div class="">
            <q-select
              dark
              square
              outlined
              color="brand-1"
              :options="fixtures"
              v-model="selectedFixture"
              label="Select Fixture"
            />
          </div>
        </div>
      </div>
    </q-card-section>
    <!-- Match -->
    <q-card-section class="q-pa-sm">
      <div class="row justify-center items-center content-center">
        <div class="col-12 q-px-sm q-pt-none q-pb-xs">
          <div class="">
            <q-select
              dark
              square
              outlined
              color="brand-1"
              :options="matches"
              v-model="selectedMatch"
              label="Select Match"
            />
          </div>
        </div>
      </div>
    </q-card-section>
    <!-- Prediction -->
    <q-card-section class="q-pa-sm q-ma-none bg-brand-6">
      <div class="row justify-center items-center content-center">
        <div class="col-12 q-px-sm q-pb-xs text-weight-regular text-grey-3 text-h*">Prediction</div>
        <div class="col-12 q-px-sm q-py-none">
          <q-btn-toggle
            spread
            no-caps
            v-model="prediction"
            color="brand-3"
            text-color="grey-3"
            toggle-color="brand-1"
            :options="[
              {label: 'Win', value: 'true', icon: 'done'},
              {label: 'Lose', value: 'false', icon: 'close'}
            ]"
          />
        </div>
      </div>
    </q-card-section>
    <!-- Create Match Prediction -->
    <q-card-section class="q-pa-sm q-ma-none bg-brand-6">
      <div class="row justify-center items-center content-center">
        <div class="col-4 q-px-sm q-py-none">
          <q-btn
            dark
            square
            no-caps
            :ripple="false"
            class="fit"
            text-color="grey-3"
            color="brand-2"
            label="Submit"
          />
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
  </q-dialog>
</template>
<script>
import { date } from 'quasar'
import euro from 'src/assets/euro.json'
export default {
  name: 'AddMatch',
  data () {
    return {
      selectedFixture: null,
      selectedMatch: null,
      prediction: null,
      test: euro,
      fixtureOptions: [
        { value: 'm1', label: 'Matchday 1' },
        { value: 'm2', label: 'Matchday 2' },
        { value: 'm3', label: 'Matchday 3' },
        { value: 'm4', label: 'Matchday 4' },
        { value: 'm5', label: 'Matchday 5' },
        { value: 'm6', label: 'Matchday 6' },
        { value: 'm7', label: 'Matchday 7' },
        { value: 'm8', label: 'Matchday 8' },
        { value: 'm9', label: 'Matchday 9' },
        { value: 'm10', label: 'Matchday 10' },
        { value: 'm11', label: 'Matchday 11' },
        { value: 'm12', label: 'Matchday 12' },
        { value: 'm13', label: 'Matchday 13' },
        { value: 'm14', label: 'Matchday 14' },
        { value: 'm15', label: 'Matchday 15' },
        { value: 'm16', label: 'Matchday 16' },
        { value: 'm17', label: 'Matchday 17' },
        { value: 'p', label: 'Playoff' },
        { value: 'q1', label: 'Quarter Finals 1st Leg' },
        { value: 'q2', label: 'Quarter Finals 2nd Leg' },
        { value: 's1', label: 'Semi Finals 1st Leg' },
        { value: 's2', label: 'Semi Finals 2nd Leg' },
        { value: 'f1', label: 'Final 1st Leg' },
        { value: 'f2', label: 'Final 2nd Leg' }
      ]
    }
  },
  computed: {
    fixtures () {
      const options = []
      this.test.matches.forEach(match => {
        if (!options.some(m => m.value === match.matchday)) {
          if (match.group) {
            options.push({ label: `Matchday ${match.matchday}`, value: match.matchday })
          } else {
            const stageLabel = match.stage.replace(/_/g, ' ').toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')
            options.push({ label: stageLabel, value: match.matchday })
          }
        }
      })
      return options
    },
    matches () {
      const options = []
      if (this.selectedFixture) {
        this.test.matches.forEach(match => {
          if (match.matchday === this.selectedFixture.value) {
            const awayTeam = match.awayTeam.id ? match.awayTeam.name : 'TBA'
            const homeTeam = match.homeTeam.id ? match.homeTeam.name : 'TBA'
            const matchDate = date.formatDate(date.extractDate(match.utcDate, 'YYYY-MM-DDTHH:mm'), 'ddd MM/DD/YYYY @ hh:mma')
            const matchLabel = `${awayTeam} vs ${homeTeam} - ${matchDate}`
            options.push({
              label: matchLabel,
              value: match.id,
              date: match.utcDate,
              match: match
            })
          }
        })
        console.log(options)
        return options
      } else {
        return []
      }
    }
  },
  methods: {
    show () {
      this.$refs.dialog.show()
    },
    hide () {
      this.$refs.dialog.hide()
    },
    onCancel () {
      this.hide()
    },
    onSubmit () {
      // this.loading = true
    }
  }
}
</script>
