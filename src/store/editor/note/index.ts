/**
 * editor/note - default / custom note settings
 * This state should be able to import and export.
 */
import { Module } from 'vuex';

import { colorStr, cyan, green, red } from 'utils/themeConst';
import { ColorString } from 'utils/types/themeTypes';
import { RootState } from 'src/store';

export interface NoteState {
  noteHeight: number;
  hiddenNoteOpacity: number;
  borderColor: ColorString;
  borderColorOnMouseOver: ColorString;
  borderColorOnSelection: ColorString;
  borderColorOnMouseOverLN: ColorString;
}

const state: NoteState = {
  noteHeight: 10,
  hiddenNoteOpacity: 0.5,
  borderColor: colorStr(128, 128, 128),
  borderColorOnMouseOver: green,
  borderColorOnSelection: red,
  borderColorOnMouseOverLN: cyan,
};

export const note: Module<NoteState, RootState> = {
  state,
};
