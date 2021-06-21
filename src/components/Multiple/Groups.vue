<template>
  <q-card
    class="shadow-20"
  >
    <q-card-section class="q-pa-none q-ma-none brand-green-gradient">
      <div class="row justify-center items-center content-center">
        <div class="col-md-9 col-xs-7 q-pa-sm">
          <div class="text-grey-3 text-h4 text-weight-regular">Groups</div>
        </div>
        <div class="col-md-3 col-xs-5 q-pa-sm">
          <q-btn
            outline
            no-caps
            :ripple="false"
            label="Add Group"
            class="fit text-grey-3"
          />
        </div>
      </div>
    </q-card-section>
    <q-card-section class="q-pa-none q-ma-none bg-brand-4">
      <div class="row justify-start items-start content-center overflow-auto hide-scrollbar no-wrap q-pa-md">
        <div
          class="col-md-4 col-xs-7 q-ma-sm"
          v-for="group in groups"
          :key="group.id"
          @click="loadGroup(group.id)"
        >
          <Group :group="group" :idx="group.id" :selectedGroup="selectedGroup" />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { mapGetters } from 'vuex'
import Group from 'components/Single/Group'
export default {
  name: 'Groups',
  components: { Group },
  data () {
    return {
      loading: false,
      selectedGroup: 0
    }
  },
  computed: {
    ...mapGetters('groups', ['groups'])
  },
  methods: {
    loadGroup (idx) {
      this.selectedGroup = idx
      if (this.$route.params && this.$route.params.groupId) {
        if (idx !== this.$route.params.groupId) {
          this.$router.push({ name: 'Home', params: { groupId: idx } })
        }
      } else {
        this.$router.push({ name: 'Home', params: { groupId: idx } })
      }
    }
  }
}
</script>
