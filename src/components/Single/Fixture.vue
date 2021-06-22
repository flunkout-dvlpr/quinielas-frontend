<template>
  <q-card
    square
    :class="idx === selectedFixture ? 'bg-brand-5 border-green-box shadow-8' : 'bg-brand-5 border-dark-green-box'"
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
            {{ fixture.competitionName }}
          </q-item-label>
        </q-item-section>
        <q-item-section side center class="desktop-only">
          <q-item-label class="q-px-sm q-pt-sm text-grey-3 text-weight-regular text-h8">
            Group: {{ fixtureGroup.name }}
          </q-item-label>
          <q-item-label class="q-px-sm q-pt-sm text-grey-3 text-weight-regular text-h8">
            # of Members: {{ fixtureGroup.members.length }}
          </q-item-label>
          <q-item-label class="q-px-sm q-pt-sm text-grey-3 text-weight-regular text-h8">
            # of Matches: {{ fixtureMatches.length }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-card-section>
  </q-card>
</template>

<script>
import { mapGetters } from 'vuex'
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
  },
  computed: {
    ...mapGetters('matches', ['matches']),
    ...mapGetters('groups', ['groups']),
    fixtureMatches () {
      return this.matches.filter(match => match.fixtureId === this.fixture.id)
    },
    fixtureGroup () {
      return this.groups.find(group => group.id === this.fixture.groupId)
    }
  }
}
</script>
