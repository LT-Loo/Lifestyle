import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowDiaryPageRoutingModule } from './show-diary-routing.module';

import { ShowDiaryPage } from './show-diary.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowDiaryPageRoutingModule
  ],
  declarations: [ShowDiaryPage]
})
export class ShowDiaryPageModule {}
