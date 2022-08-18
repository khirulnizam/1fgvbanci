import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UploadmultirekodPage } from './uploadmultirekod.page';

const routes: Routes = [
  {
    path: '',
    component: UploadmultirekodPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UploadmultirekodPageRoutingModule {}
