<template>
  <canvas id="main-canvas" :width="width" :height="height">

  </canvas>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop } from 'vue-property-decorator';


import CanvasUtil from '@utils/canvasUtil';
import { LaneTheme } from '@utils/types/themeTypes';
import { store } from '@store/index'
import { CanvasInfo } from '@store/editor/EditorGetters';

@Component({ name: 'back-canvas'})
export default class TimelineCanvas extends Vue {
  @Prop(Number) width!: number
  @Prop(Number) height!: number

  drawer: CanvasUtil | null = null

  get currentTheme(): LaneTheme {
    return store.state.editor.theme.currentTheme;
  }
  get canvasInfo(): CanvasInfo {
    return store.getters.editor.canvasInfo;
  }

  @Watch('canvasInfo')
  onCanvasInfo() {
    this.renderCanvas();
  }

  @Watch('currentTheme')
  onCurrentTheme() {
    this.renderCanvas();
  }

  renderCanvas() {
    if (this.drawer !== null) {
      this.drawer.drawEditor(this.canvasInfo, this.currentTheme);
    }
  }

  mounted() {
    this.drawer = CanvasUtil.getCanvasUtil(this.$el as HTMLCanvasElement);
    this.renderCanvas();
  }

  updated() {
    this.renderCanvas();
  }
}
</script>

<style lang="sass">
#main-canvas
  position: absolute

</style>
