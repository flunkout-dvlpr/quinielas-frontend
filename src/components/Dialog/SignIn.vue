<template>
  <q-dialog persistent ref="dialog">
  <q-card
    style="width: 25rem;"
    class="shadow-20 bg-brand-6"
  >
    <q-card-section class="q-pa-none q-ma-none brand-green-gradient">
      <div class="row justify-center items-center content-center">
        <div class="col-md-12 col-xs-12 q-pa-sm">
          <div class="text-center text-grey-3 text-h4 text-weight-light">Welcome To Quinielas!</div>
        </div>
      </div>
    </q-card-section>
    <!-- Pool -->
    <q-form @submit="onSubmit">
    <q-card-section class="q-pa-none q-ma-none">
      <div class="row justify-center items-center content-center q-pt-lg">
        <div class="col-10">
          <div class="text-weight-regualr text-center text-grey-3 text-h8">
            Whether you're back for more or are just now joining, enter your phone number to continue.
          </div>
        </div>
      </div>
      <div class="row justify-center items-center content-center q-pt-md">
        <div class="col-10">
          <div class="">
            <q-input
              dark
              square
              outlined
              type="tel"
              mask="(###) ### - ####"
              unmasked-value
              placeholder="(###) ### - ####"
              color="brand-1"
              v-model="phone"
              label="Phone Number"
              :rules="[ val => val && val.length > 0 || 'Need that phone number 🤓!']"
            />
          </div>
        </div>
      </div>
    </q-card-section>
    <q-card-section class="q-pa-none q-ma-none">
      <div class="row justify-center items-center content-center q-pt-sm q-pb-md">
        <div class="col-4">
          <q-btn
            flat
            no-caps
            :ripple="false"
            class="fit bg-brand-2"
            text-color="grey-3"
            label="Let Me In!"
            type="submit"
            :loading="loading"
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
  name: 'SignIn',
  data () {
    return {
      loading: false,
      phone: null
    }
  },
  methods: {
    ...mapActions('member', ['loadMember']),
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
      this.loading = true
      this.loadMember(this.phone).then(() => {
        this.loading = false
        this.hide()
      })
    }
  }
}
</script>

<style>
.q-dialog__backdrop {
  background: rgb(0 0 0 / 80%);
}
</style>
