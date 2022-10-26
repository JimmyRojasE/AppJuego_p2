import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { InterfaceUser } from './modules/interfaz/interfaz.module';
import { FireStoreService } from './services/fire-store.service';
import { ServicioAlertasService } from './services/servicio-alertas.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  logeado:boolean=false;
  admin:boolean=false;
  UserObservado$:Observable<InterfaceUser>;
  user:InterfaceUser={
    uid:null,
    correo:null,
    contraseña:null,
    perfil:null,
    nombre:null,
    apodo:null,
    edad:null,
    celular:null
    }
  constructor(private fireBd:FireStoreService, private alerta:ServicioAlertasService) {
    this.user=this.fireBd.getUser();
    this.UserObservado$=fireBd.getUserObservable;
    this.UserObservado$.subscribe((data=>{
      if(data.uid!=null && data!=null && data.uid!=""){
        this.logeado=true;
      }else this.logeado=false;
      
      

      if(data.perfil=="Administrador"){
        this.admin=true;
      }else this.admin=false;
      
     

    }
      ))
    }

    botonMn(){
      this.user=this.fireBd.getUser();
      console.log(this.user);
      
    }
  Logout(){
    this.fireBd.logout();
    this.alerta.alertAprobada("Sesión Finalizada, Muchas Gracias por su visita");
   }

   
  
}
