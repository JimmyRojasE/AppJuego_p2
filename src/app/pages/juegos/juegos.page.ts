import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FireStoreService } from 'src/app/services/fire-store.service';
import { HttpClient } from '@angular/common/http';
import { InterfaceFavorito, InterfaceJuego, InterfaceUser } from 'src/app/modules/interfaz/interfaz.module';
import { ServicioAlertasService } from 'src/app/services/servicio-alertas.service';
@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.page.html',
  styleUrls: ['./juegos.page.scss'],
})
export class JuegosPage implements OnInit {
  
  juegos = [];
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
    public serAlert:ServicioAlertasService,
    private http:HttpClient
    ) { }

  ngOnInit() {
    this.http.get<any>('https://api.rawg.io/api/games?key=36214cc580e7493fa9f5b2d0792347c3')
    .subscribe(res => {
      
      this.juegos = res.results;
    })
  }
 async agregarFavorito(juego) {


    this.detalleJuego(juego);
    let newId;
    
    this.Juego=this.fireBd.getJuego();
    this.User=this.fireBd.getUser();
    newId=this.User.uid+this.Juego.idJuego;
    this.Favorito.Juego=this.Juego;
    this.Favorito.Usuario=this.User;
    this.Favorito.id=newId;
    this.Favorito.estado=true;
   
       
    await this.fireBd.createDoc(this.Favorito,this.path,this.Favorito.id).then((()=>{
      this.serAlert.alertAprobada("Agregado Correctamente");
  
}),error=>{
  this.serAlert.alertAprobada("Error al agregar a favoritos");
  console.log(error);
  
});

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
