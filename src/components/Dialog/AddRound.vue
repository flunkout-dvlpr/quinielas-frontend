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
              :options="groupOptions"
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
              :options="competitionOptions"
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
              :options="rounds"
              v-model="selectedRound"
              label="Select Round"
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
import { date } from 'quasar'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'AddRound',
  data () {
    return {
      selectedRound: null,
      selectedGroup: null,
      selectedCompetition: { label: 'UEFA EURO 2020', value: '2018' }
    }
  },
  props: {
    groupId: Number
  },
  computed: {
    ...mapGetters('groups', ['groups']),
    ...mapGetters('rounds', ['rounds']),
    competitionOptions () {
      // 2018 is the competition id for API
      return [{ label: 'UEFA EURO 2020', value: '2018' }]
    },
    groupOptions () {
      const options = []
      this.groups.forEach(group => {
        group.label = group.name
        group.value = group.id
        options.push(group)
      })
      return options
    }
  },
  methods: {
    ...mapActions('rounds', ['updateFixtures']),
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
      const groupRound = {
        name: this.selectedRound,
        groupId: this.selectedGroup.id
      }
      console.log(groupRound)
      this.hide()
    }
  },
  mounted () {
    this.selectedGroup = this.availableGroups.find(group => group.value === this.groupId)
  }
}
</script>
