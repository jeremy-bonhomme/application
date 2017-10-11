import { Ingredient } from 'app/panier/store/model';

export class Cocktail {
  public constructor(
    public desc: string,
    public img: string,
    public ingredients: Ingredient[],
    public name: string,
  ) { }
}
