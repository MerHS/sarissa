<template>
  <q-page-container id="main-container" class="flex flex-center">
      <editor-layout></editor-layout>
  </q-page-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import EditorLayout from '../layouts/editor/EditorLayout.vue';

@Component({
  components: { EditorLayout },
})
export default class MainContainer extends Vue {
}
</script>

<style lang="stylus">
#main-container
  align-items baseline
  margin 0
  padding 0

</style>
