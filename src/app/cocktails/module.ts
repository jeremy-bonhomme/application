import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { FilterP } from 'app/cocktails/pipes/filter';
import { UiMD } from 'app/ui/module';
import { CocktailsContainerC } from './component/container/container';
import { CocktailsC } from './component/default/default';
import { CocktailsDetailsC } from './component/details/details';
import { CocktailsEditC } from './component/edit/edit';
import { CocktailsListC } from './component/list/list';

@NgModule( {
  declarations: [
    CocktailsC,
    CocktailsContainerC,
    CocktailsDetailsC,
    CocktailsEditC,
    CocktailsListC,
    FilterP,
  ],
  exports: [
    CocktailsC,
    CocktailsContainerC,
    CocktailsDetailsC,
    CocktailsEditC,
    CocktailsListC,
    FilterP,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    UiMD,
  ],
})
export class CocktailsMD { }
