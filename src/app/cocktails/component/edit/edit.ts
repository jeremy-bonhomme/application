import { Component, OnChanges, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

import { CocktailS } from 'app/cocktails/service';
import { Cocktail } from 'app/cocktails/store/model';

@Component( {
  selector: 'app-cocktail-edit',
  templateUrl: 'edit.html',
} )
export class CocktailsEditC<T> implements OnInit {
  public add: string;
  public characterMessage: string;
  public cocktailForm: FormGroup;
  public cocktail: Cocktail;
  public cocktails: Cocktail[];
  public edit: boolean;
  public forbiddenWordsMessage: string;
  public isSubmitted: boolean;
  public message: string = '';
  public nullMessage: string;

  public character: string[] = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    '*', '-', '+', '.', '}', '=', ']', ')', '°', '@', '^',
    '\\', '_', '`', '|', '[', '(', '{', '#', '"', '&', '²',
    '€', '¨', '$', '¤', '£', 'µ', 'ù', '%', '!', '§', ':',
    '/', ';', ',', '?', '<', '>', '~', '\'',
  ];

  public forbiddenWords: string[]  = [
    'bitocu', 'illuminati', 'iluminati', 'ejacule', 'éjacule',
    'ejacul', 'éjacule', 'ejaculation', 'éjaculation', 'anal',
    'anale', 'anulingus', 'anus', 'bite', 'caca', 'pipi', 'penis',
    'pénis', 'sperm', 'sperme', 'vagin', 'con ', 'connard', 'connasse',
    'salope', 'poufiasse', 'dick', 'semence', 'foutr', 'foutre',
    'semensse', 'semance', 'queue', 'keue', 'queu', ' nu ', ' nues ',
    ' nue ', 'nudité', 'cul ', ' cul', 'enculé', 'encule', 'à poil',
    'chatte', 'bourse', ' chie ', 'chie ', 'chier', 'chiasse', 'merde',
    'putain', 'ta mère', 'tamère', 'pute', 'putasse', 'couille',
    'jus liquide', 'enfoiré', 'bifl', 'bifle', 'biffle', 'biffl',
    'moule', 'moul ', 'burne', 'astique', 'astiquer', 'zguègue', 'zeub',
    'sboub', 'aval', 'avale', 'avaler', 'baise', 'baisable', 'baiser',
    'bande', 'bander', 'broute', 'brouter', 'brouteur', 'brouteuse',
    'gland', 'couillu', 'couilles', 'BZ', 'bibite', 'branl', 'branle',
    'branler', 'branleur', 'branleuse', 'sexe', 'sexuel', 'sexuelle',
    'bonnasse', 'bonne', 'bouff', 'bouffe', 'bouffer', 'boukak', 'bourre',
    'bourrer', 'boule', 'branlée', 'branlette', 'chieur', 'chiotte',
    'chieuse', 'pisse', 'pisser', 'enculade', 'culbute', 'culbuter',
    'culer', 'défoncer', 'defoncer', 'defonce', 'defoncer', 'demonte',
    'démonte', 'demonter', 'démonter', 'puceau', 'pucelle', 'pucell',
    'depucele', 'dépucele', 'dépucèle', 'depucèle', 'dépucelé',
    'dépucelage', 'depucelage', 'enfoiré', 'doigter', 'doigte',
    'diarrhée', 'diarrée', 'diaré', 'diarée', 'dilate', 'dilater',
    'pignole', 'pignoler', 'tripote', 'tripot', 'tripoter', 'dilat',
    'ducon', 'couillé', 'burné', 'merdé', 'enculatoire', 'enculade',
    'encul', 'chienne', 'enfile', 'enfil', 'enfiler', 'enfoirer',
    'vulv', 'vulve', 'fourre', 'fourrer', 'fourer', 'foure', 'fuck',
    'pussy', 'cumshot', 'facial', 'faciale', 'gueule', 'gueul', 'gueuler',
    'fist', 'fister', 'batard', 'bâtard', 'batar', 'bâtar', 'fion', 'garce',
    'PD', 'pédé', 'fesse', 'fiotte', 'lèche cul', 'lèche-cul', 'leche',
    'lècher', 'lèche', 'leche', 'limer', 'lopette', 'merdasse', 'merdeux',
    'merdicité', 'morue', 'pipe', 'piper', 'nique', 'niquer', 'NTM',
    'zob', 'pédale', 'pine', 'piner', 'raie', 'poutrer', 'queutar',
    'queutard', 'touffe', 'croupion', 'schnek', 'shnek', 'chnek', 'schnec',
    'chnec', 'shnec', 'salopard', 'rondelle', 'sa mère', 'samère',
    'roubignole', 'roupette', 'rouston', 'testicule', 'testicules',
    'testicul', 'salaud', 'sphincter', 'suce', 'sucer', 'suceuse',
    'suceur', 'tafiole', 'tantouze', 'tarlouze', 'tête de noeud',
    'tete de noeud', 'troufignole', 'troufignon', 'zboob', 'zboub',
    'tremper son biscuit', 'trempe son biscuit', 'trou du cul',
    'trouduc', 'teuch', 'teucha', 'teub', 'tepu', 'turlute', 'turlutte',
  ];

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
        this.initForm(  params.i, { desc: '', img: '', ingredients: [ { nom: '', quantity: '' } ], name: '' } );
      }
    } );
    this._cocktailS.cocktails.subscribe( ( cocktails: Cocktail[] ) => {
      this.cocktails = cocktails;
    } );
    this.characterMessage =  'L\'un des caractères que vous souhaitez utiliser est interdit.';
    this.nullMessage =  'Le champs ne peut pas être vide.';
    this.forbiddenWordsMessage = 'L\'un des mots que vous souhaitez utiliser n\'est pas autorisé.';
  }

  public addIngredient(): string {
    const formEl: FormArray = this.cocktailForm.get( 'ingredients' ) as FormArray;
    if ( formEl.length < 8 ) {
      formEl.push( this.fb.group( {
        nom: [ '', [ Validators.required,
                     this.validatorChar.bind( this ),
                     this.validatorNull.bind( this ),
                     this.validatorValue.bind( this ) ] ],
        quantity: [ '', [ Validators.required,
                          this.validatorNull.bind( this ),
                          this.validatorValue.bind( this ) ] ],
      } ) );
    } else if ( formEl.length === 8 ) {
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
      this.initForm(  0, { desc: '', img: '', ingredients: [ { nom: '', quantity: '' } ], name: '' } );
    }
  }

  public get formData(): FormArray {
    const formEl: FormArray = this.cocktailForm.get( 'ingredients' ) as FormArray;
    return formEl;
  }

  public initForm( i: number, cocktail: Cocktail = { desc: '', img: '', ingredients: [ { nom: '', quantity: '' } ], name: '' } ): void {
    this.cocktailForm = this.fb.group( {
      desc: [ cocktail.desc, [ Validators.required,
                               this.validatorNull.bind( this ),
                               this.validatorValue.bind( this ) ] ],
      img: [ cocktail.img, [ Validators.required,
                             this.validatorNull.bind( this ),
                             this.validatorValue.bind( this ) ] ],
      ingredients: this.fb.array( cocktail.ingredients
                          .map( ( ingredient ) => this.fb.group( {
                            nom: [ ingredient.nom, [ Validators.required,
                                                     this.validatorChar.bind( this ),
                                                     this.validatorNull.bind( this ),
                                                     this.validatorValue.bind( this ) ] ],
                            quantity: [ ingredient.quantity, [ Validators.required,
                                                               this.validatorNull.bind( this ),
                                                               this.validatorValue.bind( this ) ] ],
                          } ) ) ),
      name: [ cocktail.name, [ Validators.required,
                               this.validatorChar.bind( this ),
                               this.validatorNull.bind( this ),
                               this.validatorValue.bind( this ) ] ],
    } );
  }

  public get desc( ): AbstractControl { return this.cocktailForm.get( 'desc'); }
  public get img( ): AbstractControl { return this.cocktailForm.get( 'img' ); }
  public get name( ): AbstractControl { return this.cocktailForm.get( 'name' ); }

  public removeIngredient( i: number ): string {
    const formEl: FormArray =  this.cocktailForm.get( 'ingredients' ) as FormArray;
    formEl.removeAt( i );
    return ( this.message = '');
  }

  public validatorChar( formControl: FormControl ): object {
    let iC: number = 0;
    while ( iC < this.character.length ) {
      if ( formControl.value.toLowerCase().includes( this.character[ iC ] ) ) {
        return { charInvalid: true };
      } else {
        iC++;
      }
    }
  }

  public validatorNull( formControl: FormControl ): object {
    if ( formControl.value.trim() === '' ) {
      return { nullField: true } ;
    }
  }

  public validatorValue( formControl: FormControl ): object {
    let i: number = 0;
    while ( i < this.forbiddenWords.length ) {
      if ( formControl.value.toLowerCase().includes( this.forbiddenWords[ i ] ) ) {
        return { isInvalid: true };
      } else {
        i++;
      }
    }
  }
}
