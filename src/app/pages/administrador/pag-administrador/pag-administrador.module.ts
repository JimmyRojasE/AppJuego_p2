import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagAdministradorPageRoutingModule } from './pag-administrador-routing.module';

import { PagAdministradorPage } from './pag-administrador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagAdministradorPageRoutingModule
  ],
  declarations: [PagAdministradorPage]
})
export class PagAdministradorPageModule {}
