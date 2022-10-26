import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { InterfaceUser } from '../modules/interfaz/interfaz.module';
import { FireStoreService } from './fire-store.service';

@Injectable({
  providedIn: 'root'
})
export class Guard1Guard implements CanActivate {
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
      if(this.fireBD.getUser().uid!=null){
      return true;
    }
      this.router.navigate['/login']
      return false;
        
      
  }
  
}