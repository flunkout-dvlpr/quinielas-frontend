<template>
  <q-card
    square
    class="shadow-20 bg-brand-4"
  >
    <q-card-section class="q-pa-none q-ma-none brand-green-gradient">
      <div
        class="row justify-start items-center content-center"
        style="height: 60px;"
      >
        <div class="q-mx-sm">
          <q-avatar square class="bg-brand-3" font-size="40px" icon="people" text-color="grey-3"/>
        </div>
        <div class="q-mx-sm">
          <div class="text-grey-3 text-h4 text-weight-regular">Pools</div>
        </div>
      </div>
    </q-card-section>
    <q-card-section class="q-pa-none q-ma-none">
      <div
        class="row justify-start items-center content-center overflow-auto hide-scrollbar no-wrap q-py-sm q-px-none"
        style="height: 300px;"
      >
        <div class="col-md-4 col-xs-7 q-mx-sm q-my-xs">
          <div
            class="col border-dark-green-box-dash"
            style="height: 275px;"
          >
            <q-btn
              flat
              no-caps
              class="fit bg-brand-5"
              @click="showAddPool()"
            >
              <q-icon size=20px name="add" color="grey-4"/>
              <div class="text-h6 text-center text-weight-regular text-grey-4">Pool</div>
            </q-btn>
          </div>
        </div>

        <div
          class="col-md-4 col-xs-7 q-mx-sm q-my-xs"
          v-for="pool in pools"
          :key="pool.id"
          @click="loadPool(pool.id)"
        >
          <Pool :pool="pool" :idx="pool.id" :selectedPool="selectedPool" />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { mapGetters } from 'vuex'
import AddPool from 'components/Dialog/AddPool'
import Pool from 'components/Single/Pool'
export default {
  name: 'Pools',
  components: { Pool },
  data () {
    return {
      loading: false,
      selectedPool: null
    }
  },
  computed: {
    ...mapGetters('pools', ['pools']),
    poolId () {
      if (this.$route.params && this.$route.params.poolId !== null && !isNaN(this.$route.params.poolId)) {
        console.log('Pools.vue - poolId(): poolId Found In Route', this.$route.params.poolId)
        return parseInt(this.$route.params.poolId)
      } else {
        console.log('Pools.vue - poolId(): poolId Not Found In Route', this.$route.params.poolId)
        return null
      }
    }
  },
  methods: {
    loadPool (idx) {
      this.selectedPool = idx
      if (idx !== this.poolId) {
        console.log('Pools.vue - loadPool(): Set poolId route param to idx', idx)
        this.$router.push({ name: 'Home', params: { poolId: idx } })
      }
    },
    showAddPool () {
      this.selectedPool = null
      if (this.poolId !== null) {
        console.log('Pools.vue - showAddPool(): Set poolId route param to null')
        this.$router.push({ name: 'Home', params: { poolId: null } })
      }
      this.$q.dialog({
        component: AddPool,
        parent: this
      })
    }
  },
  mounted () {
    if (this.poolId !== null) {
      console.log('Pools.vue - mounted(): poolId Found In poolId comp prop', this.poolId)
      this.selectedPool = this.poolId
      this.loadPool(this.poolId)
    } else {
      console.log('Pools.vue - mounted(): poolId Not Found In poolId comp prop', this.poolId)
      this.selectedPool = null
    }
  }
}
</script>
