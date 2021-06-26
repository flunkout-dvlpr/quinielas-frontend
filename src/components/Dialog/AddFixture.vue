<template>
  <q-dialog ref="dialog">
  <q-card
    style="width: 25rem;"
    class="shadow-20 bg-brand-6"
  >
    <q-card-section class="q-pa-xs q-mb-md brand-green-gradient">
      <div class="row justify-center items-center content-center">
        <div class="col-md-12 col-xs-12 q-pa-sm">
          <div class="text-center text-grey-3 text-h4 text-weight-regular">Add Fixture</div>
        </div>
      </div>
    </q-card-section>
    <!-- Group -->
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
              :options="availableGroups"
              v-model="selectedGroup"
              label="Select Group"
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
              :options="competitions"
              v-model="selectedCompetition"
              label="Select Competition"
              readonly
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
              :options="fixtures"
              v-model="selectedFixture"
              label="Select Fixture"
              :rules="[ val => val !== null || 'Please Select A Fixture!']"
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
import { date } from 'quasar'
import { mapGetters, mapActions } from 'vuex'
import euro from 'src/assets/euro.json'
export default {
  name: 'AddFixture',
  data () {
    return {
      selectedFixture: null,
      selectedGroup: null,
      selectedCompetition: { label: 'UEFA EURO 2020', value: '2018' },
      test: euro
    }
  },
  props: {
    groupId: Number
  },
  computed: {
    ...mapGetters('groups', ['groups']),
    competitions () {
      // 2018 is the competition id for API
      return [{ label: 'UEFA EURO 2020', value: '2018' }]
    },
    availableGroups () {
      const options = []
      this.groups.forEach(group => {
        group.label = group.name
        group.value = group.id
        options.push(group)
      })
      return options
    },
    fixtures () {
      const options = []
      this.test.matches.forEach(match => {
        if (!options.some(m => m.value === match.matchday)) {
          if (match.group) {
            options.push({ label: `Matchday ${match.matchday}`, value: match.matchday })
          } else {
            const stageLabel = match.stage.replace(/_/g, ' ').toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')
            options.push({ label: stageLabel, value: match.matchday })
          }
        }
      })
      return options
    },
    matches () {
      if (this.selectedFixture.value) {
        return this.test.matches.filter(match => match.matchday === this.selectedFixture.value).sort(function (a, b) {
          const keyA = date.extractDate(a.utcDate, 'YYYY-MM-DDTHH:mm')
          const keyB = date.extractDate(b.utcDate, 'YYYY-MM-DDTHH:mm')
          if (keyA < keyB) return -1
          if (keyA > keyB) return 1
          return 0
        })
      } else {
        return []
      }
    }
  },
  methods: {
    ...mapActions('fixtures', ['updateFixtures']),
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
      const fixture = {
        id: this.selectedFixture.value,
        groupId: this.selectedGroup.id,
        name: this.selectedFixture.label,
        competitionId: this.selectedCompetition.value,
        competitionName: this.selectedCompetition.label,
        startDate: date.formatDate(date.extractDate(this.matches[0].utcDate, 'YYYY-MM-DDTHH:mm'), 'ddd - MM/DD/YYYY'),
        endDate: date.formatDate(date.extractDate(this.matches[this.matches.length - 1].utcDate, 'YYYY-MM-DDTHH:mm'), 'ddd - MM/DD/YYYY')
      }
      this.updateFixtures(fixture)
      this.hide()
    }
  },
  mounted () {
    this.selectedGroup = this.availableGroups.find(group => group.value === this.groupId)
  }
}
</script>
