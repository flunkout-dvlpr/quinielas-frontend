<template>
  <q-card
    square
    :class="idx === selectedFixture ? 'bg-brand-5 border-dark-green-box shadow-8' : 'bg-brand-5 border-dark-green-box'"
  >
    <q-card-section class="q-pa-none q-ma-none">
      <q-item class="fit">
        <q-item-section avatar center>
          <q-avatar square :size="$q.platform.is.mobile ? '65px' : '75px'" class="bg-brand-3 shadow-5">
            <q-icon
              :size="$q.platform.is.mobile ? '35px' : '50px'"
              name="account_tree"
              color="brand-1"
            />
          </q-avatar>
        </q-item-section>
        <q-item-section middle center>
          <q-item-label class="q-px-sm q-pt-sm text-grey-3 text-h6">
            {{ fixture.name }}
          </q-item-label>
          <q-item-label class="q-px-sm q-pt-xs text-grey-3 text-h8">
            {{ fixture.startDate }} - {{ fixture.endDate }}
          </q-item-label>
          <q-item-label  class="q-px-sm q-pt-sm text-grey-3 text-caption">
            {{ fixture.tournamentName }}
          </q-item-label>
        </q-item-section>
        <q-item-section side center class="desktop-only">
          <q-item-label class="q-px-sm q-pt-sm text-grey-3 text-weight-regular text-h8">
            Group: {{ fixture.group.name }}
          </q-item-label>
          <q-item-label class="q-px-sm q-pt-sm text-grey-3 text-weight-regular text-h8">
            # of Members: {{ fixture.group.numberOfMembers }}
          </q-item-label>
          <q-item-label class="q-px-sm q-pt-sm text-grey-3 text-weight-regular text-h8">
            # of Matches: {{ fixture.matches.length }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'Fixture',
  data () {
    return {
      loading: false
    }
  },
  props: {
    fixture: Object,
    idx: Number,
    selectedFixture: Number
  }
}
</script>
