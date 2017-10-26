import { ModuleWithProviders } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { CocktailsContainerC } from 'app/cocktails/component/container/container';
import { CocktailsC } from 'app/cocktails/component/default/default';
import { CocktailsDetailsC } from 'app/cocktails/component/details/details';
import { CocktailsEditC } from 'app/cocktails/component/edit/edit';
import { AppC } from 'app/main/component/app';
import { PanierC } from 'app/panier/component/panier/panier';

const APP_ROUTES: Route [] = [
  { path: '', pathMatch: 'full', redirectTo: 'cocktails' },
  { component: PanierC, path: 'panier' },
  { path: 'cocktails', component: CocktailsContainerC, children: [
    { path: '', component: CocktailsC },
    { path: 'nouveau-cocktail', component: CocktailsEditC },
    { path: ':i', component: CocktailsDetailsC },
    { path: ':i/editer-le-cocktail', component: CocktailsEditC },
  ] },
  { path: '**', redirectTo: 'cocktails' },
];

export const appRouting: ModuleWithProviders = RouterModule.forRoot( APP_ROUTES );
