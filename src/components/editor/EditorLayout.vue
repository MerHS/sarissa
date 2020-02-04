<template>
  <q-page @scroll.passive="onScroll">
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

      <!-- place QPageScroller at end of page -->
    <q-page-scroller position="top-right" :scroll-offset="150" :offset="[18, 18]">
      <q-btn fab icon="keyboard_arrow_down" color="accent" />
    </q-page-scroller>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import TimelineCanvas from './TimelineCanvas.vue';
import NoteWrapper from './NoteWrapper.vue';

import { store } from '@store/index';
import { LaneStyles, GridColors } from '@utils/types/themeTypes';

@Component({
  components: {
    TimelineCanvas, NoteWrapper
  }
})
export default class EditorLayout extends Vue {
  offSetTop = 0;

  get projectId(): string { return this.$route.params.projectId; }

  get widthPixel(): number { return store.getters.editor.widthPixel; }
  get heightPixel(): number { return store.getters.editor.heightPixel; }
  get laneXList(): number[] { return store.getters.editor.laneXList; }
  get currLaneStyles(): LaneStyles { return store.getters.editor.theme.currLaneStyles; }
  get currGridColors(): GridColors { return store.getters.editor.theme.currGridColors; }

  onScroll(e: WheelEvent) {
    this.offSetTop = (e.target as Element).scrollTop;
  }
}

</script>

<style lang="sass">
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
  overflow: hidden
  white-space: nowrap
  text-overflow: ellipsis
  
</style>
