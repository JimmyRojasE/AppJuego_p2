import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { InterfaceUser } from 'src/app/modules/interfaz/interfaz.module';
import { FireStoreService } from 'src/app/services/fire-store.service';
import { ServicioAlertasService } from 'src/app/services/servicio-alertas.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.page.html',
  styleUrls: ['./crear-usuario.page.scss'],
})
export class CrearUsuarioPage implements OnInit {
  path:string="Usuarios";
  formUser: FormGroup;
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
    public fb:FormBuilder,
    public alertController:AlertController,
    public navCtrl:NavController,
    private frBd:FireStoreService,
    private route:Router,
    private servAlert:ServicioAlertasService
  ) { 

    this.formUser=this.fb.group({
      'correo':  ["",[Validators.required, Validators.email,Validators.minLength(3)]],
      'contraseña': ["",[Validators.required,Validators.minLength(6)]],
      'perfil': ["",[Validators.required]],
      'nombre': ["",[Validators.required,Validators.minLength(2)]],
      'apodo': ["",[Validators.required,Validators.minLength(2)]],
      'edad': ["",[Validators.required,Validators.minLength(1),Validators.min(1),Validators.max(100)]],
      'celular': ["",[Validators.required,Validators.minLength(9),Validators.maxLength(9)]]
  });
  }

  ngOnInit() {
  }

  async crearUsuario(){
    let usuario=this.formUser.value;
    this.User.nombre=usuario.nombre;
    this.User.apodo=usuario.apodo;
    this.User.celular=usuario.celular;
    this.User.contraseña=usuario.contraseña;
    this.User.correo=usuario.correo;
    this.User.edad=usuario.edad;
    this.User.perfil=usuario.perfil;
    const idUsuario=this.frBd.getId();
    this.User.uid=idUsuario;
   

    
    if(this.formUser.invalid){
      const alert = await this.alertController.create({
        header:"Datos Incompletos o invalidos",
        message:'Debe llenar todos los campos',
        buttons:['Aceptar']
      });
      await alert.present();
      return;
    }else {
      this.frBd.createDoc(this.User,this.path,this.User.uid).then(()=>{
      const mensaje = 'Usuario Creado Exitosamente'
      this.servAlert.alertAprobada(mensaje);
      this.limpiarFormulario();
          
      },async erro=>{
        console.log("error no se pudo crear el usuario =>", erro);
      
      });
    
      this.route.navigate(['pagAdministrador']);
  
    }

  }
  

  
  limpiarFormulario(){
    this.formUser.patchValue({
      
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

