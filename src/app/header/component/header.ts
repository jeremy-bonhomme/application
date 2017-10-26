import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
})
export class HeaderC {
  public isOpen: boolean;

  public toggleNav(): void {
    this.isOpen = !this.isOpen;
  }
}
