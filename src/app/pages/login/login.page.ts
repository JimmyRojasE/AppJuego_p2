import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InterfaceUser } from 'src/app/modules/interfaz/interfaz.module';
import { FireStoreService } from 'src/app/services/fire-store.service';
import { ServicioAlertasService } from 'src/app/services/servicio-alertas.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formLogin : FormGroup;
  path:string="Usuarios";
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

  constructor(
    
    public dbUsuarios: FireStoreService,
    public router: Router,
    public fb: FormBuilder,
    public serAlert:ServicioAlertasService
  ) { }

  ngOnInit() {
    this.formLogin = this.fb.group({
      'email':  ["",[Validators.required, Validators.email,Validators.minLength(3)]],
      'contraseña': ["",[Validators.required,Validators.minLength(6)]]
    })
   this.limpiarFormulario();
  }

  validarLogin(){
    const email = this.formLogin.value.email;
    const contraseña = this.formLogin.value.contraseña;
   
    if (email==null||contraseña==null){
      this.serAlert.alertFallida("falta ingresar Información");
      
    }else if(this.formLogin.invalid){
      
      this.serAlert.alertFallida("Error en los datos ingresados");

    }else{
      this.dbUsuarios.getDocFilter(this.path).subscribe((data) =>
       {
      if(this.validaUser(data,email,contraseña)){
       
        
        this.limpiarFormulario();
        this.serAlert.alertAprobada("Ingreso Valido");
        this.router.navigate(['home'])
        console.log("Estoy login");
        
        return;
      }
      else{
        this.limpiarFormulario();
        this.serAlert.alertFallida("Ingreso Invalido");
        this.router.navigate(['login']);
      }
    }
      )
    }
   
      
  }
      
  limpiarFormulario(){
    this.formLogin.patchValue({
      email:null,
      contraseña:null
    });
  }
  validaUser(data:any ,email:string,passw:string){
    let boolean=false;
    data.forEach(usuario => {
      if (email == usuario.correo && passw == usuario.contraseña){
        this.dbUsuarios.crearUsuario(usuario);
        
       
        
        boolean= true;
      }

    })
    return boolean;
  }

}
