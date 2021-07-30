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
            Number of Members: {{ group.members.length }}
          </div>
        </div>
      </div>
    </q-card-section>
    <q-card-section class="q-pa-none q-mx-none q-mt-sm q-mb-none" style="height: 200px;">
      <div class="row justify-center items-center content-center q-mx-sm bg-brand-4 border-dark-green-box-thin">
        <div class="col q-pa-none q-ma-none overflow-auto" style="max-height: 180px;">
          <div
            v-for="(member, idx) in group.members"
            :key="idx"
            :class="idx % 2 == 0 ? 'bg-brand-6' : 'bg-brand-4'"
          >
            <div class="row justify-between items-center content-center">
              <div class="col-2 text-center text-caption text-grey-4 bg-dark">
                {{idx+1}}.
              </div>
              <div class="col-10 text-left text-caption text-grey-4 q-px-xs">
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
