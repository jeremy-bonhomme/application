import { Pipe, PipeTransform } from '@angular/core';

import { Cocktail } from 'app/cocktails/store/model';

@Pipe( {
  name: 'appFilter',
} )
export class FilterP implements PipeTransform {

  public transform( cocktail: Cocktail[], search: string, i: number ): Cocktail[] | undefined {
    if ( !search.length ) {
      return( cocktail );
    } else {
      return cocktail.filter( ( c ) => c.name.toLowerCase().includes( search.toLowerCase() ) );
    }
  }
}
