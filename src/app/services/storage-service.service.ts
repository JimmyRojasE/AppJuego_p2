import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    public storage:Storage
  ) {this.crearCache()}

  crearCache(){
    this.storage.create()
  }

  agregarDatos(id, valor) {
    
    
    this.storage.set(id, valor)
    console.log(this.storage);
  }

  getDatos(id){
    return this.storage.get(id)
  }

}
