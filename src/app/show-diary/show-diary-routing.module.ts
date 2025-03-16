import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowDiaryPage } from './show-diary.page';

const routes: Routes = [
  {
    path: '',
    component: ShowDiaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowDiaryPageRoutingModule {}
