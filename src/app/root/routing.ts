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
  { children: [
    { component: CocktailsEditC, path: 'nouveau-cocktail' },
    { component: CocktailsDetailsC, path: ':i' },
    { component: CocktailsEditC, path: ':i/editer-le-cocktail' },
    { component: CocktailsC, path: '' },
  ], component: CocktailsContainerC, path: 'cocktails' },
  { path: '**', redirectTo: 'cocktails' },
];

export const appRouting: ModuleWithProviders = RouterModule.forRoot( APP_ROUTES );
