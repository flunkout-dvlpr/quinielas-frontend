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
          v-for="(group, idx) in groups"
          :key="idx"
          @click="loadGroup(idx)"
        >
          <Group :group="group" :idx="idx" :selectedGroup="selectedGroup" />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import Group from 'components/Single/Group'
export default {
  name: 'Groups',
  components: { Group },
  data () {
    return {
      loading: false,
      selectedGroup: 0,
      groups: [
        {
          name: 'Drone Hurl',
          numberOfMembers: 6,
          members: [{ alias: 'Balunchic' }, { alias: 'BlueTalent' }, { alias: 'Burnianz' }, { alias: 'PongLaw' }, { alias: 'Upanic' }, { alias: 'Negenety' }]
        },
        {
          name: 'Crush Volley',
          numberOfMembers: 5,
          members: [{ alias: 'Wavexxli' }, { alias: 'Coorksma' }, { alias: 'Packtor' }, { alias: 'Discovernaft' }, { alias: 'ShabbySon' }]
        },
        {
          name: 'Monobatics',
          numberOfMembers: 4,
          members: [{ alias: 'Watelite' }, { alias: 'Editorrhin' }, { alias: 'LogGuanto' }, { alias: 'Pandornes' }]
        },
        {
          name: 'Still Pitch',
          numberOfMembers: 3,
          members: [{ alias: 'ShadowMc' }, { alias: 'Droppertu' }, { alias: 'Canyonspolo' }]
        }
      ]
    }
  },
  methods: {
    loadGroup (idx) {
      // console.log(this.selectedGroup, idx)
      this.selectedGroup = idx
    }
  }
}
</script>
