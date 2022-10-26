import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ServicioAlertasService {

  constructor(private toast:ToastController) { }

  // Metodos de alertas

  async alertFallida(mensaje: string){
    const alert = await this.toast.create({
      message: mensaje,
      duration: 1500,
      position: 'bottom',
      icon:'sad-outline',
      color:'danger'
    });
    await alert.present();
  }

  async alertAprobada(mensaje: string){
    const alert = await this.toast.create({
      message: mensaje,
      duration: 1500,
      position: 'bottom',
      icon:'happy-outline',
      color:'success'
    });
    await alert.present();
  }
}

