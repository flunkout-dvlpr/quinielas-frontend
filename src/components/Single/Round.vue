<template>
  <q-card
    square
    :class="round.round_id === selectedRound ? 'bg-brand-5 border-green-box shadow-8' : 'bg-brand-5 border-dark-green-box'"
  >
    <q-card-section class="q-pa-none q-ma-none">
      <q-item class="fit">
        <q-item-section avatar center>
          <q-avatar square :size="$q.platform.is.mobile ? '65px' : '75px'" class="bg-brand-3 shadow-5">
<!--             <q-icon
              :size="$q.platform.is.mobile ? '35px' : '50px'"
              name="account_tree"
              color="brand-1"
            /> -->
            <q-img
              :src="league.logo"
              :width="$q.platform.is.mobile ? '35px' : '55px'"
              :height="$q.platform.is.mobile ? '35px' : '55px'"
            />
          </q-avatar>
        </q-item-section>
        <q-item-section middle top>
          <q-item-label class="q-px-sm q-pt-sm text-grey-3 text-h6">
            {{ round.round_name }}
          </q-item-label>
          <q-item-label class="q-px-sm q-pt-xs text-grey-3 text-h8">
            {{ startDate }} - {{ endDate }}
          </q-item-label>
          <q-item-label  class="q-px-sm q-pt-sm text-grey-3 text-h8">
            {{league.type}} | {{ league.name }}
          </q-item-label>
        </q-item-section>
        <q-item-section side center class="desktop-only">
          <q-item-label class="q-px-sm q-pt-sm text-grey-3 text-weight-regular text-h8">
            Pool: {{ pool.name }}
          </q-item-label>
          <q-item-label class="q-px-sm q-pt-sm text-grey-3 text-weight-regular text-h8">
            # of Members: {{ pool.members.length }}
          </q-item-label>
          <q-item-label class="q-px-sm q-pt-sm text-grey-3 text-weight-regular text-h8">
            # of Matches: {{ roundFixtures.length }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-card-section>
  </q-card>
</template>

<script>
import { date } from 'quasar'
import { mapGetters } from 'vuex'
export default {
  name: 'Round',
  props: {
    round: Object,
    poolId: Number,
    selectedRound: Number
  },
  computed: {
    ...mapGetters('rounds', ['rounds']),
    ...mapGetters('fixtures', ['fixtures']),
    ...mapGetters('leagues', ['leagues']),
    ...mapGetters('pools', ['pools']),
    league () {
      return this.leagues.find(league => league.id === this.round.league_id)
    },
    roundFixtures () {
      return this.fixtures.filter(fixture => fixture.round === this.round.round_name && fixture.league_id === this.round.league_id && fixture.season === this.round.season).sort(function (a, b) {
        return date.extractDate(a.date, 'YYYY-MM-DDTHH:mm:ss') - date.extractDate(b.date, 'YYYY-MM-DDTHH:mm:ss')
      })
    },
    startDate () {
      const startDate = date.extractDate(this.roundFixtures[0].date, 'YYYY-MM-DDThh:mm:ss')
      return date.formatDate(startDate, 'MM/DD/YY')
    },
    endDate () {
      const endDate = date.extractDate(this.roundFixtures[this.roundFixtures.length - 1].date, 'YYYY-MM-DDThh:mm:ss')
      return date.formatDate(endDate, 'MM/DD/YY')
    },
    pool () {
      return this.pools.find(pool => pool.id === this.poolId)
    }
  }
}
</script>
