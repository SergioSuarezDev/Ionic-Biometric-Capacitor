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
          handler: async () => {}
        }, {
          text: 'Confirm',
          handler: async (pass) => {
            let { password } = pass;
            await this.storage.set('user_pass', password);
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
          handler: async () => {}
        }, {
          text: 'Confirm',
          handler: async (pass) => {
            let { password } = pass;
            let res = await this.storage.get('user_pass');
            if (res == password) {
              //Test if this phone have Biometric Hardware
              let auth, data;
              try {
                auth = new FingerPrintAuth();
                data = await auth.available();
                this.ConfirmAIO()
              } catch (error) {}
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
          handler: async (c) => {}
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
      let auth, data, hasFingerPrintOrFaceAuth;

      try {
        auth = new FingerPrintAuth();
        data = await auth.available();
        hasFingerPrintOrFaceAuth = data.has;
      } catch (error) {
        this.toastError("This phone do not have biometric hardware or you are using web navigator.")
        return false;
      }

      if (hasFingerPrintOrFaceAuth) {
        const touch = data["touch"];
        const face = data["face"];
        if (touch) {
          await auth.verifyWithFallback()
            .then(data => {
              this.navCtrl.navigateForward('/home', { animated: true })
            })
            .catch(error => {
              this.toastError("Biometric Error")
              return false
            });
        }
        if (face) {
          await auth.verifyWithFallback()
            .then(data => {
              this.navCtrl.navigateForward('/home', { animated: true })
            })
            .catch(error => {
              this.toastError("Biometric Error")
              return false
            });
        }
      }
    } catch (error) {
      this.toastError("This phone do not have biometric hardware or you are using web navigator.")
      return false;
    }
  }
}
