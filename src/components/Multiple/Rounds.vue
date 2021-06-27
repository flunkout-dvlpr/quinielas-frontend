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
          v-for="round in groupRounds"
          :key="round"
          @click="loadRound(round)"
        >
          <Round :round="round" :groupId="groupId" :selectedRound="selectedRound" />
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
    ...mapGetters('rounds', ['rounds']),
    groupId () {
      if (this.$route.params && this.$route.params.groupId !== null) {
        console.log('rounds.vue - groupId(): groupId Found In Route', this.$route.params.groupId)
        return parseInt(this.$route.params.groupId)
      } else {
        console.log('rounds.vue - groupId(): groupId Not Found In Route', this.$route.params.groupId)
        return null
      }
    },
    round () {
      if (this.$route.params && this.$route.params.round !== null && !isNaN(this.$route.params.round)) {
        console.log('rounds.vue - round(): round Found In Route', this.$route.params.round)
        return parseInt(this.$route.params.round)
      } else {
        console.log('rounds.vue - round(): round Not Found In Route', this.$route.params.round)
        return null
      }
    },
    groupRounds () {
      if (this.groupId !== null) {
        console.log('rounds.vue - groupRounds(): returning rounds with groupId', this.groupId)
        return this.rounds.filter(fixture => parseInt(fixture.groupId) === parseInt(this.groupId))
      }
      console.log('rounds.vue - groupRounds(): groupId is null, return empty []')
      return []
    }
  },
  methods: {
    loadRound (idx) {
      this.selectedRound = idx
      if (this.groupId !== null && idx !== null) {
        if (idx !== this.round) {
          console.log('lFixtures.vue - oadFixture(): Set round route param to idx', idx)
          this.$router.push({ name: 'Home', params: { groupId: this.groupId, round: idx } })
        }
      }
    },
    showAddRoundDialog () {
      if (typeof this.groupId === 'number' && !isNaN(this.groupId)) {
        this.$q.dialog({
          component: AddRound,
          parent: this,
          groupId: parseInt(this.groupId)
        })
      } else {
        this.$q.notify({
          color: 'orange-5',
          position: 'top',
          textColor: 'grey-9',
          message: 'Please select a group first',
          icon: 'group_add'
        })
      }
    }
  }
  // mounted () {
  //   if (this.round !== null) {
  //     console.log('rounds.vue - mounted(): round Found In round comp prop', this.round)
  //     this.selectedRound = this.round
  //     this.loadRound(this.round)
  //   } else {
  //     console.log('rounds.vue - mounted(): round Not Found In round comp prop', this.round)
  //     this.selectedRound = null
  //   }
  // },
  // updated () {
  //   this.$nextTick(function () {
  //     if (this.round !== null) {
  //       console.log('rounds.vue - updated(): round Found In round comp prop', this.round)
  //       this.selectedRound = this.round
  //       this.loadRound(this.round)
  //     } else {
  //       console.log('rounds.vue - updated(): round Not Found In round comp prop', this.round)
  //       this.selectedRound = null
  //     }
  //   })
  // }
}
</script>
