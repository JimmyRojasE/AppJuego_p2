import { Component, OnInit } from '@angular/core';
import { InterfaceFavorito, InterfaceUser } from 'src/app/modules/interfaz/interfaz.module';
import { FireStoreService } from 'src/app/services/fire-store.service';
import { ServicioAlertasService } from 'src/app/services/servicio-alertas.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage implements OnInit {
  User:InterfaceUser;
  Favoritos:InterfaceFavorito[];
path:string="Favoritos";
  constructor(public fireDb:FireStoreService, public serAlert:ServicioAlertasService) { }

 async ngOnInit() {
    this.fireDb.getDocFilter<InterfaceFavorito>(this.path).subscribe(res => {
     console.log(res);

     this.Favoritos = res;
   });

    this.User=this.fireDb.getUser();

  }
  delFavorito(Favorito){
    this.fireDb.deleteDoc(Favorito.id,"Favoritos").then(()=>{
      this.serAlert.alertAprobada("Eliminado Correctamente");
    },()=>{
      this.serAlert.alertFallida("Error al eliminar");
    });
  }

}
