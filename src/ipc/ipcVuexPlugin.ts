/* eslint-disable @typescript-eslint/no-unused-vars */
import { Store } from 'vuex';
import { ipcRenderer, IpcRendererEvent } from 'electron';
import { EditMode } from '../utils/types/scoreTypes';

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface IPCListener { 
  channel: string;
  listener: (e: IpcRendererEvent) => void; 
}

export function createIpcVuexListenerPlugin() {
  return (store: Store<any>) => {
    const listenerList: IPCListener[] = [
      {
        channel: 'toSelectMode',
        listener: (e: IpcRendererEvent) => { store.commit('editor/changeMode', EditMode.SELECT_MODE); },
      },
      {
        channel: 'toWriteMode',
        listener: (e: IpcRendererEvent) => { store.commit('editor/changeMode', EditMode.WRITE_MODE); },
      },
    ];
    
    listenerList.forEach((ipcListener) => {
      ipcRenderer.on(ipcListener.channel, ipcListener.listener);
    });
  };
}
