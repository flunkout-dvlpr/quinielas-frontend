<template>
  <q-card
    square
    style="height: 195px;"
    :class="idx === selectedFixture ? 'bg-brand-5 border-dark-green-box shadow-8' : 'bg-brand-5 border-dark-green-box'"
  >
    <!-- FLAGS -->
    <q-card-section class="q-pa-none q-ma-none">
      <div class="row justify-start items-center content-center q-pt-xs">
        <div class="col-4">
          <q-img
            contain
            :height="$q.platform.is.mobile ? '65px' : '85px'"
            :src="fixture.away_logo"
          />
        </div>
        <div class="col-4">
          <div class="text-h6 text-grey-3 text-center text-weight-regular desktop-only">
            {{ fixture.date | formattedDateText }}
          </div>
          <div class="text-h8 text-grey-3 text-center text-weight-regular">
            {{ fixture.date | formattedDate }}
          </div>
          <div class="text-h8 text-grey-3 text-center text-weight-regular">
            {{ fixture.date | formattedTime }}
          </div>
        </div>
        <div class="col-4">
          <q-img
            contain
            :height="$q.platform.is.mobile ? '65px' : '85px'"
            :src="fixture.home_logo"
          />
        </div>
      </div>
    </q-card-section>
    <!-- TEAM NAME -->
    <q-card-section class="q-pa-none q-ma-none">
      <div class="row justify-center items-center content-center">
        <div class="col-4 q-px-sm q-pt-none q-pb-xs">
          <div class="text-h8 text-grey-3 text-center text-weight-regular ellipsis">
            {{ fixture.away_name }}
          </div>
        </div>
        <div class="col-4 q-px-sm q-py-none">
          <div class="text-h8 text-grey-3 text-center text-weight-regular">
            VS
          </div>
        </div>
        <div class="col-4 q-px-sm q-pt-none q-pb-xs">
          <div class="text-h8 text-grey-3 text-center text-weight-regular ellipsis">
            {{ fixture.home_name }}
          </div>
        </div>
      </div>
    </q-card-section>
    <!-- SCORE -->
    <q-card-section class="q-pa-none q-ma-none">
      <div class="row justify-center items-center content-center">
        <div
          class="col-4 q-px-sm q-py-none bg-brand-6"
        >
          <div class="text-h6 text-grey-3 text-center">
            {{fixture.status === 'Match Finished' ? fixture.away_goal : 'TBD'}}
          </div>
        </div>
        <div class="col-4 q-px-sm q-py-none bg-brand-6">
          <div class="text-h6 text-grey-3 text-center text-weight-regular">
            Score
          </div>
        </div>
        <div
          class="col-4 q-px-sm q-py-none bg-brand-6"
        >
          <div class="text-h6 text-grey-3 text-center">
            {{fixture.status === 'Match Finished' ? fixture.home_goal : 'TBD'}}
          </div>
        </div>
      </div>
    </q-card-section>
    <!-- Prediction -->
    <q-card-section class="q-pa-none q-ma-none">
      <div v-if="memberPrediction" class="row fit justify-center items-center content-center">
        <div class="col-4">
          <q-btn
            flat
            :stack="$q.platform.is.mobile"
            no-caps
            :icon="prediction.home === 'W' ? 'done' : prediction.home === 'L' ? 'close' : prediction.home === 'D' ? '' : ''"
            :label="prediction.home === 'W' ? 'Win' : prediction.home === 'L' ? 'Lose' : prediction.home === 'D' ? '----' : ''"
            text-color="grey-3 "
            :class="prediction.home === 'W' ? 'fit bg-green-5' : prediction.home === 'L' ? 'fit bg-red-5' : prediction.home === 'D' ? 'fit bg-orange-5' : 'fit'"
            :loading="loading"
            @click="confirmUpdate('W')"
          />
        </div>
        <div class="col-4">
          <q-btn
            flat
            :stack="$q.platform.is.mobile"
            no-caps
            icon="block"
            label="Draw"
            text-color="grey-3 "
            class="fit bg-orange-5"
            :loading="loading"
            @click="confirmUpdate('D')"
          />
        </div>
        <div class="col-4">
          <q-btn
            flat
            :stack="$q.platform.is.mobile"
            no-caps
            :icon="prediction.home === 'W' ? 'close' : prediction.home === 'L' ? 'done' : prediction.home === 'D' ? '' : ''"
            :label="prediction.home === 'W' ? 'Lose' : prediction.home === 'L' ? 'Win' : prediction.home === 'D' ? '----' : ''"
            text-color="grey-3 "
            :class="prediction.home === 'W' ? 'fit bg-red-5' : prediction.home === 'L' ? 'fit bg-green-5' : prediction.home === 'D' ? 'fit bg-orange-5' : 'fit'"
            :loading="loading"
            @click="confirmUpdate('L')"
          />
        </div>
      </div>
      <div v-else class="col-8">
        <q-btn
          flat
          no-caps
          :ripple="false"
          label="Prediction"
          icon="add"
          text-color="grey-3"
          class="fit text-h8 text-grey-3 text-center text-weight-regular"
          @click="showAddPredictionDialog()"
        />
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { date } from 'quasar'
import AddPrediciton from 'components/Dialog/AddPrediciton'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Fixture',
  props: {
    idx: Number,
    selectedFixture: Number,
    fixture: Object,
    poolId: Number
  },
  data () {
    return {
      loading: false,
      prediction: {
        fixture_id: null,
        member_id: null,
        pool_id: null,
        home: null,
        away: null
      }
    }
  },
  filters: {
    formattedDate (fixtureDate) {
      return date.formatDate(fixtureDate, 'MM/DD/YY')
    },
    formattedDateText (fixtureDate) {
      return date.formatDate(fixtureDate, 'ddd MMM Do')
    },
    formattedTime (fixtureDate) {
      return date.formatDate(fixtureDate, 'h:mm a')
    }
  },
  computed: {
    ...mapGetters('predictions', ['predictions']),
    memberPrediction () {
      const prediction = this.predictions.find(prediction => parseInt(prediction.fixture_id) === parseInt(this.fixture.id) && parseInt(prediction.pool_id) === parseInt(this.poolId))
      if (prediction) {
        return prediction
      } else {
        return null
      }
    }
  },
  methods: {
    ...mapActions('predictions', ['updatePrediction']),
    setPrediction (option) {
      this.loading = true
      this.prediction.home = option
      this.updatePrediction(this.prediction).then((result) => {
        this.loading = false
      })
    },
    confirmUpdate (value) {
      if (value !== this.prediction.home) {
        this.$q.notify({
          timeout: 1500,
          message: `Update your prediction for ${value === 'W' ? this.fixture.away_name : value === 'L' ? this.fixture.home_name : ''} ${value === 'D' ? 'a draw' : 'to win'}`,
          color: 'brand-3',
          textColor: 'grey-3',
          actions: [
            {
              label: 'Confirm',
              textColor: 'grey-3 bg-brand-2 shadow-2',
              noCaps: true,
              icon: 'done_all',
              handler: () => this.setPrediction(value)
            }
          ]
        })
      }
    },
    showAddPredictionDialog () {
      this.$q.dialog({
        component: AddPrediciton,
        parent: this,
        fixture: this.fixture
      })
    }
  },
  mounted () {
    if (this.memberPrediction) {
      this.prediction = { ...this.memberPrediction }
    }
  }
}
</script>

<style>
.q-btn--rectangle {
  border-radius: 0px !important;
}
</style>
