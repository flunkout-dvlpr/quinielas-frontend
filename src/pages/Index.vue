<template>
  <q-page>
    <div class="row justify-center items-start content-start q-mt-md q-mb-sm">
      <div class="col-md-6 col-xs-12">
        <div class="row justify-center full-width">
          <div class="col-11">
            <router-view name="User" />
          </div>
          <div style="height: 175px" class="col-11">
            <router-view name="Groups" />
          </div>
        </div>
      </div>
      <div class="col-md-6 col-xs-12">
        <div class="row justify-center full-width">
          <div style="height: 350px" class="border-box col-11">
            <router-view name="Fixtures" />
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-start items-start content-start q-mt-none q-mb-sm">
      <div class="col-md-6 col-xs-12">
        <div class="row justify-center full-width">
          <div style="height: 350px" class="border-box col-11">
            <router-view name="Matches" />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex'
}
</script>

<style type="text/css">
.border-box {
  border-style: solid
}
</style>
