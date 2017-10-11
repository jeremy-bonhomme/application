import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { UiIconDI } from 'app/ui/directives/icon';

@NgModule( {
  declarations: [
    UiIconDI,
  ],
  exports: [
    UiIconDI,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
} )
export class UiMD {
  public static forRoot(): ModuleWithProviders {
    return {
        ngModule: UiMD,
        providers: [],
    };
  }
}
