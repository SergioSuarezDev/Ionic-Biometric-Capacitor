import { Injectable } from '@angular/core';
import { AlertController, ToastController, NavController } from '@ionic/angular';
import { FingerPrintAuth } from 'capacitor-fingerprint-auth';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(
    private alertCtrl: AlertController,
    private storage: StorageService,
    private toastController: ToastController,
    private navCtrl: NavController
  ) { }

  public async setPass() {
    const alert = await this.alertCtrl.create({
      header: 'Please SET your password',
      inputs: [
        {
          name: 'password',
          type: 'password',
          placeholder: 'Password'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: async () => {
            console.log('Cancel');
          }
        }, {
          text: 'Confirm',
          handler: async (pass) => {
            let { password } = pass;
            await this.storage.set('user_pass', password);
            this.ConfirmAIO()
          }
        }
      ]
    });
    await alert.present().then(() => {
      const password: any = document.querySelector('ion-alert input');
      password.focus();
      return;
    });

  }

  public async checkPass() {
    const alert = await this.alertCtrl.create({
      header: 'Please ENTRY your password',
      inputs: [
        {
          name: 'password',
          type: 'password',
          placeholder: 'Password'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: async () => {
            console.log('Cancel');
          }
        }, {
          text: 'Confirm',
          handler: async (pass) => {
            let { password } = pass;
            let res = await this.storage.get('user_pass');
            if (res == password) {
              this.ConfirmAIO()
              this.navCtrl.navigateForward('/home', { animated: true })
            } else this.toastError("Password Error")

          }
        }
      ]
    });
    await alert.present().then(() => {
      const password: any = document.querySelector('ion-alert input');
      password.focus();
      return;
    });
  }

  private async toastError(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 4000,
      color: 'danger',
      animated: true,
      position: 'bottom',
      showCloseButton: true
    });
    toast.present();
  }

  private async ConfirmAIO() {
    const alert = await this.alertCtrl.create({
      header: 'Use ID',
      message: 'Do you want to use Biometric Authentication?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'primary',
          handler: async (c) => {
            console.log('Cancel');
          }
        }, {
          text: 'Yes',
          handler: async (o) => {
            await this.storage.set('biometric', true);
          }
        }
      ]
    });

    await alert.present();
  }

  public async fingerPrintAIO() {
    try {
      const auth = new FingerPrintAuth();
      const data = await auth.available();
      const hasFingerPrintOrFaceAuth = data.has;
      if (hasFingerPrintOrFaceAuth) {
        console.log("MOBILE TYPE -->" + JSON.stringify(data))
        const touch = data["touch"];
        const face = data["face"];
        if (touch) {
          await auth.verifyWithFallback()
            .then(data => {
              console.log("TOUCH-OK: Going to home")
              this.navCtrl.navigateForward('/home', { animated: true })
            })
            .catch(error => {
              console.error(error)
              this.toastError("Biometric Error")
              return false
            });
        }
        if (face) {
          await auth.verifyWithFallback()
            .then(data => {
              console.log("FACE-OK: Going to home")
              this.navCtrl.navigateForward('/home', { animated: true })
            })
            .catch(error => {
              console.error(error)
              this.toastError("Biometric Error")
              return false
            });
        }
      }
    } catch (error) {
      this.toastError("Check Biometric with real Phone")
    }
  }
}
