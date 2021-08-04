import Vue from 'vue'
import Vuex from 'vuex'

import member from './member'
import pools from './quinielas-data/pools'
import poolRounds from './quinielas-data/pool-rounds'
import predictions from './quinielas-data/predictions'
import leagues from './soccer-data/leagues'
import rounds from './soccer-data/rounds'
import fixtures from './soccer-data/fixtures'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      fixtures,
      leagues,
      rounds,
      member,
      predictions,
      pools,
      poolRounds
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING
  })

  return Store
}
