import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { CocktailS } from 'app/cocktails/service';
import { Cocktail } from 'app/cocktails/store/model';
import { PanierS } from 'app/panier/service';
import { Ingredient } from 'app/panier/store/model';

@Component({
  selector: 'app-cocktails-details',
  templateUrl: './details.html',
})
export class CocktailsDetailsC implements OnInit {
  public alert: string = '';
  public cocktail: Cocktail;
  public i: number;
  public message: number = 0;

  public constructor( protected _activatedRoute: ActivatedRoute, protected _cocktailS: CocktailS, protected _panierS: PanierS ) { }

  public ngOnInit(): void {
    this._activatedRoute.params.subscribe( ( params: Params ) => {
      params.i ? this.i = params.i : this.i = 0;
      this._cocktailS.getCocktail( this.i ).subscribe( ( cocktail: Cocktail ) => {
        this.cocktail = cocktail;
      } );
    } );
  }

  public addPanier( ingredients: Ingredient[] ): void {
    if ( this.message < 5 ) {
      this._panierS.addIngredients( ingredients );
      this.message++;
    } else {
      this.alert = 'Vous ne pouvez pas ajouter davantage de cocktail';
    }
  }

  public getUrl(): string[] {
    return [ '/cocktails', this.i + '', 'editer-le-cocktail' ];
  }
}
