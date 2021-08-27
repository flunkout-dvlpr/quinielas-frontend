<template>
  <q-dialog ref="dialog">
  <q-card
    square
    style="width: 30rem;"
    class="shadow-20 bg-brand-6"
  >
    <q-card-section class="q-pa-none q-ma-none brand-green-gradient">
      <div class="row justify-center items-center content-center">
        <div class="col-md-12 col-xs-7 q-pa-sm">
          <div class="text-center text-grey-3 text-h4 text-weight-regular">Add Prediction</div>
        </div>
      </div>
    </q-card-section>
    <q-form @submit="onSubmit">
    <!-- FLAGS -->
    <div class="border-dark-green-box q-ma-md">
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
    </div>

    <!-- Prediction -->
    <q-card-section class="q-pa-sm q-ma-none bg-brand-6">
      <div class="row justify-center items-center content-center q-px-none q-py-xs">
        <div class="col-4">
          <q-btn
            flat
            no-caps
            :icon="prediction.home === 'W' ? 'done' : prediction.home === 'L' ? 'close' : prediction.home === 'D' ? '' : ''"
            :label="prediction.home === 'W' ? 'Win' : prediction.home === 'L' ? 'Lose' : prediction.home === 'D' ? '' : ''"
            text-color="grey-3 "
            :class="prediction.home === 'W' ? 'fit bg-green-5' : prediction.home === 'L' ? 'fit bg-red-5' : prediction.home === 'D' ? 'fit bg-orange-5' : 'fit'"
            @click="setPrediction('W')"
          />
        </div>
        <div class="col-4">
          <q-btn
            flat
            no-caps
            icon="block"
            label="Draw"
            text-color="grey-3 "
            class="fit bg-orange-5"
            @click="setPrediction('D')"
          />
        </div>
        <div class="col-4">
          <q-btn
            flat
            no-caps
            :icon="prediction.home === 'W' ? 'close' : prediction.home === 'L' ? 'done' : prediction.home === 'D' ? '' : ''"
            :label="prediction.home === 'W' ? 'Lose' : prediction.home === 'L' ? 'Win' : prediction.home === 'D' ? '' : ''"
            text-color="grey-3 "
            :class="prediction.home === 'W' ? 'fit bg-red-5' : prediction.home === 'L' ? 'fit bg-green-5' : prediction.home === 'D' ? 'fit bg-orange-5' : 'fit'"
            @click="setPrediction('L')"
          />
        </div>
      </div>
    </q-card-section>
    <!-- Create fixture Prediction -->
    <q-card-section class="q-pa-none q-ma-none bg-brand-6">
      <div class="row justify-center items-center content-center q-py-sm">
        <div class="col-6">
          <q-btn
            dark
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
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'AddPrediction',
  data () {
    return {
      selectedRound: null,
      selectedFixture: null,
      prediction: {
        member_id: null,
        pool_id: null,
        fixture_id: null,
        away: null,
        home: 'W'
      }
    }
  },
  props: {
    fixture: Object
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
    ...mapGetters('fixtures', ['fixtures']),
    ...mapGetters('member', ['member']),
    poolId () {
      if (this.$route.params && this.$route.params.poolId !== null) {
        return parseInt(this.$route.params.poolId)
      } else {
        return null
      }
    }
  },
  methods: {
    ...mapActions('predictions', ['createPrediction']),
    setPrediction (option) {
      this.prediction.home = option
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
      this.prediction.pool_id = this.poolId
      this.prediction.fixture_id = this.fixture.id
      this.prediction.member_id = this.member.id
      this.createPrediction(this.prediction)
      this.hide()
    }
  }
}
</script>
