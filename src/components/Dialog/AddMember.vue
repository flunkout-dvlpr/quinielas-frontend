<template>
  <q-dialog ref="dialog">
  <q-card
    square
    style="width: 25rem;"
    class="shadow-20 bg-brand-6"
  >
    <q-card-section class="q-pa-xs q-mb-md brand-green-gradient">
      <div class="row justify-center items-center content-center">
        <div class="col-md-12 col-xs-12 q-pa-sm">
          <div class="text-center text-grey-3 text-h4 text-weight-regular">Add Member</div>
        </div>
      </div>
    </q-card-section>
    <!-- Pool -->
    <q-form @submit="onSubmit">
    <q-card-section class="q-pa-sm">
      <div class="row justify-center items-center content-center">
        <div class="col-12 q-px-sm q-pt-none q-pb-xs">
          <div class="">
            <q-input
              dark
              square
              outlined
              color="brand-1"
              v-model="phone"
              label="Member's Phone"
              :rules="[ val => val && val.length > 0 || 'Phone Number Required']"
            />
          </div>
        </div>
      </div>
    </q-card-section>
    <q-card-section class="q-pa-none q-ma-none bg-brand-6">
      <div class="row justify-center items-center content-center">
        <div class="col-4 q-pb-md">
          <q-btn
            square
            no-caps
            unelevated
            :ripple="false"
            class="fit"
            text-color="grey-3"
            color="brand-2"
            label="Submit"
            type="submit"
          />
        </div>
      </div>
    </q-card-section>
    </q-form>
  </q-card>
  </q-dialog>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'AddMember',
  props: {
    pool: Object
  },
  data () {
    return {
      phone: null
    }
  },
  methods: {
    ...mapActions('pools', ['addPoolMember']),
    show () {
      this.$refs.dialog.show()
    },
    hide () {
      this.$refs.dialog.hide()
    },
    onCancel () {
      this.hide()
    },
    onSubmit () {
      this.addPoolMember({ pool_id: this.pool.id, phone: this.phone })
      this.hide()
    }
  }
}
</script>
