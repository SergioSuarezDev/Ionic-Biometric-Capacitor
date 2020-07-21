import { Component, OnInit } from '@angular/core';
import { AlertsService } from '../../services/alerts.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  constructor(
    private alerts: AlertsService,
    private storage: StorageService

  ) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.unLock()
  }

  async unLock() {
    let Password = await this.storage.get('user_pass');
    let Biometric = await this.storage.get('biometric');

    if (Password) {
      if (Biometric) {
        this.alerts.fingerPrintAIO()
      } else {
        this.alerts.checkPass()
      }
    } else this.alerts.setPass()
  }

  async removeData() {
    await this.storage.remove('user_pass');
    await this.storage.remove('biometric');
    this.alerts.toastInfo("Data Removed!")
  }

}
