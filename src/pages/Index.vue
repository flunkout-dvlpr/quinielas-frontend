<template>
  <q-page>
    <!-- ROW I -->
    <div class="row justify-around items-start content-start">
      <!-- lEFT SIDE -->
      <div class="col-md-6 col-xs-11 q-my-md">
        <div class="row justify-center">
          <div class="col-md-11 col-xs-12 q-ma-sm">
            <router-view name="User"/>
          </div>
          <div class="col-md-11 col-xs-12 q-ma-sm">
            <router-view name="Groups" />
          </div>
        </div>
      </div>
      <!-- RIGHT SIDE -->
      <div class="col-md-6 col-xs-11 q-my-md">
        <div class="row justify-center">
          <div class="col-md-11 col-xs-12 q-ma-sm">
            <router-view name="Fixtures" />
          </div>
        </div>
      </div>
    </div>
    <!-- ROW II -->
    <div class="row justify-center items-start content-start">
      <div class="col-md-11 col-xs-11 q-my-md">
        <div class="row justify-center">
          <div class="col-md-12 col-xs-12 q-ma-sm">
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
