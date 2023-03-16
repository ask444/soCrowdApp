import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScoreCardComponent } from './score-card.component';

import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [ScoreCardComponent],
  imports: [
    CommonModule,MatCardModule,MatButtonModule,MatIconModule,FlexLayoutModule
  ],
  exports:[ScoreCardComponent]
})
export class ScoreCardModule { }
