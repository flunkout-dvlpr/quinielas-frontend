<template>
  <q-card square class="bg-brand-4 border-dark-green-box shadow-20">
    <q-card-section class="q-pa-none q-ma-none">
      <q-item class="fit">
        <q-item-section avatar>
          <q-avatar square :size="$q.platform.is.mobile ? '100px' : '75px'" class="bg-brand-3 shadow-3">
            <q-icon
              :size="$q.platform.is.mobile ? '90px' : '70px'"
              name="person"
              color="brand-1"
            />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-grey-3 text-h4">{{ user.alias }}</q-item-label>
          <q-item-label  class="text-grey-3 text-h6">{{ user.firstName }} {{ user.lastName }}</q-item-label>
        </q-item-section>
        <q-item-section side center>
          <q-item-label class="text-grey-3 text-weight-regular text-h8">Win Ratio: {{ winRatio | winRatioFormat }}</q-item-label>
          <q-item-label class="text-grey-3 text-weight-regular text-h8">Rank: {{ user.rank }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-card-section>
  </q-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'User',
  filters: {
    winRatioFormat: function (winRatio) {
      return `${Math.round(winRatio * 100)}%`
    }
  },
  computed: {
    ...mapGetters('user', ['user']),
    winRatio () {
      return this.user.wCount / (this.user.lCount + this.user.wCount)
    }
  }
}
</script>
