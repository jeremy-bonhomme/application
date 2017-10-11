import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { PanierS } from 'app/panier/service';
import { IngredientListC } from './component/ingredient/list';
import { PanierC } from './component/panier/panier';

@NgModule( {
  declarations: [
    IngredientListC,
    PanierC,
  ],
  exports: [
    IngredientListC,
    PanierC,
  ],
  imports: [
    CommonModule,
  ],
  providers: [PanierS],
})
export class PanierMD { }
