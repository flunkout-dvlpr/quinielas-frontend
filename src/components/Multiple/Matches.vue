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
            @click="showAddMatchDialog()"
          />
        </div>
      </div>
    </q-card-section>
    <q-card-section class="q-pa-none q-ma-none bg-brand-4">
      <div class="row justify-start items-center content-center overflow-auto hide-scrollbar no-wrap q-pa-md">
        <div
          class="col-md-4 col-xs-11 q-ma-sm"
          v-for="(match, idx) in fixtureMatches"
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
import { mapGetters } from 'vuex'
import Match from 'components/Single/Match'
import AddMatch from 'components/Dialog/AddMatch'
export default {
  name: 'Matches',
  components: { Match },
  data () {
    return {
      loading: false,
      selectedMatch: 0
    }
  },
  computed: {
    ...mapGetters('matches', ['matches']),
    fixtureMatches () {
      if (this.$route.params && this.$route.params.fixtureId !== null) {
        return this.matches.filter(match => match.fixtureId === this.$route.params.fixtureId)
      } else {
        return []
      }
    }
  },
  methods: {
    loadMatch (idx) {
      this.selectedMatch = idx
    },
    showAddMatchDialog () {
      this.$q.dialog({
        component: AddMatch,
        parent: this
      })
    }
  }

}
</script>
