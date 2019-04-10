import { QVueGlobals } from 'quasar';

declare module 'quasar' {
  interface QVueGlobals {
    version: string,
    lang: object,
    iconSet: object,
    cordova: object,
    electron: object
  }
}