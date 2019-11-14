import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatePersonPageRoutingModule } from './create-person-routing.module';

import { CreatePersonPage } from './create-person.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CreatePersonPageRoutingModule
  ],
  declarations: [CreatePersonPage]
})
export class CreatePersonPageModule {}
