import { Component, Input } from '@angular/core';

import { CocktailS } from 'app/cocktails/service';

@Component( {
  providers: [CocktailS],
  selector: 'app-cocktails-container',
  templateUrl: './container.html',
} )
export class CocktailsContainerC { }
