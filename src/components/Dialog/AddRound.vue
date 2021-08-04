<template>
  <q-dialog ref="dialog">
  <q-card
    style="width: 25rem;"
    class="shadow-20 bg-brand-6"
  >
    <q-card-section class="q-pa-xs q-mb-md brand-green-gradient">
      <div class="row justify-center items-center content-center">
        <div class="col-md-12 col-xs-12 q-pa-sm">
          <div class="text-center text-grey-3 text-h4 text-weight-regular">Add Round</div>
        </div>
      </div>
    </q-card-section>
    <!-- Pool -->
    <q-form @submit="onSubmit">
    <q-card-section class="q-pa-sm">
      <div class="row justify-center items-center content-center">
        <div class="col-12 q-px-sm q-pt-none q-pb-xs">
          <div class="">
            <q-select
              dark
              square
              outlined
              color="brand-1"
              :options="poolOptions"
              v-model="selectedPool"
              label="Select Pool"
              readonly
            />
          </div>
        </div>
      </div>
    </q-card-section>
    <!-- Tournament -->
    <q-card-section class="q-pa-sm">
      <div class="row justify-center items-center content-center">
        <div class="col-12 q-px-sm q-pt-none q-pb-xs">
          <div class="">
            <q-select
              dark
              square
              outlined
              color="brand-1"
              :options="leagueOptions"
              option-value="id"
              option-label="name"
              v-model="selectedLeague"
              label="Select League/Cup"
              @input="selectedRound = null"
            />
          </div>
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
              :options="roundOptions"
              v-model="selectedRound"
              label="Select Round"
              option-label="name"
              :rules="[ val => val !== null || 'Please Select A Round!']"
            />
          </div>
        </div>
      </div>
    </q-card-section>
    <!-- Create Match Prediction -->
    <q-card-section class="q-pa-none q-ma-none bg-brand-6">
      <div class="row justify-center items-center content-center">
        <div class="col-4 q-pb-md">
          <q-btn
            square
            no-caps
            unelevated
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
// import { date } from 'quasar'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'AddRound',
  data () {
    return {
      selectedRound: null,
      selectedPool: null,
      selectedLeague: null
    }
  },
  props: {
    poolId: Number
  },
  computed: {
    ...mapGetters('leagues', ['leagues']),
    ...mapGetters('pools', ['pools']),
    ...mapGetters('rounds', ['rounds']),
    leagueOptions () {
      return this.leagues
    },
    roundOptions () {
      if (this.selectedLeague && this.selectedLeague.id) {
        return this.rounds.filter(round => round.league_id === this.selectedLeague.id)
      } else {
        return null
      }
    },
    poolOptions () {
      const options = []
      this.pools.forEach(pool => {
        pool.label = pool.name
        pool.value = pool.id
        options.push(pool)
      })
      return options
    }
  },
  methods: {
    ...mapActions('poolRounds', ['createPoolRound']),
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
      const poolRound = {
        round: this.selectedRound,
        pool_id: this.selectedPool.id
      }
      console.log(poolRound)
      this.createPoolRound(poolRound)
      this.hide()
    }
  },
  mounted () {
    this.selectedPool = this.poolOptions.find(pool => pool.value === this.poolId)
  }
}
</script>
