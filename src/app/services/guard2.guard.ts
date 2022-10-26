import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { InterfaceUser } from '../modules/interfaz/interfaz.module';
import { FireStoreService } from './fire-store.service';

@Injectable({
  providedIn: 'root'
})
export class Guard2Guard implements CanActivate {
  User:InterfaceUser;
  constructor(
    private fireBD:FireStoreService,
    private router:Router
    ){
    this.User=this.fireBD.getUser();
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.fireBD.getUser().perfil=="Administrador"||this.fireBD.getUser().perfil!="Cliente"){
      return true;
    }else{
      this.router.navigate['/juegos']
      return false;
    }
      
  }
  
}
