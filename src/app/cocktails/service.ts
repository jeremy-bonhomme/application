import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { Cocktail } from 'app/cocktails/store/model';
import { Ingredient } from 'app/panier/store/model';

@Injectable()
export class CocktailS {
  public cocktails: BehaviorSubject<Cocktail[]> = new BehaviorSubject( null );

  public constructor( protected http: Http ) {
    this.cocktailsInit();
  }

  public addCocktail( cocktail: Cocktail ): void {
    const cocktails: Cocktail[] = this.cocktails.value.slice();
    cocktails.push( new Cocktail ( cocktail.desc, cocktail.img, cocktail.ingredients
             .map( ( ingredient ) => new Ingredient ( ingredient.nom, ingredient.quantity ) ), cocktail.name ) );
    this.cocktails.next( cocktails );
    this.save();
  }

  public cocktailsInit(): void {
    this.http.get( 'https://cocktails-51e1e.firebaseio.com/cocktails.json' ).map( ( res ) => res.json() )
    .subscribe( ( cocktails: Cocktail[] ) => {
      this.cocktails.next( cocktails );
    } );
  }

  public editCocktail( editCocktail: Cocktail ): void {
    const cocktails: Cocktail[] = this.cocktails.value.slice();
    const i: number = cocktails.map( ( c ) => c.name ).indexOf( editCocktail.name );
    cocktails[ i ] = editCocktail;
    this.cocktails.next( cocktails );
    this.save();
  }

  public getCocktail( i: number ): Observable<Cocktail> {
    return this.cocktails.filter( ( cocktails ) => cocktails !== null ).map( ( cocktails ) => cocktails[ i ] );
  }

  public updateCocktail( updateCocktail: Cocktail ): void {
    const cocktails: Cocktail[] = this.cocktails.value.slice();
    const i: number = cocktails.map( ( c ) => c.name ).indexOf( updateCocktail.name );
    cocktails[ i ] = updateCocktail;
    this.cocktails.next( cocktails );
    this.save();
  }

  public remove(): void {
    this.http.put( 'https://cocktails-51e1e.firebaseio.com/cocktails.json', this.cocktails.value )
    .subscribe( ( res ) => console.log( res ) ) ;
  }

  public save(): void {
    this.http.put( 'https://cocktails-51e1e.firebaseio.com/cocktails.json', this.cocktails.value )
    .subscribe( ( res ) => console.log( res ) ) ;
  }
}
