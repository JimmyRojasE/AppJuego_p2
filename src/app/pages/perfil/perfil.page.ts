import { Component, OnInit } from '@angular/core';
import { InterfaceUser } from 'src/app/modules/interfaz/interfaz.module';
import { FireStoreService } from 'src/app/services/fire-store.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
Usuario:InterfaceUser;
  constructor(public fireBd:FireStoreService) { }

  ngOnInit() {
    this.Usuario=this.fireBd.getUser();
  }
  editarUsuario(Usuario){
    this.fireBd.crearUsuarioEdit(Usuario);
  }
}
