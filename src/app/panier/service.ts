import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Ingredient } from 'app/panier/store/model';

@Injectable()
export class PanierS {
  public panier: BehaviorSubject<Ingredient[]> = new BehaviorSubject( undefined );

  public addIngredients( ingredients: Ingredient[] ): void {
    const currentValue: Ingredient[] = this.panier.value;
    if ( currentValue && currentValue.length ) {
      this.panier.next( currentValue.concat( ingredients ) );
    } else {
      this.panier.next( ingredients );
    }
  }
}
