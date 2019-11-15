import {
  Injectable
} from '@angular/core';
import {
  AlertController,
  ToastController,
  LoadingController
} from '@ionic/angular';
import { AlertButton } from '@ionic/core';
@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private alrtCtrl: AlertController, private toastCtrl: ToastController, private loadctrl: LoadingController) { }

  async presentAlert(header: string,
    message: string,
    buttons: AlertButton[],
    subHeader?: string,
    inputs?: [{}]) {

    let alrt = await this.alrtCtrl.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: buttons,
      inputs: inputs
    })
    await alrt.present();

  }
  async presentLoading(text) {
    let loading = await this.loadctrl.create({
      spinner: 'circular',
      message: text,
      duration: 500
    });

    await loading.present();
  }

  async loadingDismiss() {
    await this.loadctrl.dismiss();
  }
  async presentToast(text, duration, pos) {
    let loading = await this.toastCtrl.create({
      message: text,
      duration: duration,
      position: pos
    });

    await loading.present();
  }

  formatDate(date) {
    console.log(date)
    var monthNames = [
      "Enero", "Febrero", "Marzo",
      "Abril", "Mayo", "Junio", "Julio",
      "Agosto", "Septiembre", "Octubre",
      "Noviembre", "Diciembre"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }
}