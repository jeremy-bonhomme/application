import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { remove } from 'lodash';

import { FilterP } from 'app/cocktails/pipes/filter';
import { CocktailS } from 'app/cocktails/service';
import { Cocktail } from 'app/cocktails/store/model';

@Component({
  providers: [FilterP],
  selector: 'app-cocktails-list',
  templateUrl: './list.html',
})
export class CocktailsListC implements OnInit {
  public cocktails: Cocktail[];
  public isActive: number;
  public remove: string = '';
  public search: string = '';

  public constructor( protected _cocktailS: CocktailS, protected http: Http ) { }

  public ngOnInit(): void {
    this._cocktailS.cocktails.subscribe( ( cocktails: Cocktail[] ) => {
      this.cocktails = cocktails;
    } );
  }

  public removeCocktail( cocktail: Cocktail, i: number ): void {
    this.cocktails[ i ] = { desc: '', img: '', ingredients: [], name: '' };
    this._cocktailS.updateCocktail( this.cocktails[ i ] );
    this.remove = `Le cocktail ${ cocktail.name } a bien été supprimé`;
  }

  public removeMessage(): void {
    this.remove = '';
  }
}
