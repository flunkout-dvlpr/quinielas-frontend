<template>
  <q-page class="flex-start">
    <div class="row justify-center items-start content-center q-mt-sm">
      <div class="col-md-5 col-xs-11">
        <router-view class="q-mt-sm q-mx-sm"  name="User" />
      </div>
    </div>
    <div class="row justify-center items-start content-center q-mt-sm">
      <div class="col-md-5 col-xs-11">
        <router-view class="q-mt-sm q-mx-sm" name="Groups" />
      </div>
      <div class="col-md-5 col-xs-11">
        <router-view class="q-mt-sm q-mx-sm" name="Fixtures" />
      </div>
    </div>
    <div class="row justify-center items-start content-center q-mt-sm">
      <div class="col-md-10 col-xs-11">
        <router-view class="q-mt-sm q-mx-sm" name="Matches" />
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
export default {
  name: 'Index',
  data () {
    return {
      loading: false
    }
  }
}
</script>
