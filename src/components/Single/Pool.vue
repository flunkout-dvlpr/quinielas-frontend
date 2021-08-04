<template>
  <q-card
    square
    style="height: 275px"
    :class="idx === selectedPool ? 'bg-brand-5 border-green-box shadow-8' : 'bg-brand-5 border-dark-green-box'"
  >
    <q-card-section class="q-pa-none q-ma-none">
      <div class="row justify-center items-center content-center">
        <div class="col-12 q-px-sm q-pt-xs q-pb-none">
          <div class="text-h6 text-grey-3">
            {{ pool.name }}
          </div>
        </div>
        <div class="col-12 q-px-sm q-pt-none q-pb-none">
          <div class="text-caption text-grey-3">
            Number of Members: {{ pool.members.length }}
          </div>
        </div>
      </div>
    </q-card-section>
    <q-card-section class="q-pa-none q-mx-none q-mt-sm q-mb-none" style="height: 200px;">
      <div class="row justify-center items-center content-center q-mx-sm bg-brand-4">
        <div
          class="col q-pa-none q-ma-none overflow-auto border-dark-green-box-thin"
          style="max-height: 180px;"
        >
          <div
            v-for="(member, idx) in pool.members"
            :key="idx"
            :class="idx % 2 == 0 ? 'bg-brand-6' : 'bg-brand-4'"
          >
            <div class="row justify-between items-center content-center">
              <div class="col-2 text-center text-caption text-grey-4 bg-dark">
                {{idx+1}}.
              </div>
              <div v-if="member.alias" class="col-10 text-left text-caption text-grey-4 q-px-xs">
                {{ member.alias }}
              </div>
              <div v-else class="col-10 text-left text-caption text-grey-4 q-px-xs ellipsis">
                PND {{ member.phone | phoneFormat }}
              </div>
            </div>
          </div>
          <div v-if="pool.is_owner" class="bg-brand-4">
            <div :class="`row justify-between items-center content-center ${pool.members.length ? 'border-dark-green-box-dash-thin' : ''}`">
              <div class="col-12">
                <q-btn
                  flat
                  dense
                  no-caps
                  style="height: auto;"
                  class="fit bg-brand-4"
                  @click="showAddMember"
                  :disable="idx !== selectedPool"
                >
                  <q-icon size=15px name="add" color="grey-4"/>
                  <div class="text-caption text-center text-weight-regular text-grey-4">Member</div>
                </q-btn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import AddMember from 'components/Dialog/AddMember'
export default {
  name: 'Pool',
  props: {
    idx: Number,
    selectedPool: Number,
    pool: Object
  },
  filters: {
    phoneFormat: function (phone) {
      if (phone) {
        return '(' + phone.slice(0, 3) + ') ' + phone.slice(3, 6) + '-' + phone.slice(6)
      } else {
        return ''
      }
    }
  },
  methods: {
    showAddMember () {
      this.$q.dialog({
        component: AddMember,
        parent: this,
        pool: this.pool
      })
    }
  }
}
</script>
