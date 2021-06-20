<template>
  <q-card
    class="shadow-20"
  >
    <q-card-section class="q-pa-none q-ma-none brand-green-gradient">
      <div class="row justify-center items-center content-center">
        <div class="col-md-9 col-xs-7 q-pa-sm">
          <div class="text-grey-3 text-h4 text-weight-regular">Fixtures</div>
        </div>
        <div class="col-md-3 col-xs-5 q-pa-sm">
          <q-btn
            outline
            no-caps
            :ripple="false"
            label="Add Fixture"
            class="fit text-grey-3"
          />
        </div>
      </div>
    </q-card-section>
    <q-card-section class="q-pa-none q-ma-none bg-brand-4">
      <div class="row justify-center items-center content-center q-pa-md">
        <div
          class="col-md-12 col-xs-12 q-ma-sm"
          v-for="(fixture, idx) in fixtures"
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
import Fixture from 'components/Single/Fixture'
export default {
  name: 'Fixtures',
  components: { Fixture },
  data () {
    return {
      loading: false,
      selectedFixture: 0,
      fixtures: [
        {
          name: 'Matchday 1',
          tournamentId: null,
          tournamentName: 'UEFA EURO 2020',
          group: {
            id: null,
            name: 'Crush Volley',
            numberOfMembers: 5
          },
          startDate: '06/11/21',
          endDate: '06/15/21',
          matches: [
            {
              time: '00:00',
              date: '06/11/21',
              teamA: { name: 'Turkey', flagLink: '' },
              teamB: { name: 'Italy', flagLink: '' },
              socreA: 0,
              scoreB: 3,
              winner: null
            },
            {
              time: '00:00',
              date: '06/12/21',
              teamA: { name: 'Wales', flagLink: '' },
              teamB: { name: 'Switzerland', flagLink: '' },
              socreA: 1,
              scoreB: 1,
              winner: null
            },
            {
              time: '00:00',
              date: '06/12/21',
              teamA: { name: '', flagLink: '' },
              teamB: { name: '', flagLink: '' },
              socreA: 0,
              scoreB: 0,
              winner: null
            },
            {
              time: '00:00',
              date: '06/12/21',
              teamA: { name: 'Denmark', flagLink: '' },
              teamB: { name: 'Finland', flagLink: '' },
              socreA: 0,
              scoreB: 1,
              winner: null
            },
            {
              time: '00:00',
              date: '06/13/21',
              teamA: { name: 'Belgium', flagLink: '' },
              teamB: { name: 'Russia', flagLink: '' },
              socreA: 3,
              scoreB: 0,
              winner: null
            },
            {
              time: '00:00',
              date: '06/13/21',
              teamA: { name: 'England', flagLink: '' },
              teamB: { name: 'Croatia', flagLink: '' },
              socreA: 1,
              scoreB: 0,
              winner: null
            },
            {
              time: '00:00',
              date: '06/13/21',
              teamA: { name: 'Austria', flagLink: '' },
              teamB: { name: 'North Macedonia', flagLink: '' },
              socreA: 3,
              scoreB: 1,
              winner: null
            }
            // {
            //   time: '00:00',
            //   date: '06/14/21',
            //   teamA: { name: '', flagLink: '' },
            //   teamB: { name: '', flagLink: '' },
            //   socreA: 0,
            //   scoreB: 0,
            //   winner: null
            // },
            // {
            //   time: '00:00',
            //   date: '06/14/21',
            //   teamA: { name: '', flagLink: '' },
            //   teamB: { name: '', flagLink: '' },
            //   socreA: 0,
            //   scoreB: 0,
            //   winner: null
            // },
            // {
            //   time: '00:00',
            //   date: '06/14/21',
            //   teamA: { name: 'Spain', flagLink: '' },
            //   teamB: { name: 'Sweden', flagLink: '' },
            //   socreA: 0,
            //   scoreB: 0,
            //   winner: null
            // },
            // {
            //   time: '00:00',
            //   date: '06/15/21',
            //   teamA: { name: 'France', flagLink: '' },
            //   teamB: { name: 'Germany', flagLink: '' },
            //   socreA: 0,
            //   scoreB: 0,
            //   winner: null
            // },
            // {
            //   time: '00:00',
            //   date: '06/15/21',
            //   teamA: { name: 'Hungary', flagLink: '' },
            //   teamB: { name: 'Portugal', flagLink: '' },
            //   socreA: 0,
            //   scoreB: 0,
            //   winner: null
            // },
            // {
            //   time: '00:00',
            //   date: '06/15/21',
            //   teamA: { name: '', flagLink: '' },
            //   teamB: { name: '', flagLink: '' },
            //   socreA: 0,
            //   scoreB: 0,
            //   winner: null
            // }
          ]
        },
        {
          name: 'Matchday 2',
          tournamentId: null,
          tournamentName: 'UEFA EURO 2020',
          group: {
            id: null,
            name: 'Still Pitch',
            numberOfMembers: 3
          },
          startDate: '06/16/21',
          endDate: '06/19/21',
          matches: [
            { time: '00:00', date: '06/16/21', teamA: { name: 'Finland' }, teamB: { name: 'Russia' }, socreA: 0, scoreB: 1, winner: null },
            { time: '00:00', date: '06/16/21', teamA: { name: 'Turkey' }, teamB: { name: 'Wales' }, socreA: 0, scoreB: 2, winner: null },
            { time: '00:00', date: '06/16/21', teamA: { name: 'Italy' }, teamB: { name: 'Switzerland' }, socreA: 3, scoreB: 0, winner: null },
            { time: '00:00', date: '06/17/21', teamA: { name: 'Ukraine' }, teamB: { name: 'North Macedonia' }, socreA: 2, scoreB: 1, winner: null },
            { time: '00:00', date: '06/17/21', teamA: { name: 'Denmark' }, teamB: { name: 'Belgium' }, socreA: 1, scoreB: 2, winner: null },
            { time: '00:00', date: '06/17/21', teamA: { name: 'Netherlands' }, teamB: { name: 'Austria' }, socreA: 2, scoreB: 0, winner: null }
            // { time: '00:00', date: '06/18/21', teamA: { name: '' }, teamB: { name: '' }, socreA: 0, scoreB: 0, winner: null },
            // { time: '00:00', date: '06/18/21', teamA: { name: '' }, teamB: { name: '' }, socreA: 0, scoreB: 0, winner: null },
            // { time: '00:00', date: '06/18/21', teamA: { name: '' }, teamB: { name: '' }, socreA: 0, scoreB: 0, winner: null },
            // { time: '00:00', date: '06/19/21', teamA: { name: '' }, teamB: { name: '' }, socreA: 0, scoreB: 0, winner: null },
            // { time: '00:00', date: '06/19/21', teamA: { name: '' }, teamB: { name: '' }, socreA: 0, scoreB: 0, winner: null },
            // { time: '00:00', date: '06/19/21', teamA: { name: '' }, teamB: { name: '' }, socreA: 0, scoreB: 0, winner: null }
          ]
        }
      ]
    }
  },
  methods: {
    loadFixture (idx) {
      // console.log(this.selectedFixture, idx)
      this.selectedFixture = idx
    }
  }
}
</script>
