import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class InterfazModule {
 
 }
 export interface InterfaceUser{
  
  uid:string;
  correo:string;
  contraseña:string;
  perfil:'Administrador'|'Cliente';
  nombre:string;
  apodo:string;
  edad:number;
  celular:number;
}
export interface InterfaceJuego{
  idJuego:string;
  nombreJuego:string;
  imgJuego:string;
  fechaLanzamientoJuego:string;
  clasificacion:number;
  tiempoJuego:number;
  PuntuacionCritica:number;
  clasificacionESBR:string;
}
export interface InterfaceFavorito{
  id:string;
  Usuario:InterfaceUser;
  Juego:InterfaceJuego;
  estado:boolean;
  
}
