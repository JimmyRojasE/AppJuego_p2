import { CommonModule, NgIf } from '@angular/common';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { Guard1Guard } from './services/guard1.guard';
import { Guard2Guard } from './services/guard2.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'juegos',
    redirectTo: 'juegos',
    pathMatch: 'full'
  },
  {
    path: 'login',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'pagAdministrador',
    redirectTo: 'pagAdministrador',
    pathMatch: 'full'
  },
  {
    path: 'favoritos',
    redirectTo: 'favoritos',
    pathMatch: 'full'
  },
  {
    path: 'crearUsuario',
    redirectTo: 'crearUsuario',
    pathMatch: 'full'
  },
  {
    path: 'perfil',
    redirectTo: 'perfil',
    pathMatch: 'full'
  },
  {
    path: 'crearUsuario',
    redirectTo: 'crearUsuario',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule),canActivate:[Guard1Guard]
  },
  {
    path: 'juegos',
    loadChildren: () => import('./pages/juegos/juegos.module').then( m => m.JuegosPageModule), canActivate:[Guard1Guard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),canActivate:[Guard1Guard]
  },
  {
    path: 'pagAdministrador',
    loadChildren: () => import('./pages/administrador/pag-administrador/pag-administrador.module').then( m => m.PagAdministradorPageModule),canActivate:[Guard1Guard,Guard2Guard]
  },
  {
    path: 'detalleJuego/:id',
    loadChildren: () => import('./pages/detalle-juego/detalle-juego.module').then( m => m.DetalleJuegoPageModule),canActivate:[Guard1Guard]
  },
  {
    path: 'favoritos',
    loadChildren: () => import('./pages/favoritos/favoritos.module').then( m => m.FavoritosPageModule),canActivate:[Guard1Guard]
  },
  {
    path: 'crearUsuario',
    loadChildren: () => import('./pages/administrador/crear-usuario/crear-usuario.module').then( m => m.CrearUsuarioPageModule),canActivate:[Guard1Guard,Guard2Guard]
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule),canActivate:[Guard1Guard]
  },
  {
    path: 'editarUsuario/:uid',
    loadChildren: () => import('./pages/editar-usuario/editar-usuario.module').then( m => m.EditarUsuarioPageModule),canActivate:[Guard1Guard, Guard2Guard]
  },
  {
    path: 'editarPerfil/:uid',
    loadChildren: () => import('./pages/editar-perfil/editar-perfil.module').then( m => m.EditarPerfilPageModule),canActivate:[Guard1Guard]
  },
  {
    path: 'error404',
    loadChildren: () => import('./pages/error404/error404.module').then( m => m.Error404PageModule)
  },
  {
    path: '**',
    redirectTo: 'error404',
    pathMatch: 'full'
  },
  
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
