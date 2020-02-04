<template>
  <div id="note-wrapper" tabindex="-1" :style="wrapperStyle"
    @mousedown.left.self.stop="mouseDown">
    <div v-for="(note, noteIndex) in noteManager.getAllNote()" :key="noteIndex" class="note">
    </div>
    <div id="preview-note" class="note" :style="previewNoteStyle"></div>
    <div v-show="dragZone.showDragZone" id="drag-zone" :style="dragZoneStyle">

    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop } from 'vue-property-decorator';

import { store } from '@store/index'
import { DragZoneState } from '@store/editor';
import { EditMode } from '@utils/types/scoreTypes';
import { NoteManager } from '@utils/noteUtil';

interface WH { width: string; height: string }
interface LBBox { left: string; bottom: string; width: string; height: string }

@Component
export default class NoteWrapper extends Vue {
  @Prop(Number) width!: number
  @Prop(Number) height!: number

  isDragging: boolean = false
  dragPosX: number = 0
  dragPosY: number = 0

  // --- getters ---
  get wrapperStyle(): WH {
    return {
      width: `${this.width}px`,
      height: `${this.height}px`,
    };
  }
  get dragZoneStyle(): LBBox {
    return {
      left: `${this.dragZone.dragRect[0][0]}px`,
      bottom: `${this.dragZone.dragRect[0][1]}px`,
      width: `${this.dragZone.dragRect[1][0]}px`,
      height: `${this.dragZone.dragRect[1][1]}px`,
    };
  }
  get dragZone(): DragZoneState { return store.state.editor.dragZone; }
  get editMode(): EditMode { return store.state.editor.editMode; }
  get noteManager(): NoteManager { return store.state.editor.score.noteManager; }
  get previewNoteStyle(): Partial<CSSStyleDeclaration> { return store.getters.editor.previewNoteStyle; }

  // --- methods ---
  mouseDown(e: MouseEvent) {
    this.isDragging = true;
    this.getPosition(e);
    store.commit.editor.dragStart({
      coord: [this.dragPosX, this.height - this.dragPosY],
      isExclusive: e.ctrlKey,
    });
  }

  mouseMove(e: MouseEvent) {
    this.getPosition(e);
    
    if (this.editMode === EditMode.WRITE_MODE) {
      e.preventDefault();
      // function은 한가지만 하기! add dragNote
      store.dispatch.editor.setPreviewNote([this.dragPosX, this.height - this.dragPosY]);
    } else if (this.isDragging) {
      e.preventDefault();
      store.commit.editor.dragMove([this.dragPosX, this.height - this.dragPosY]);
    }
  }

  mouseUp(e: MouseEvent) {
    if (this.isDragging) {
      e.preventDefault();
      this.getPosition(e);
      store.commit.editor.dragEnd([this.dragPosX, this.height - this.dragPosY]);
    }
    this.isDragging = false;
  }

  getPosition(e: MouseEvent) {
    const el = this.$el.parentElement;
    if (el !== null) {
      this.dragPosX = e.pageX + el.scrollLeft - el.offsetLeft;
      this.dragPosY = e.pageY + el.scrollTop - el.offsetTop;
    }
  }
  
  @Watch('editMode')
  onEditModeChange(newVal: EditMode) {
    if (newVal === EditMode.WRITE_MODE) {
      store.dispatch.editor.setPreviewNote([this.dragPosX, this.height - this.dragPosY]);
    }
  }

  // --- hooks ---
  mounted() {
    document.addEventListener('mousemove', this.mouseMove);
    document.addEventListener('mouseup', this.mouseUp);
  }

  beforeDestroy() {
    document.removeEventListener('mousemove', this.mouseMove);
    document.removeEventListener('mouseup', this.mouseUp);
  }
}

</script>

<style lang="sass">
#note-wrapper
  position: absolute
  top: 0
  left: 0
  overflow: hidden

  &:focus
    outline: none

.note
  position: absolute
  border: 1px solid green
  width: 25px
  height: 10px
  background: #c3d9ff
  -webkit-user-select: none
  -moz-user-select: none
  -ms-user-select: none
  user-select: none
  
  &:hover
    border-color: red
  
#drag-zone
  position: absolute
  border: 1px solid green

.note
  position: absolute
  
</style>
