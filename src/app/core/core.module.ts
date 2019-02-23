import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { throwIfAlreadyLoaded } from './helpers';
import { AppReducer, MODULES_EFFECTS, MODULES_PROVIDERS } from './modules';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    StoreModule.forRoot(AppReducer),
    EffectsModule.forRoot(MODULES_EFFECTS),
  ]
})
export class CoreModule {
  static forRoot(configuredProviders: Array<any>): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        ...MODULES_PROVIDERS,
        ...configuredProviders
      ],
    };
  }

  constructor(
    @Optional() @SkipSelf() parentModule: CoreModule
  ) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
