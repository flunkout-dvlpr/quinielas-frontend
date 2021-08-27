<template>
  <q-dialog persistent ref="dialog">
  <q-card
    square
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

    <q-card-section class="q-pa-none q-ma-none">
      <div class="row justify-center items-center content-center q-my-md">
        <div class="col-10">
          <div class="q-pa-xs text-weight-regualr text-center text-grey-3 text-h8">
            Whether you're back for more or are just now joining, enter your phone number to continue.
          </div>
        </div>
      </div>
    </q-card-section>
    <q-form v-if="!otpSent" @submit="sendOTP">
      <q-card-section class="q-pa-none q-ma-none">
      <div class="row justify-center items-center content-center q-mb-md">
        <div class="col-10">
          <div>
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
              :rules="[ val => val && val.length > 0 || 'Enter phone number 🤓!']"
            />
          </div>
        </div>
      </div>
      <div class="row justify-center items-center content-center q-mb-md">
        <div class="col-4">
          <q-btn
            flat
            no-caps
            :ripple="false"
            class="fit bg-brand-2"
            text-color="grey-3"
            label="Send Code"
            type="submit"
            :loading="loading"
          >
            <q-badge v-if="attempts" :label="attempts" color="red-10" floating/>
          </q-btn>
        </div>
      </div>
      </q-card-section>
    </q-form>
    <q-form v-if="otpSent" @submit="signIn">
      <q-card-section class="q-pa-none q-ma-none">
      <div class="row justify-center items-center content-center q-mb-md">
        <div class="col-10">
          <div>
            <q-input
              dark
              square
              outlined
              type="tel"
              mask="# - # - # - #"
              unmasked-value
              placeholder="# - # - # - #"
              color="brand-1"
              v-model="pin"
              label="Verification Pin"
              :rules="[ val => val && val.length > 0 || 'Need that pin 🤓!']"
            />
          </div>
        </div>
      </div>
      <div class="row justify-center items-center content-center q-mb-md">
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
          >
            <q-badge v-if="attempts" :label="attempts" color="red-10" floating/>
          </q-btn>
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
      otpSent: false,
      phone: null,
      pin: null,
      otp: null,
      attempts: 0
    }
  },
  methods: {
    ...mapActions('member', ['signInOTP', 'loadMember']),
    show () {
      this.$refs.dialog.show()
    },
    hide () {
      this.$refs.dialog.hide()
    },
    onCancel () {
      this.hide()
    },
    sendOTP () {
      this.loading = true
      this.signInOTP(this.phone).then((response) => {
        this.loading = false
        this.otp = response.otp
        this.otpSent = true
      })
    },
    signIn () {
      this.loading = true
      if (this.otpSent && this.otp) {
        if (parseInt(this.pin) === parseInt(this.otp)) {
          this.loadMember(this.phone).then(() => {
            this.loading = false
            this.attempts = 0
            this.otp = false
            this.otpSent = false
            this.hide()
          })
        } else if (this.attempts < 2) {
          this.loading = false
          this.attempts = this.attempts + 1
          this.pin = null
        } else {
          this.loading = false
          this.attempts = 0
          this.otp = false
          this.otpSent = false
          this.pin = null
          this.phone = null
          this.$q.notify({
            position: 'top',
            message: 'Number of attempts exceeded please try sending another verification code',
            color: 'orange-5',
            textColor: 'grey-9',
            icon: 'warning'
          })
        }
      }
    }
  }
}
</script>

<style>
.q-dialog__backdrop {
  background: rgb(0 0 0 / 80%);
}
</style>
