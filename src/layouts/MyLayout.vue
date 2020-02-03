<template>
  <q-layout view="hHh lpR fFr">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn
          aria-label="Option"
          dense
          flat
          icon="settings"
          round
        />

        <q-toolbar-title>
          SARISSA - Rhythmin Editor
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>

        <q-btn
          aria-label="Menu"
          dense
          flat
          icon="menu"
          round
          class="q-ml-xs"
          @click="store.toggleRightDrawer()"
        />
      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab to="/page1" label="Page One" />
        <q-route-tab to="/page2" label="Page Two" />
        <q-route-tab to="/page3" label="Page Three" />
      </q-tabs>
    </q-header>

    <q-drawer
      v-model="rightDrawerOpen"
      :show-if-above="false"
      side="right"
      overlay 
      behavior="desktop"
      elevated
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item-label header>Essential Links</q-item-label>
        <q-item clickable tag="a" target="_blank" href="https://quasar.dev">
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Docs</q-item-label>
            <q-item-label caption>quasar.dev</q-item-label>
          </q-item-section>
        </q-item>
        
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer bordered class="bg-grey-8 text-white">
      <q-toolbar>
        <q-icon :name="editModeIcon"/>
        <q-space></q-space>
        &copy; 2020 KINETC
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script lang="ts">
// Vue
import Vue from 'vue';
import Component from 'vue-class-component';

// Store modules
import { getModule } from 'vuex-module-decorators';
import LayoutStoreModule from './LayoutStoreModule';

@Component
export default class MyLayout extends Vue {
  store = getModule(LayoutStoreModule);

  get rightDrawerOpen() {
    return this.store.rightDrawerOpen;
  }

  set rightDrawerOpen(value: boolean) {
    this.store.setRightDrawerOpen(value);
  }

  get editModeIcon(): string {
    return 'edit';
  }
}
</script>
