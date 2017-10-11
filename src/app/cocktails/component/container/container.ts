import { Component, OnInit } from '@angular/core';

import { CocktailS } from 'app/cocktails/service';

@Component( {
  providers: [CocktailS],
  selector: 'app-cocktails-container',
  templateUrl: './container.html',
} )
export class CocktailsContainerC implements OnInit {

  public constructor() { }

  public ngOnInit(): void { }

}
