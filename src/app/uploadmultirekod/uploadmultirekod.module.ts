import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UploadmultirekodPageRoutingModule } from './uploadmultirekod-routing.module';

import { UploadmultirekodPage } from './uploadmultirekod.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UploadmultirekodPageRoutingModule
  ],
  declarations: [UploadmultirekodPage]
})
export class UploadmultirekodPageModule {}
