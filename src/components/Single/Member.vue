<template>
  <q-card square class="bg-brand-4 border-dark-green-box shadow-20">
    <q-card-section class="q-pa-none q-ma-none">
      <q-item class="fit">
        <q-item-section avatar>
          <q-avatar square :size="$q.platform.is.mobile ? '100px' : '75px'" class="bg-brand-3 shadow-3">
            <q-icon
              :size="$q.platform.is.mobile ? '90px' : '70px'"
              name="person"
              color="brand-1"
            />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-grey-3 text-weight-regular text-h4">{{ member.alias }}</q-item-label>
          <q-item-label class="text-grey-3 text-weight-regular text-h6">{{ member.first_name }} {{ member.last_name }}</q-item-label>
        </q-item-section>
<!--         <q-item-section side center class="desktop-only">
          <q-item-label class="text-grey-3 text-weight-regular text-h8">Win Ratio: NONE</q-item-label>
          <q-item-label class="text-grey-3 text-weight-regular text-h8">Rank: NONE</q-item-label>
        </q-item-section> -->
      </q-item>
    </q-card-section>
  </q-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Member',
  computed: {
    ...mapGetters('member', ['member'])
  }
}
</script>
