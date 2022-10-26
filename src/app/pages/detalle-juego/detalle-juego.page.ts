import { Component, OnInit } from '@angular/core';
import { InterfaceFavorito, InterfaceJuego, InterfaceUser } from 'src/app/modules/interfaz/interfaz.module';
import { FireStoreService } from 'src/app/services/fire-store.service';
import { ServicioAlertasService } from 'src/app/services/servicio-alertas.service';

@Component({
  selector: 'app-detalle-juego',
  templateUrl: './detalle-juego.page.html',
  styleUrls: ['./detalle-juego.page.scss'],
})
export class DetalleJuegoPage implements OnInit {
  Juego:InterfaceJuego={
    idJuego:null,
    nombreJuego:null,
    imgJuego:null,
    fechaLanzamientoJuego:null,
    clasificacion:null,
    tiempoJuego:null,
    PuntuacionCritica:null,
    clasificacionESBR:null
    };
    User:InterfaceUser={
      uid:null,
      correo:null,
      contraseña:null,
      perfil:null,
      nombre:null,
      apodo:null,
      edad:null,
      celular:null
      };
      Favorito:InterfaceFavorito={
        id:null,
        Usuario:null,
        Juego:null,
        estado:false
      };
    path:string="Favoritos";
 
  constructor(
    public fireBd: FireStoreService, 
    public serAlert:ServicioAlertasService
    ) { }

  ngOnInit() {
    this.Juego=this.fireBd.getJuego();  
    
    
  }

  async agregarFavorito() {
    
    this.User=this.fireBd.getUser();
    const idFavorito=this.User.uid+this.Juego.idJuego
    this.Favorito.Juego=this.Juego;
    this.Favorito.Usuario=this.User;
    this.Favorito.id=idFavorito;
    this.Favorito.estado=true;

    console.log(this.Favorito);
    
    const r= await this.fireBd.createDoc(this.Favorito,this.path,this.Favorito.id).then((res=>{
          this.serAlert.alertAprobada("Agregado Correctamente");
      
    }),error=>{
      this.serAlert.alertAprobada("Error al agregar a favoritos");
      console.log(error);
      
    }
    );
   
  }

  detalleJuego(juego){
    this.Juego.idJuego=juego.id;
    this.Juego.nombreJuego=juego.name;
    this.Juego.imgJuego=juego.background_image;
    this.Juego.tiempoJuego=juego.playtime;
    this.Juego.PuntuacionCritica=juego.metacritic;
    this.Juego.clasificacionESBR=juego.esrb_rating.name;
    this.Juego.clasificacion=juego.rating_top;
    this.Juego.fechaLanzamientoJuego=juego.released;
    this.fireBd.crearJuego(this.Juego);
  }

}
