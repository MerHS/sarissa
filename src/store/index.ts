import Vue from 'vue';
import Vuex from 'vuex';
import { remote } from 'electron';
import { createDirectStore } from 'direct-vuex';

import { createIpcVuexListenerPlugin } from '../ipc/ipcVuexPlugin';
import editor from './editor'

Vue.use(Vuex);

const {
  store,
  rootActionContext,
  moduleActionContext,
  rootGetterContext,
  moduleGetterContext
} = createDirectStore({
  namespaced: true,
  state: {
    version: remote.app.getVersion()
  },
  modules: {
    editor
  },
  plugins: [createIpcVuexListenerPlugin()],
  strict: process.env.DEV === 'true',
})

export default store.original;

// The following exports will be used to enable types in the
// implementation of actions and getters.
export {
  store,
  rootActionContext,
  moduleActionContext,
  rootGetterContext,
  moduleGetterContext
}

// The following lines enable types in the injected store '$store'.
export type AppStore = typeof store
declare module 'vuex' {
  interface Store<S> {
    direct: AppStore
  }
}

