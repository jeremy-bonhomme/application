// import { Injectable } from '@angular/core';
// import { Http, RequestOptions } from '@angular/http';
// import { BehaviorSubject, Observable } from 'rxjs';

// import { Cocktail } from 'app/cocktails/store/model';
// import { Ingredient } from 'app/panier/store/model';

// @Injectable()
// export class CocktailS {

//   public cocktails: BehaviorSubject<Cocktail[]> = new BehaviorSubject( [
//     new Cocktail(
//       'Le mojito, prononcé [moˈxito] en espagnol, est un cocktail à base de rhum, de citron vert et de feuilles de menthe fraîche, né à Cuba dans les années 1910 et inspiré du mint julep.',
//       'http://static.750g.com/images/622-auto/b520523117d647dab6b842a36f4cc7f5/mojito-le-vrai.jpg',
//       [
//         new Ingredient( 'Feuilles de menthe', '6 à 8' ),
//         new Ingredient( 'Citron vert', '1/2' ),
//         new Ingredient( 'Glaçons', '10' ),
//         new Ingredient( 'Rhum blanc', '4 cl' ),
//         new Ingredient( 'Sirop de sucre de canne', '2 cl' ),
//         new Ingredient( 'Perrier', '3 cl' ),
//       ],
//       'Mojito',
//     ),
//     new Cocktail(
//       'La Margarita a été inventé par des Américains au Mexique. Dérivé du Daisy, le brandy a été remplacé par de la téquila.',
//       'http://cdn.liquor.com/wp-content/uploads/2016/11/16132015/margarita-rocks-salt-1200FB.jpg',
//       [
//         new Ingredient( 'Tequila', '6 cl' ),
//         new Ingredient( 'Cointreau ou grand marinier', '3 cl' ),
//         new Ingredient( 'Citron vert', '1/2' ),
//       ],
//       ' Margarita',
//     ),
//     new Cocktail(
//       'Le Sour est une famille traditionnelle de boissons mélangées. Il appartient à l\'une des anciennes familles de cocktails originaux décrites par Jerry Thomas en 1862.',
//       'http://i.huffpost.com/gadgets/slideshows/284884/slide_284884_2189986_free.jpg',
//       [
//         new Ingredient( 'Angostura', '16 gouttes' ),
//         new Ingredient( 'Citron vert', '1' ),
//         new Ingredient( 'Glaçons pilés', '3' ),
//         new Ingredient( 'Rhum blanc', '4 cl' ),
//         new Ingredient( 'Sirop de sucre de canne', '2 cl' ),
//         new Ingredient( 'Oeuf battu en neige', '1' ),
//       ],
//       'Sour',
//     ),
//     new Cocktail(
//       'Le Cuba libre ou rhum-Coca ou rum and Coke ou Cuba au Mexique est un cocktail à base de rhum, de citron vert et de cola.',
//       'http://www.mind-over-batter.com/blog/wp-content/uploads/2014/10/BeFunky_cuba-libre7.jpg.jpg',
//       [
//         new Ingredient( 'Rhum blanc', '5 cl' ),
//         new Ingredient( 'Citron vert pressé', '1/2' ),
//         new Ingredient( 'Glaçons', '4' ),
//         new Ingredient( 'Coca', '12 cl' ),
//         new Ingredient( 'Citron vert décoratif', '1 tranche' ),
//       ],
//       'Cuba libre',
//     ),
//   ] );

//   public constructor( protected http: Http ) {
//     // this.cocktailsInit();
//     this.http.put('https://cocktails-51e1e.firebaseio.com/cocktails.json', this.cocktails.value).subscribe( ( res ) => console.log( res ) );
//   }

//   public addCocktail( cocktail: Cocktail ): void {
//     const cocktails: Cocktail[] = this.cocktails.value.slice();
//     cocktails.push( new Cocktail ( cocktail.desc, cocktail.img, cocktail.ingredients
//              .map( ( ingredient ) => new Ingredient ( ingredient.name, ingredient.quantity ) ), cocktail.name ) );
//     this.cocktails.next( cocktails );
//     this.save();
//   }

//   public cocktailsInit(): void {
//     this.http.get( 'https://cocktails-51e1e.firebaseio.com/cocktails.json' ).map( ( res ) => res.json() )
//     .subscribe( ( cocktails: Cocktail[] ) => {
//       this.cocktails.next( cocktails );
//     } );
//   }

//   public editCocktail( editCocktail: Cocktail ): void {
//     const cocktails: Cocktail[] = this.cocktails.value.slice();
//     const i: number = cocktails.map( ( c ) => c.name ).indexOf( editCocktail.name );
//     cocktails[ i ] = editCocktail;
//     this.cocktails.next( cocktails );
//     this.save();
//   }

//   public getCocktail( i: number ): Observable<Cocktail> {
//     return this.cocktails.filter( ( cocktails ) => cocktails !== null ).map( ( cocktails ) => cocktails[ i ] );
//   }

//   public remove( i: number ): void {
//     this.http.delete( 'https://cocktails-51e1e.firebaseio.com/cocktails/' + i + '.json' )
//     .subscribe( ( res ) => console.log() );
//   }

//   public save(): void {
//     this.http.put( 'https://cocktails-51e1e.firebaseio.com/cocktails.json', this.cocktails.value ).subscribe( ( res ) => console.log() ) ;
//   }
// }
