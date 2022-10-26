import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagAdministradorPage } from './pag-administrador.page';

const routes: Routes = [
  {
    path: '',
    component: PagAdministradorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagAdministradorPageRoutingModule {}
