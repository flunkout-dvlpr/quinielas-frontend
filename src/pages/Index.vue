<template>
  <q-page class="flex-start">
    <div class="row justify-center items-start content-center q-my-sm">
      <div class="col-md-3 col-xs-11">
        <router-view class="q-mt-sm q-mx-sm"  name="Member" />
      </div>
    </div>
    <div class="row justify-center items-start content-center q-my-sm">
      <div class="col-md-5 col-xs-11">
        <router-view class="q-mt-sm q-mx-sm" name="Pools" />
      </div>
      <div class="col-md-5 col-xs-11">
        <router-view class="q-mt-sm q-mx-sm" name="Rounds" />
      </div>
    </div>
    <div class="row justify-center items-start content-center q-my-sm">
      <div class="col-md-10 col-xs-11">
        <router-view class="q-mt-sm q-mx-sm" name="Fixtures" />
      </div>
    </div>

    <q-inner-loading
      :showing="loading"
    >
      <q-spinner-bars
        size="5rem"
        color="brand-4"
      />
    </q-inner-loading>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Index',
  data () {
    return {
      loading: false
    }
  },
  methods: {
    ...mapActions('member', ['loadMember'])
  },
  mounted () {
    this.loadMember(8325895877)
  }
}
</script>
