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
          <div class="text-grey-3 text-h4 text-weight-regular">Matches</div>
        </div>
      </div>
    </q-card-section>
<!--     <q-card-section class="q-pa-none q-ma-none">
      <div
        class="row justify-start items-center content-center overflow-auto hide-scrollbar no-wrap q-py-sm q-px-none"
        style="height: 300px;"
      >
        <div
          class="col-md-4 col-xs-11"
          v-for="(match, idx) in fixtureMatches"
          :key="idx"
          @click="loadMatch(idx)"
        >
          <Match :match="match" :idx="idx" :selectedMatch="selectedMatch" />
        </div>
      </div>
    </q-card-section> -->
    <q-card-section class="q-pa-none q-ma-none">
      <div
        class="row justify-start items-center content-center overflow-auto hide-scrollbar no-wrap q-py-sm q-px-none"
        style="height: 225px;"
      >
        <div class="col-md-4 col-xs-6 q-mx-sm q-my-xs">
          <div
            class="col border-dark-green-box-dash"
            style="height: 195px;"
          >
            <q-btn
              flat
              no-caps
              class="fit bg-brand-5"
              @click="showAddMatchDialog()"
            >
              <q-icon size=20px name="add" color="grey-4"/>
              <div class="text-h6 text-center text-weight-regular text-grey-4">Match</div>
            </q-btn>
          </div>
        </div>
        <div
          class="col-md-4 col-xs-11 q-mx-sm q-my-xs"
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
    groupId () {
      if (this.$route.params && this.$route.params.groupId !== null) {
        console.log('Matches.vue - groupId(): groupId Found In Route', this.$route.params.groupId)
        return parseInt(this.$route.params.groupId)
      } else {
        console.log('Matches.vue - groupId(): groupId Not Found In Route', this.$route.params.groupId)
        return null
      }
    },
    fixtureId () {
      if (this.$route.params && this.$route.params.fixtureId !== null && !isNaN(this.$route.params.fixtureId)) {
        console.log('Matches.vue - fixtureId() :fixtureId Found In Route', this.$route.params.fixtureId)
        return parseInt(this.$route.params.fixtureId)
      } else {
        console.log('Matches.vue - fixtureId() :fixtureId Not Found In Route', this.$route.params.fixtureId)
        return null
      }
    },
    fixtureMatches () {
      if (this.fixtureId !== null && this.groupId !== null) {
        console.log('Matches.vue - fixtureMatches(): returning matches with fixtureId', this.fixtureId)
        return this.matches.filter(match => match.fixtureId === this.fixtureId && match.groupId === this.groupId)
      } else {
        console.log('Matches.vue - fixtureMatches(): fixtureId is null, return empty []', this.fixtureId)
        return []
      }
    }
  },
  methods: {
    loadMatch (idx) {
      this.selectedMatch = idx
    },
    showAddMatchDialog () {
      if (this.fixtureId !== null) {
        this.$q.dialog({
          component: AddMatch,
          parent: this,
          fixtureId: this.fixtureId
        })
      } else {
        this.$q.notify({
          color: 'orange-5',
          position: 'top',
          textColor: 'grey-9',
          message: 'Please select a fixture first',
          icon: 'account_tree'
        })
      }
    }
  }
}
</script>
