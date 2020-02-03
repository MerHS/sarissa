import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';

@Module
export default class LayoutStoreModule extends VuexModule {
  public rightDrawerOpen = false;

  @Mutation
  public SET_RIGHT_DRAWER_OPEN(value: boolean) {
    this.rightDrawerOpen = value;
  }

  @Action
  public setRightDrawerOpen(value: boolean) {
    this.SET_RIGHT_DRAWER_OPEN(value);
  }

  @Action
  public toggleRightDrawer() {
    this.SET_RIGHT_DRAWER_OPEN(!this.rightDrawerOpen);
  }
}
