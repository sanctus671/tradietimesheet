import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ItemSearchPipe} from './item-search';
import {ArraySortPipe} from './sort';


@NgModule({
  imports: [
    CommonModule
  ],
  exports:[
      ItemSearchPipe,
      ArraySortPipe
  ],
  declarations: [ItemSearchPipe, ArraySortPipe]
})
export class PipesModule {}
