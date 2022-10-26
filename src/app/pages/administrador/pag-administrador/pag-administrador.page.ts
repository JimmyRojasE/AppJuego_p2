import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { InterfaceUser } from 'src/app/modules/interfaz/interfaz.module';
import { FireStoreService } from 'src/app/services/fire-store.service';
import { ServicioAlertasService } from 'src/app/services/servicio-alertas.service';

@Component({
  selector: 'app-pag-administrador',
  templateUrl: './pag-administrador.page.html',
  styleUrls: ['./pag-administrador.page.scss'],
})
export class PagAdministradorPage implements OnInit {
path:string="Usuarios";
userActual:InterfaceUser;
Usuarios=[];
  constructor(private route:Router,
              private fireDb:FireStoreService,
              private servAlert:ServicioAlertasService
              ) { }

  ngOnInit() {
    this.fireDb.getDocFilter<any>(this.path).subscribe(res => {
      this.Usuarios = res;
    },err=>{
      console.log(err);
    });
  }
  crearUsuario(){
    this.route.navigate(['crearUsuario']);
  }

  eliminarUser(usuario:InterfaceUser){
    this.userActual=this.fireDb.getUser();
    if(usuario.uid==this.userActual.uid){
      this.servAlert.alertAprobada("Este Usuario no se puede eliminar")
    }else{
    this.fireDb.deleteDoc(usuario.uid,this.path).then(()=>{
    this.servAlert.alertAprobada("Usuario Eliminado Correctamente")
    this.route.navigate(['pagAdministrador']);
  },error=>{
    this.servAlert.alertFallida("Error al Eliminar el Usuario")
    this.route.navigate(['pagAdministrador']);
    console.log(error);
    
  } );
} 

  }
  editarUser(usuario:InterfaceUser){
    this.fireDb.crearUsuarioEdit(usuario);
  }
}

