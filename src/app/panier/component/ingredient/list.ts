import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { PanierS } from 'app/panier/service';
import { Ingredient } from '../../store/model';

@Component( {
  selector: 'app-ingredient-list',
  templateUrl: 'list.html',
})
export class IngredientListC implements OnInit, OnDestroy {
  public ingredients: Ingredient[] = [];
  protected subscription: Subscription;

  public constructor( protected _panierS: PanierS ) { }

  public ngOnInit(): void {
    this.subscription = this._panierS.panier.subscribe( ( ingredients: Ingredient[] ) => {
      this.ingredients = ingredients;
    });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
