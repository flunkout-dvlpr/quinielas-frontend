<template>
  <q-card
    square
    style="height: 275px"
    :class="idx === selectedGroup ? 'bg-brand-5 border-green-box shadow-8' : 'bg-brand-5 border-dark-green-box'"
  >
    <q-card-section class="q-pa-none q-ma-none">
      <div class="row justify-center items-center content-center">
        <div class="col-12 q-px-sm q-pt-xs q-pb-none">
          <div class="text-h6 text-grey-3">
            {{ group.name }}
          </div>
        </div>
        <div class="col-12 q-px-sm q-pt-none q-pb-none">
          <div class="text-caption text-grey-3">
            Number of Members: {{ group.numberOfMembers }}
          </div>
        </div>
      </div>
    </q-card-section>
    <q-card-section class="q-pa-none q-ma-none">
      <div class="row justify-center items-center content-center">
        <div class="col-11 q-ma-sm q-pa-sm bg-brand-4">
          <div class="row justify-center items-center content-center">
            <div class="col-12 q-pa-none">
              <div class="text-caption text-grey-3">Members:</div>
            </div>
            <div
              class="col-12 q-px-xs q-mb-xs bg-brand-5"
              v-for="(member, idx) in group.members"
              :key="idx"
            >
              <div class="text-caption text-grey-3">
                {{ member.alias }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'Group',
  props: {
    idx: Number,
    selectedGroup: Number,
    group: Object
  }
}
</script>
