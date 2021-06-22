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
    <q-form @submit="onSubmit">
    <q-card-section class="q-pa-sm">
      <div class="row justify-center items-center content-center">
        <div class="col-12 q-px-sm q-pt-none q-pb-xs">
          <div class="">
            <q-select
              dark
              square
              outlined
              readonly
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
    <!-- Team -->
    <q-card-section class="q-pa-sm q-ma-none bg-brand-6">
      <div class="row justify-center items-center content-center">
        <!-- {{selectedMatch.match.awayTeam.name || ''}}  -->
        <div class="col-12 q-px-sm q-pb-xs text-weight-regular text-grey-3 text-h*">{{ awayTeam }} Prediction</div>
        <div class="col-12 q-px-sm q-py-none">
          <q-btn-toggle
            spread
            no-caps
            emit-value
            v-model="awayTeamPrediction"
            @input="setAwayTeamPrediction"
            text-color="grey-3"
            color="brand-6"
            :toggle-color="awayTeamPrediction === 'W' ? 'green' : awayTeamPrediction === 'L' ? 'red' : 'orange'"
            :options="[
              {label: 'Win', value: 'W', icon: 'done'},
              {label: 'Draw', value: 'D', icon: 'block'},
              {label: 'Lose', value: 'L', icon: 'close'}
            ]"
          />
        </div>
      </div>
    </q-card-section>
    <!-- Prediction -->
    <q-card-section class="q-pa-sm q-ma-none bg-brand-6">
      <div class="row justify-center items-center content-center">
        <!-- {{selectedMatch.match.homeTeam.name || ''}} -->
        <div class="col-12 q-px-sm q-pb-xs text-weight-regular text-grey-3 text-h*">{{ homeTeam }} Prediction</div>
        <div class="col-12 q-px-sm q-py-none">
          <q-btn-toggle
            spread
            no-caps
            emit-value
            v-model="homeTeamPrediction"
            @input="setHomeTeamPrediction"
            text-color="grey-3"
            color="brand-6"
            :toggle-color="homeTeamPrediction === 'W' ? 'green' : homeTeamPrediction === 'L' ? 'red' : 'orange'"
            :options="[
             {label: 'Win', value: 'W', icon: 'done'},
             {label: 'Draw', value: 'D', icon: 'block'},
             {label: 'Lose', value: 'L', icon: 'close'}
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
            type="submit"
          />
        </div>
      </div>
    </q-card-section>
    </q-form>
  </q-card>
  </q-dialog>
</template>
<script>
import { date } from 'quasar'
import { mapActions } from 'vuex'
import euro from 'src/assets/euro.json'
export default {
  name: 'AddMatch',
  data () {
    return {
      selectedFixture: null,
      selectedMatch: null,
      awayTeamPrediction: 'W',
      homeTeamPrediction: 'L',
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
  props: {
    fixtureId: Number
  },
  computed: {
    awayTeam () {
      if (this.selectedMatch) {
        return this.selectedMatch.match.awayTeam.name
      } else {
        return 'Away Team'
      }
    },
    homeTeam () {
      if (this.selectedMatch) {
        return this.selectedMatch.match.homeTeam.name
      } else {
        return 'Home Team'
      }
    },
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
    ...mapActions('matches', ['updateMatches']),
    setHomeTeamPrediction (prediction) {
      if (prediction === 'W') {
        this.homeTeamPrediction = 'W'
        this.awayTeamPrediction = 'L'
      } else if (prediction === 'L') {
        this.homeTeamPrediction = 'L'
        this.awayTeamPrediction = 'W'
      } else if (prediction === 'D') {
        this.homeTeamPrediction = 'D'
        this.awayTeamPrediction = 'D'
      }
    },
    setAwayTeamPrediction (prediction) {
      if (prediction === 'W') {
        this.awayTeamPrediction = 'W'
        this.homeTeamPrediction = 'L'
      } else if (prediction === 'L') {
        this.awayTeamPrediction = 'L'
        this.homeTeamPrediction = 'W'
      } else if (prediction === 'D') {
        this.awayTeamPrediction = 'D'
        this.homeTeamPrediction = 'D'
      }
    },
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
      const match = {
        id: this.selectedMatch.match.id,
        fixtureId: this.selectedFixture.value,
        groupId: this.$route.params.groupId,
        time: date.formatDate(date.extractDate(this.selectedMatch.match.utcDate, 'YYYY-MM-DDTHH:mm'), 'h:mma'),
        date: date.formatDate(date.extractDate(this.selectedMatch.match.utcDate, 'YYYY-MM-DDTHH:mm'), 'MM/DD/YYYY'),
        teamA: {
          name: this.selectedMatch.match.awayTeam.id ? this.selectedMatch.match.awayTeam.name : 'TBA',
          id: this.selectedMatch.match.awayTeam.id,
          link: 'https://flagcdn.com/80x60/dk.png'
        },
        teamB: {
          name: this.selectedMatch.match.homeTeam.id ? this.selectedMatch.match.homeTeam.name : 'TBA',
          id: this.selectedMatch.match.homeTeam.id,
          link: 'https://flagcdn.com/80x60/be.png'
        },
        scoreA: 0,
        scoreB: 0,
        predictionA: this.awayTeamPrediction,
        predictionB: this.homeTeamPrediction,
        winner: null
      }
      console.log(match)
      this.updateMatches(match)
      this.hide()
    }
  },
  mounted () {
    this.selectedFixture = this.fixtures.find(fixture => fixture.value === this.fixtureId)
  }
}
</script>
