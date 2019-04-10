import { ipcRenderer } from 'electron';
import { Store } from 'vuex';
import { RootState } from '../store';
import { EditMode } from '../utils/types/scoreTypes';

interface IPCListener {
  channel: string;
  listener: () => void;
}

export function createIpcVuexListenerPlugin() {
  return (store: Store<RootState>) => {
    const listenerList: IPCListener[] = [
      {
        channel: 'toSelectMode',
        listener: () => { store.commit('editor/changeMode', EditMode.SELECT_MODE); },
      },
      {
        channel: 'toWriteMode',
        listener: () => { store.commit('editor/changeMode', EditMode.WRITE_MODE); },
      },
    ];

    listenerList.forEach((ipcListener) => {
      ipcRenderer.on(ipcListener.channel, ipcListener.listener);
    });
  };
}
