import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

import { CocktailS } from 'app/cocktails/service';
import { Cocktail } from 'app/cocktails/store/model';

@Component( {
  selector: 'app-cocktail-edit',
  templateUrl: 'edit.html',
} )
export class CocktailsEditC implements OnInit {
  public add: string;
  public cocktailForm: FormGroup;
  public cocktail: Cocktail;
  public cocktails: Cocktail[];
  public edit: boolean;
  public isSubmitted: boolean;
  public message: string;

  public constructor( protected fb: FormBuilder, protected _cocktailS: CocktailS, protected _ar: ActivatedRoute ) { }

  public ngOnInit(): void {
    this._ar.params.subscribe( (params: Params ) => {
      if ( params.i ) {
        this.edit = true;
        this._cocktailS.getCocktail( params.i ).subscribe( ( cocktail: Cocktail ) => {
          this.cocktail = cocktail;
          this.initForm( params.i, this.cocktail );
        } );
      } else {
        this.edit = false;
        this.initForm(  params.i, { desc: '', img: '', ingredients: [ { name: '', quantity: '' } ], name: '' } );
      }
    } );
    this._cocktailS.cocktails.subscribe( ( cocktails: Cocktail[] ) => {
      this.cocktails = cocktails;
    } );
  }

  public addIngredient(): string {
    if ( ( <FormArray> this.cocktailForm.get( 'ingredients' ) ).length < 8 ) {
      ( <FormArray> this.cocktailForm.get( 'ingredients' ) ).push( this.fb.group( {
        name: [ '' ],
        quantity: [ '' ],
      } ) );
    } else if ( ( <FormArray> this.cocktailForm.get( 'ingredients' ) ).length === 8 ) {
      return ( this.message = 'Vous ne pouvez ajouter que 8 ingrédients maximum');
    }
  }

  public createCocktail(): void {
    if ( this.edit ) {
      this._cocktailS.editCocktail( this.cocktailForm.value );
      this.isSubmitted = true;
      this.add = 'Votre cocktail a bien été mis à jour';
    } else {
      this._cocktailS.addCocktail( this.cocktailForm.value );
      this.isSubmitted = true;
      this.add = 'Votre cocktail a bien été ajouté';
      this.cocktailForm.reset();
    }
  }

  public initForm( i: number, cocktail: Cocktail = { desc: '', img: '', ingredients: [ { name: '', quantity: '' } ], name: '' } ): void {
    this.cocktailForm = this.fb.group( {
      desc: [ cocktail.desc, Validators.required ],
      img: [ cocktail.img, Validators.required ],
      ingredients: this.fb.array( cocktail.ingredients
                          .map( ( ingredient ) => this.fb.group( { name: [ ingredient.name ], quantity: [ ingredient.quantity ] } ) ) ),
      name: [ cocktail.name, Validators.required ],
    } );
  }

  public get desc( ): any { return this.cocktailForm.get( 'desc'); }
  public get img( ): any { return this.cocktailForm.get( 'img' ); }
  public get name( ): any { return this.cocktailForm.get( 'name' ); }

  public removeIngredient( i: number ): string {
    ( <FormArray> this.cocktailForm.get( 'ingredients' ) ).removeAt( i );
    return( this.message = '');
  }

  get formData() { return <FormArray> this.cocktailForm.get( 'ingredients' ); }
}
