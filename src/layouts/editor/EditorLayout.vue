<template>
  <q-page id="editor-workspace" v-scroll:#editor-workspace="onScroll">
    <timeline-canvas :width="widthPixel" :height="heightPixel"/>
    <div id="lane-caption-container" :style="{ color: currGridColors.captionColor }">
      <div v-for="(stylePart, index) in currLaneStyles"
        :key="index" class="lane-caption caption" :style="{
          left: `${ laneXList[index] + 2 }px`,
          width: `${ (index < laneXList.length) ?
            (laneXList[index + 1] - laneXList[index]) : 100 }px`
        }">
        {{ stylePart.caption }}
      </div>
    </div>
    <!--<timeline-svg/>-->
    <note-wrapper :width="widthPixel" :height="heightPixel"/>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { mapGetters } from 'vuex';

import NoteWrapper from './NoteWrapper.vue';
import TimelineCanvas from './TimelineCanvas.vue';
import TimelineSvg from './TimelineSvg.vue';

// @Component
// export class EditorLayout extends Vue {
//   @editor.Getter('widthPixel') widthPixel!: number;
// }

export default Vue.extend({
  data: () => ({
    offsetTop: 0,
  }),
  components: {
    TimelineCanvas,
    NoteWrapper,
    TimelineSvg,
  },
  computed: {
    // ...mapState('editor/panel', ['horizontalZoom']),
    ...mapGetters('editor', [
      'widthPixel', 'heightPixel', 'currLaneStyles', 'laneXList', 'currGridColors',
    ]),
  },
  methods: {
    onScroll(e: WheelEvent) {
      this.offsetTop = (e.target as Element).scrollTop;
    },
  },
});
</script>

<style lang="stylus">
#editor-workspace
  position: relative
  overflow: auto
  height: 100%
  width: 100%
  background-color: black

#lane-caption-container
  position: sticky
  top: 0

.lane-caption
  position: absolute
  top: 0
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis

</style>
