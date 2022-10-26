import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { BehaviorSubject } from 'rxjs';

import { InterfaceFavorito, InterfaceJuego, InterfaceUser } from '../modules/interfaz/interfaz.module';
@Injectable({
  providedIn: 'root'
})
export class FireStoreService {
  private UserObservable:BehaviorSubject<InterfaceUser>=new BehaviorSubject<InterfaceUser>({
    uid:"",
    correo:"",
    contraseña:"",
    perfil:null,
    nombre:"",
    apodo:"",
    edad:0,
    celular:0});
    

  UserEdit:InterfaceUser={
    uid:null,
    correo:null,
    contraseña:null,
    perfil:null,
    nombre:null,
    apodo:null,
    edad:null,
    celular:null
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

  Favorito:InterfaceFavorito={
    id:null,
    Usuario:null,
    Juego:null,
    estado:false
  };

  constructor(private fireBd:AngularFirestore) { }

  getCollection<tipe>(path: string){

    this.fireBd.collection<tipe>(path).valueChanges().subscribe(res=>{
    return res;
    });
  }
  
  createDoc(data: any,path: string, id:string){
    const collection=this.fireBd.collection(path);
    return collection.doc(id).set(data);
  }
  getDoc<tipo>(path:string, id:string){
    const collection=this.fireBd.collection<tipo>(path)
    return collection.doc(id).valueChanges();
  }
  getDocFilter<tipo>(path:string){
    const collection=this.fireBd.collection<tipo>(path);
    return collection.valueChanges({idField:'id'})
  }
  deleteDoc(id:string ,path:string){
    const collection =this.fireBd.collection(path);
    return collection.doc(id).delete()
  }
  updateDoc(data:any,id:string,path:string){
    const collection=this.fireBd.collection(path);
    return collection.doc(id).update(data)
  }
  getId(){
    return this.fireBd.createId();
  }
  crearUsuario(user:InterfaceUser){
    
    this.User=user;
    this.setUsuario=this.User;

  }
  set setUsuario(user:InterfaceUser){
    
    this.UserObservable.next(user);

  }

  crearUsuarioEdit(user:InterfaceUser){
    return this.UserEdit=user;
  }
  crearJuego(juego:InterfaceJuego){
    return this.Juego=juego;
  }
  getJuego(){
    return this.Juego;
  }
  getUser(){
    return this.User;
  }
  get getUserObservable(){
    return this.UserObservable.asObservable();
  }
  getUserEdit(){
    return this.UserEdit;
  }
  logout(){
    this.setUsuario={
    uid:"",
    correo:"",
    contraseña:"",
    perfil:null,
    nombre:"",
    apodo:"",
    edad:0,
    celular:0
  };
    return this.User={uid:null,
    correo:null,
    contraseña:null,
    perfil:null,
    nombre:null,
    apodo:null,
    edad:null,
    celular:null
    };

  }
  validaFavorito(favorito:InterfaceFavorito){
   let bol=false;

    this.getDoc<InterfaceFavorito>("Favoritos",favorito.id).subscribe((resp)=>{
      bol=true;
      console.log(resp,bol);
      
    })
    console.log(bol);
    
    return bol;
  }
 

}
