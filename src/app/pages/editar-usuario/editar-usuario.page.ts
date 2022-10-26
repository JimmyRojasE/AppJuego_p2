import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { InterfaceUser } from 'src/app/modules/interfaz/interfaz.module';
import { FireStoreService } from 'src/app/services/fire-store.service';
import { ServicioAlertasService } from 'src/app/services/servicio-alertas.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.page.html',
  styleUrls: ['./editar-usuario.page.scss'],
})
export class EditarUsuarioPage implements OnInit {
  path:string="Usuarios";
  formEditUser: FormGroup;
  User: InterfaceUser ={
  uid:null,
  correo:null,
  contraseña:null,
  perfil:null,
  nombre:null,
  apodo:null,
  edad:null,
  celular:null
  }
  constructor(
    public fireBd:FireStoreService,
    public fb:FormBuilder,
    public alertController:AlertController,
    public navCtrl:NavController,
    public route:Router,
    public servAlert:ServicioAlertasService
    ) {

    this.formEditUser=this.fb.group({
      'correo':  ["",[Validators.required, Validators.email,Validators.minLength(3)]],
      'contraseña': ["",[Validators.required,Validators.minLength(6)]],
      'perfil': ["",[Validators.required]],
      'nombre': ["",[Validators.required,Validators.minLength(2)]],
      'apodo': ["",[Validators.required,Validators.minLength(2)]],
      'edad': ["",[Validators.required,Validators.minLength(1),Validators.min(1),Validators.max(100)]],
      'celular': ["",[Validators.required,Validators.minLength(9),Validators.maxLength(9)]]
  });
   }

  ngOnInit( )
   {
    this.User=this.fireBd.getUserEdit();
    this.setUsuario();
    
  }

 setUsuario(){
    this.formEditUser.patchValue({
      
      correo:this.User.correo,
      contraseña:this.User.contraseña,
      perfil:this.User.perfil,
      nombre:this.User.nombre,
      apodo:this.User.apodo,
      edad:this.User.edad,
      celular:this.User.celular
    });
  }

  async Guardar(){
    let usuario=this.formEditUser.value;
    this.User.nombre=usuario.nombre;
    this.User.apodo=usuario.apodo;
    this.User.celular=usuario.celular;
    this.User.contraseña=usuario.contraseña;
    this.User.correo=usuario.correo;
    this.User.edad=usuario.edad;
    this.User.perfil=usuario.perfil;
    
    
   

    
    if(this.formEditUser.invalid){
      const alert = await this.alertController.create({
        header:"Datos Incompletos o invalidos",
        message:'Debe llenar todos los campos',
        buttons:['Aceptar']
      });
      await alert.present();
      return;
    }else {
      
      
      this.fireBd.createDoc(this.User,this.path,this.User.uid).then(()=>{
      this.route.navigate(['juegos']);  
      const mensaje = 'Usuario Actualizado Exitosamente'
      this.servAlert.alertAprobada(mensaje);
      this.limpiarFormulario();
      return;
      },async erro=>{
        const mensaje = 'error al actualizar al Usuario'
      this.servAlert.alertFallida(mensaje);
        console.log("error no se pudo Actualizar al usuario =>", erro);
        this.route.navigate(['juegos']);
      });
    
      this.route.navigate(['juegos']);
 
    } 

  }

  limpiarFormulario(){
    this.formEditUser.patchValue({
      
      correo:null,
      contraseña:null,
      perfil:null,
      nombre:null,
      apodo:null,
      edad:null,
      celular:null
    });
  }
}
