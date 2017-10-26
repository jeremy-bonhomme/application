import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';

import { CocktailsMD } from 'app/cocktails/module';
import { HeaderMD } from 'app/header/module';
import { PanierMD } from 'app/panier/module';
import { appRouting } from 'app/root/routing';
import { UiMD } from 'app/ui/module';
import { AppC } from './component/app';

@NgModule( {
  bootstrap: [ AppC ],
  declarations: [ AppC ],
  imports: [
    appRouting,
    BrowserModule,
    CocktailsMD,
    FormsModule,
    HeaderMD,
    HttpModule,
    PanierMD,
    ReactiveFormsModule,
    RouterModule,
    UiMD,
  ],
  providers: [],
})
export class AppMD {}
