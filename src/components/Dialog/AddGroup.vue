<template>
  <q-dialog ref="dialog">
  <q-card
    style="width: 25rem;"
    class="shadow-20 bg-brand-6"
  >
    <q-card-section class="q-pa-xs q-mb-md brand-green-gradient">
      <div class="row justify-center items-center content-center">
        <div class="col-md-12 col-xs-12 q-pa-sm">
          <div class="text-center text-grey-3 text-h4 text-weight-regular">Add Group</div>
        </div>
      </div>
    </q-card-section>
    <!-- Group -->
    <q-form @submit="onSubmit">
    <q-card-section class="q-pa-sm">
      <div class="row justify-center items-center content-center">
        <div class="col-12 q-px-sm q-pt-none q-pb-xs">
          <div class="">
            <q-input
              dark
              square
              outlined
              color="brand-1"
              v-model="group.name"
              label="Group Name"
              :rules="[ val => val && val.length > 0 || 'Group Name Required']"
            />
          </div>
        </div>
      </div>
    </q-card-section>
    <!-- Tournament -->
<!--     <q-card-section class="q-pa-sm">
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
    </q-card-section> -->
    <!-- Fixture -->
<!--     <q-card-section class="q-pa-sm">
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
            />
          </div>
        </div>
      </div>
    </q-card-section> -->
    <!-- Create Group -->
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
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'AddGroup',
  data () {
    return {
      group: {
        id: null,
        name: null,
        numberOfMembers: 0,
        members: []
      }
    }
  },
  computed: {
    ...mapGetters('groups', ['groups'])
  },
  methods: {
    ...mapActions('groups', ['updateGroups']),
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
      const ids = this.groups.map(group => group.id).sort()
      this.group.id = ids[ids.length - 1] + 1
      this.updateGroups(this.group)
      this.hide()
    }
  }
}
</script>
