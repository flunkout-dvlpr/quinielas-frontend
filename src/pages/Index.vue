<template>
  <q-page class="flex-start">
    <div class="row justify-center items-start content-center q-my-sm">
      <div class="col-md-3 col-xs-11">
        <router-view class="q-mt-sm q-mx-sm"  name="Member" />
      </div>
    </div>
    <div class="row justify-center items-start content-center q-my-sm">
      <div class="col-md-5 col-xs-11">
        <router-view class="q-mt-sm q-mx-sm" name="Pools" />
      </div>
      <div class="col-md-5 col-xs-11">
        <router-view class="q-mt-sm q-mx-sm" name="Rounds" />
      </div>
    </div>
    <div class="row justify-center items-start content-center q-my-sm">
      <div class="col-md-10 col-xs-11">
        <router-view class="q-mt-sm q-mx-sm" name="Fixtures" />
      </div>
    </div>

    <q-inner-loading
      :showing="loading"
    >
      <q-spinner-bars
        size="5rem"
        color="brand-4"
      />
    </q-inner-loading>
  </q-page>
</template>

<script>
import SignIn from 'components/Dialog/SignIn'
export default {
  name: 'Index',
  data () {
    return {
      loading: false
    }
  },
  mounted () {
    this.$q.dialog({
      component: SignIn,
      parent: this
    })
    // this.$q.dialog({
    //   title: 'Welcome, Sign-In or Sign-Up!',
    //   message: 'Whether you are new or coming back, just type in your phone number!',
    //   prompt: {
    //     model: '',
    //     attrs: {
    //       dark: true,
    //       mask: '(###) ### - ####',
    //       placeholder: '(###) ### - ####'
    //     },
    //     outlined: true,
    //     label: 'Phone Number',
    //     isValid: val => val.length === 10, // << here is the magic
    //     type: 'tel' // optional
    //   },
    //   cancel: false,
    //   persistent: true
    // }).onOk(data => {
    //   // console.log('>>>> OK, received', data)
    // })
  }
}
</script>
