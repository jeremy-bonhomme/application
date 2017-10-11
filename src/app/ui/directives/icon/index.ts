import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive( {
  selector: '[uiIcon]',
} )
export class UiIconDI implements OnChanges {
  @Input() public uiIcon: string;
  @Input() public uiIconAfter: boolean = false;
  @Input() public uiIconCl: string = '';

  protected _elIcon: HTMLSpanElement;

  public constructor( protected _er: ElementRef, protected _renderer: Renderer2 ) {
    this._elIcon = this._renderer.createElement( 'span' );
  }

  public ngOnChanges( { uiIcon }: SimpleChanges ): void {
    const el: HTMLBaseElement = this._er.nativeElement;
    this._elIcon.className = `c-ui-icon c-ui-icon--${ this.uiIcon } ${ this.uiIconCl } ${ this.uiIcon ? '' : 'is-hidden' }`;
    if ( !uiIcon.previousValue && !!uiIcon.currentValue ) {
      this.uiIconAfter ? this._renderer.appendChild( el, this._elIcon ) : this._renderer.insertBefore( el, this._elIcon, el.firstChild );
    } else if ( !!uiIcon.previousValue && !uiIcon.currentValue ) this._renderer.removeChild( el, this._elIcon );
  }
}
