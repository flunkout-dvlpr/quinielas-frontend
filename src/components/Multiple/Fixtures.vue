<template>
  <q-card
    class="shadow-20"
  >
    <q-card-section class="q-pa-none q-ma-none brand-green-gradient">
      <div class="row justify-center items-center content-center">
        <div class="col-md-9 col-xs-7 q-pa-sm">
          <div class="text-grey-3 text-h4 text-weight-regular">Fixtures</div>
        </div>
        <div class="col-md-3 col-xs-5 q-pa-sm">
          <q-btn
            outline
            no-caps
            :ripple="false"
            label="Add Fixture"
            class="fit text-grey-3"
          />
        </div>
      </div>
    </q-card-section>
    <q-card-section class="q-pa-none q-ma-none bg-brand-4">
      <div class="row justify-center items-center content-center q-pa-md">
        <div
          class="col-md-12 col-xs-12 q-ma-sm"
          v-for="fixture in groupFixtures"
          :key="fixture.id"
          @click="loadFixture(fixture.id)"
        >
          <Fixture :fixture="fixture" :idx="fixture.id" :selectedFixture="selectedFixture" />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { mapGetters } from 'vuex'
import Fixture from 'components/Single/Fixture'
export default {
  name: 'Fixtures',
  components: { Fixture },
  data () {
    return {
      loading: false,
      selectedFixture: 0
    }
  },
  computed: {
    ...mapGetters('fixtures', ['fixtures']),
    groupFixtures () {
      if (this.$route.params && this.$route.params.groupId !== null) {
        console.log('Route Group ID', this.$route.params.groupId)
        return this.fixtures.filter(fixture => parseInt(fixture.groupId) === parseInt(this.$route.params.groupId))
      }
      console.log('Error')
      return this.fixtures
    }
  },
  methods: {
    loadFixture (idx) {
      this.selectedFixture = idx
      if (this.$route.params && this.$route.params.groupId && this.$route.params.fixtureId) {
        if (idx !== this.$route.params.fixtureId) {
          this.$router.push({ name: 'Home', params: { groupId: this.$route.params.groupId, fixtureId: idx } })
        }
      } else {
        this.$router.push({ name: 'Home', params: { groupId: this.$route.params.groupId, fixtureId: idx } })
      }
    }
  }
}
</script>
