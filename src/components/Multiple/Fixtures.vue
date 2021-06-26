<template>
  <q-card
    class="shadow-20 bg-brand-4"
  >
    <q-card-section class="q-pa-none q-ma-none brand-green-gradient">
      <div
        class="row justify-start items-center content-center"
        style="height: 60px;"
      >
        <div class="q-mx-sm">
          <q-avatar square class="bg-brand-3" font-size="40px" icon="account_tree" text-color="grey-3"/>
        </div>
        <div class="q-mx-sm">
          <div class="text-grey-3 text-h4 text-weight-regular">Fixtures</div>
        </div>
      </div>
    </q-card-section>
    <q-card-section class="q-pa-none q-ma-none">
      <div
        class="row justify-center items-start content-start hide-scrollbar q-pa-sm"
        style="height: 300px;overflow-y: scroll;"
      >
        <div
          class="col-md-12 col-xs-12 column justify-center q-mx-none q-my-sm"
          style="height: 75px;"
        >
          <div class="col border-dark-green-box-dash">
            <q-btn
              flat
              no-caps
              class="fit bg-brand-5"
              @click="showAddFixtrueDialog()"
            >
              <q-icon size=20px name="add" color="grey-4"/>
              <div class="text-h6 text-center text-weight-regular text-grey-4">Fixture</div>
            </q-btn>
          </div>
        </div>
        <div
          class="col-md-12 col-xs-12 q-mx-none q-my-sm"
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
import AddFixture from 'components/Dialog/AddFixture'
export default {
  name: 'Fixtures',
  components: { Fixture },
  data () {
    return {
      loading: false,
      selectedFixture: null
    }
  },
  computed: {
    ...mapGetters('fixtures', ['fixtures']),
    groupId () {
      if (this.$route.params && this.$route.params.groupId !== null) {
        console.log('Fixtures.vue - groupId(): groupId Found In Route', this.$route.params.groupId)
        return parseInt(this.$route.params.groupId)
      } else {
        console.log('Fixtures.vue - groupId(): groupId Not Found In Route', this.$route.params.groupId)
        return null
      }
    },
    fixtureId () {
      if (this.$route.params && this.$route.params.fixtureId !== null && !isNaN(this.$route.params.fixtureId)) {
        console.log('Fixtures.vue - fixtureId(): fixtureId Found In Route', this.$route.params.fixtureId)
        return parseInt(this.$route.params.fixtureId)
      } else {
        console.log('Fixtures.vue - fixtureId(): fixtureId Not Found In Route', this.$route.params.fixtureId)
        return null
      }
    },
    groupFixtures () {
      if (this.groupId !== null) {
        console.log('Fixtures.vue - groupFixtures(): returning fixtures with groupId', this.groupId)
        return this.fixtures.filter(fixture => parseInt(fixture.groupId) === parseInt(this.groupId))
      }
      console.log('Fixtures.vue - groupFixtures(): groupId is null, return empty []')
      return []
    }
  },
  methods: {
    loadFixture (idx) {
      this.selectedFixture = idx
      if (this.groupId !== null && idx !== null) {
        if (idx !== this.fixtureId) {
          console.log('lFixtures.vue - oadFixture(): Set fixtureId route param to idx', idx)
          this.$router.push({ name: 'Home', params: { groupId: this.groupId, fixtureId: idx } })
        }
      }
    },
    showAddFixtrueDialog () {
      if (typeof this.groupId === 'number' && !isNaN(this.groupId)) {
        this.$q.dialog({
          component: AddFixture,
          parent: this,
          groupId: parseInt(this.groupId)
        })
      } else {
        this.$q.notify({
          color: 'orange-5',
          position: 'top',
          textColor: 'grey-9',
          message: 'Please select a group first',
          icon: 'group_add'
        })
      }
    }
  },
  mounted () {
    if (this.fixtureId !== null) {
      console.log('Fixtures.vue - mounted(): fixtureId Found In fixtureId comp prop', this.fixtureId)
      this.selectedFixture = this.fixtureId
      this.loadFixture(this.fixtureId)
    } else {
      console.log('Fixtures.vue - mounted(): fixtureId Not Found In fixtureId comp prop', this.fixtureId)
      this.selectedFixture = null
    }
  },
  updated () {
    this.$nextTick(function () {
      if (this.fixtureId !== null) {
        console.log('Fixtures.vue - updated(): fixtureId Found In fixtureId comp prop', this.fixtureId)
        this.selectedFixture = this.fixtureId
        this.loadFixture(this.fixtureId)
      } else {
        console.log('Fixtures.vue - updated(): fixtureId Not Found In fixtureId comp prop', this.fixtureId)
        this.selectedFixture = null
      }
    })
  }
}
</script>
