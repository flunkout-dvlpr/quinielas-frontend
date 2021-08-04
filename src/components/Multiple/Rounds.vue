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
          <q-avatar square class="bg-brand-3" font-size="40px" icon="account_tree" text-color="grey-3"/>
        </div>
        <div class="q-mx-sm">
          <div class="text-grey-3 text-h4 text-weight-regular">Rounds</div>
        </div>
      </div>
    </q-card-section>
    <q-card-section class="q-pa-none q-ma-none">
      <div
        class="row justify-center items-start content-start hide-scrollbar q-pa-sm"
        style="height: 300px;overflow-y: scroll;"
      >
        <div
          class="col-md-12 col-xs-12 column justify-center q-mx-none q-my-sm"
          style="height: 75px;"
        >
          <div class="col border-dark-green-box-dash">
            <q-btn
              flat
              no-caps
              class="fit bg-brand-5"
              @click="showAddRoundDialog()"
            >
              <q-icon size=20px name="add" color="grey-4"/>
              <div class="text-h6 text-center text-weight-regular text-grey-4">Round</div>
            </q-btn>
          </div>
        </div>
        <div
          class="col-md-12 col-xs-12 q-mx-none q-my-sm"
          v-for="(poolRound, idx) in roundsByPoolId"
          :key="idx"
          @click="setRouteParameters(poolRound.round_id)"
        >
          <Round :round="poolRound" :poolId="poolId" :selectedRound="selectedRound" />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { mapGetters } from 'vuex'
import Round from 'components/Single/Round'
import AddRound from 'components/Dialog/AddRound'
export default {
  name: 'Rounds',
  components: { Round },
  data () {
    return {
      loading: false,
      selectedRound: null
    }
  },
  computed: {
    ...mapGetters('poolRounds', ['poolRounds']),
    poolId () {
      if (this.$route.params && this.$route.params.poolId !== null) {
        console.log('Rounds.vue - poolId(): poolId Found In Route', this.$route.params.poolId)
        return parseInt(this.$route.params.poolId)
      } else {
        console.log('Rounds.vue - poolId(): poolId Not Found In Route', this.$route.params.poolId)
        return null
      }
    },
    round () {
      if (this.$route.params && this.$route.params.round !== null && !isNaN(this.$route.params.round)) {
        console.log('Rounds.vue - round(): round Found In Route', this.$route.params.round)
        return parseInt(this.$route.params.round)
      } else {
        console.log('Rounds.vue - round(): round Not Found In Route', this.$route.params.round)
        return null
      }
    },
    roundsByPoolId () {
      if (this.poolId !== null) {
        console.log('Rounds.vue - poolRounds(): returning rounds with poolId', this.poolId)
        return this.poolRounds.filter(round => parseInt(round.pool_id) === parseInt(this.poolId))
      }
      console.log('Rounds.vue - poolRounds(): poolId is null, return empty []')
      return []
    }
  },
  methods: {
    setRouteParameters (roundId) {
      this.selectedRound = roundId
      if (this.poolId !== null && roundId !== null) {
        if (roundId !== this.round) {
          console.log('Rounds.vue loadRound(): Set round route param to round id', roundId)
          this.$router.push({ name: 'Home', params: { poolId: this.poolId, round: roundId } })
        }
      }
    },
    showAddRoundDialog () {
      if (typeof this.poolId === 'number' && !isNaN(this.poolId)) {
        this.$q.dialog({
          component: AddRound,
          parent: this,
          poolId: parseInt(this.poolId)
        })
      } else {
        this.$q.notify({
          color: 'orange-5',
          position: 'top',
          textColor: 'grey-9',
          message: 'Please select a pool first',
          icon: 'pool_add'
        })
      }
    }
  },
  mounted () {
    if (this.round !== null) {
      this.selectedRound = this.round
      this.setRouteParameters(this.round)
    } else {
      this.selectedRound = null
    }
  },
  updated () {
    this.$nextTick(function () {
      if (this.round !== null) {
        this.selectedRound = this.round
        this.setRouteParameters(this.round)
      } else {
        this.selectedRound = null
      }
    })
  }
}
</script>
