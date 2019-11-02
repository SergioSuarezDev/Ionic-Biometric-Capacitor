import { Component } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { Plugins, StatusBarStyle } from '@capacitor/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    public navCtrl: NavController
  ) {
    this.initializeApp();
  }


  async initializeApp() {
    const { SplashScreen, StatusBar } = Plugins;

    try {
      await SplashScreen.hide()
      await StatusBar.setStyle({ style: StatusBarStyle.Light })
    } catch (err) {
      console.log('This is normal in a browser', err);
    }
  }

  async ngOnInit() {
    this.navCtrl.navigateForward('/login', { animated: true })
  }



}
