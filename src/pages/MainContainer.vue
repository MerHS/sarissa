<template>
  <v-container id="main-container" fluid fill-height>
      <editor-layout></editor-layout>
  </v-container>
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
