<template>
  <div class="row justify-center items-center content-center brand-light-blue-gradient shadow-20">
    <div class="col-12 full-width">
      <q-item class="fit">
        <q-item-section avatar>
          <q-avatar :size="$q.platform.is.mobile ? '50px' : '75px'" color="brand-5" icon="person"/>
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-grey-3 text-h4">{{ user.alias }}</q-item-label>
          <q-item-label  class="text-grey-3 text-h8" lines="1">{{ user.firstName }} {{ user.lastName }}</q-item-label>
        </q-item-section>
        <q-item-section side center>
          <q-item-label class="text-grey-3 text-weight-regular text-h6">Win Ratio: {{ winRatio | winRatioFormat }}</q-item-label>
          <q-item-label class="text-grey-3 text-weight-regular text-h6">Rank: {{ user.rank }}</q-item-label>
        </q-item-section>
      </q-item>
    </div>
  </div>
</template>

<script>
export default {
  name: 'User',
  data () {
    return {
      user: {
        alias: 'j.gent',
        firstName: 'John',
        lastName: 'Gentile',
        lCount: 235,
        wCount: 129,
        rank: 1392
      }
    }
  },
  filters: {
    winRatioFormat: function (winRatio) {
      return `${Math.round(winRatio * 100)}%`
    }
  },
  computed: {
    winRatio () {
      return this.user.wCount / (this.user.lCount + this.user.wCount)
    }
  }
}
</script>
