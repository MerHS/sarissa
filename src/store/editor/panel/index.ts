/**
 * editor/panel - grid settings of default panel
 */

import { Module, MutationTree } from 'vuex';

import { RootState } from 'src/store';

export interface PanelState {
  panelCount: number;
  mainGrid: number;
  subGrid: number;
  snapToGrid: boolean;
  disableVerticalMove: boolean;
  verticalZoom: number;
  horizontalZoom: number;
  defaultHeight: number;
}

const panelState: PanelState = {
  panelCount: 5,
  mainGrid: 4,
  subGrid: 16,
  snapToGrid: true,
  disableVerticalMove: false,
  verticalZoom: 1,
  horizontalZoom: 1,
  defaultHeight: 200,
};

// export const PANEL_DIRTY_PROPS: Array<keyof PanelState> = [
//   'panelCount', 'mainGrid', 'subGrid', 'verticalZoom', 'horizontalZoom', 'defaultHeight',
// ];

const mutations: MutationTree<PanelState> = {
  assignPanelState(state: PanelState, payload: Partial<PanelState>) {
    Object.assign(state, payload);
  },
};

export const panel: Module<PanelState, RootState> = {
  state: panelState,
  mutations,
};
