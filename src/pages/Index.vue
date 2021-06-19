<template>
  <q-page>
    <div class="row justify-center items-start content-start q-my-md">
      <div class="col-md-6 col-xs-12">
        <div class="row justify-center full-width">
          <div style="height: 175px" class="col-12 bg-purple">
            <div class="q-pa-md text-center text-h2 text-black">User</div>
          </div>
          <div style="height: 175px" class="col-12 bg-orange">
            <div class="q-pa-md text-center text-h2 text-black">Groups</div>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-xs-12">
        <div class="row justify-center full-width">
          <div style="height: 350px" class="col-12 bg-yellow">
            <div class="q-pa-md text-center text-h2 text-black">Fixtures</div>
            <div class="q-pa-md text-center text-h6 text-black">F1, ... FN, ... F10</div>
          </div>
        </div>
      </div>
      <div class="col-md-12 col-xs-12">
        <div class="row justify-center full-width">
          <div style="height: 350px" class="col-12 bg-green">
            <div class="q-pa-md text-center text-h2 text-black">Matches</div>
            <div class="q-pa-md text-center text-h6 text-black">M1-FN, ... MN-FN, ... MN-FN</div>
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
