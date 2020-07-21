import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Plugins, StatusBarStyle } from '@capacitor/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})


export class AppComponent {
  constructor(
    public navCtrl: NavController
  ) {
    this.initializeApp();
  }


  async initializeApp() {
    const { SplashScreen, StatusBar } = Plugins;

    try {
      await SplashScreen.hide()
      await StatusBar.setStyle({ style: StatusBarStyle.Light })
    } catch (err) { }
  }

  async ngOnInit() {
    this.navCtrl.navigateForward('/login', { animated: true })
  }



}
