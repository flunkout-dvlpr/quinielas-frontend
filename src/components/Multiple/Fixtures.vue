<template>
  <q-card
    class="shadow-20 bg-brand-4"
  >
    <q-card-section class="q-pa-none q-ma-none brand-green-gradient">
      <div
        class="row justify-start items-center content-center"
        style="height: 60px;"
      >
        <div class="q-mx-sm">
          <q-avatar square class="bg-brand-3" font-size="40px" icon="sports_soccer" text-color="grey-3"/>
        </div>
        <div class="q-mx-sm">
          <div class="text-grey-3 text-h4 text-weight-regular">Fixtures</div>
        </div>
      </div>
    </q-card-section>
    <q-card-section class="q-pa-none q-ma-none">
      <div
        class="row justify-start items-center content-center overflow-auto hide-scrollbar no-wrap q-py-sm q-px-none"
        style="height: 225px;"
      >
        <div
          class="col-md-5 col-xs-11 q-mx-sm q-my-xs"
          v-for="(fixture, idx) in roundFixtures"
          :key="idx"
          @click="loadFixture(idx)"
        >
          <Fixture :fixture="fixture" :idx="idx" :selectedFixture="selectedFixture" />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>
<script>
// import { date } from 'quasar'
import { mapGetters } from 'vuex'
import Fixture from 'components/Single/Fixture'
import AddPrediciton from 'components/Dialog/AddPrediciton'
export default {
  name: 'Fixtures',
  components: { Fixture },
  data () {
    return {
      loading: false,
      selectedFixture: 0
    }
  },
  computed: {
    ...mapGetters('fixtures', ['fixtures']),
    ...mapGetters('rounds', ['rounds']),
    poolId () {
      if (this.$route.params && this.$route.params.poolId !== null) {
        return parseInt(this.$route.params.poolId)
      } else {
        return null
      }
    },
    round () {
      if (this.$route.params && this.$route.params.round !== null && !isNaN(this.$route.params.round)) {
        return this.rounds.find(round => parseInt(round.id) === parseInt(this.$route.params.round))
      } else {
        return null
      }
    },
    roundFixtures () {
      console.log(this.round, this.poolId)
      if (this.round !== null && this.poolId !== null) {
        return this.fixtures.filter(fixture => fixture.round === this.round.name && fixture.league_id === this.round.league_id && fixture.season === this.round.season)
      } else {
        return []
      }
    }
  },
  methods: {
    loadFixture (idx) {
      this.selectedFixture = idx
    },
    showAddPredictionDialog () {
      if (this.round !== null) {
        this.$q.dialog({
          component: AddPrediciton,
          parent: this,
          round: this.round
        })
      } else {
        this.$q.notify({
          color: 'orange-5',
          position: 'top',
          textColor: 'grey-9',
          message: 'Please select a round first',
          icon: 'account_tree'
        })
      }
    }
  }
}
</script>
