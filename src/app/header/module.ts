import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HeaderC } from './component/header';

@NgModule( {
  declarations: [
    HeaderC,
  ],
  exports: [ HeaderC ],
  imports: [
    CommonModule,
    RouterModule,
  ],
})
export class HeaderMD {}
