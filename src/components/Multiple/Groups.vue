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
          <q-avatar square class="bg-brand-3" font-size="40px" icon="groups" text-color="grey-3"/>
        </div>
        <div class="q-mx-sm">
          <div class="text-grey-3 text-h4 text-weight-regular">Groups</div>
        </div>
      </div>
    </q-card-section>
    <q-card-section class="q-pa-none q-ma-none">
      <div
        class="row justify-start items-center content-center overflow-auto hide-scrollbar no-wrap q-py-sm q-px-none"
        style="height: 300px;"
      >
        <div class="col-md-4 col-xs-7 q-mx-sm q-my-xs">
          <div
            class="col border-dark-green-box-dash"
            style="height: 275px;"
          >
            <q-btn
              flat
              no-caps
              class="fit bg-brand-5"
              @click="showAddGroup()"
            >
              <q-icon size=20px name="add" color="grey-4"/>
              <div class="text-h6 text-center text-weight-regular text-grey-4">Group</div>
            </q-btn>
          </div>
        </div>

        <div
          class="col-md-4 col-xs-7 q-mx-sm q-my-xs"
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
import AddGroup from 'components/Dialog/AddGroup'
import Group from 'components/Single/Group'
export default {
  name: 'Groups',
  components: { Group },
  data () {
    return {
      loading: false,
      selectedGroup: null
    }
  },
  computed: {
    ...mapGetters('groups', ['groups']),
    groupId () {
      if (this.$route.params && this.$route.params.groupId !== null && !isNaN(this.$route.params.groupId)) {
        console.log('Groups.vue - groupId(): groupId Found In Route', this.$route.params.groupId)
        return parseInt(this.$route.params.groupId)
      } else {
        console.log('Groups.vue - groupId(): groupId Not Found In Route', this.$route.params.groupId)
        return null
      }
    }
  },
  methods: {
    loadGroup (idx) {
      this.selectedGroup = idx
      if (idx !== this.groupId) {
        console.log('Groups.vue - loadGroup(): Set groupId route param to idx', idx)
        this.$router.push({ name: 'Home', params: { groupId: idx } })
      }
    },
    showAddGroup () {
      this.selectedGroup = null
      if (this.groupId !== null) {
        console.log('Groups.vue - showAddGroup(): Set groupId route param to null')
        this.$router.push({ name: 'Home', params: { groupId: null } })
      }
      this.$q.dialog({
        component: AddGroup,
        parent: this
      })
    }
  },
  mounted () {
    if (this.groupId !== null) {
      console.log('Groups.vue - mounted(): groupId Found In groupId comp prop', this.groupId)
      this.selectedGroup = this.groupId
      this.loadGroup(this.groupId)
    } else {
      console.log('Groups.vue - mounted(): groupId Not Found In groupId comp prop', this.groupId)
      this.selectedGroup = null
    }
  }
}
</script>
