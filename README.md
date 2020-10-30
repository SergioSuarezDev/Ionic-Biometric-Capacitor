# Biometric login
<img src="https://www.airpair.com/img/software/ionic.png" width="200">


Small Ionic framework app using Capacitor & Ionic Plugin
<https://ionicframework.com> 

Working properly with **Android & iOS phones**. (tested with emulator)

<img src="demo/demo.gif" data-canonical-src="demo/demo.gif" width="200"/>

### Plugins usage:

* **Storage:** Integrated with Capacitor
*  **Biometric Login:** <https://github.com/NiklasMerz/cordova-plugin-fingerprint-aio>

### Plugin Fingerprint-aio requires you to add  to your Info.plist to work
```
<key>NSFaceIDUsageDescription</key>
<string>$FACEID_USAGE_DESCRIPTION</string>
``` 
 
 
#### If you have any problem with Android version change these lines in BiometricActivity.java

```
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.ContextCompat;
```

### Getting Started

To get started, clone this repo, and run: ```npm install``` in the root directory.

### Test with emulator

`ionic cap run ios/android
`
### Secure Storage
If you want to use a **Secure Storage for password** install this plugin:
<https://github.com/martinkasa/capacitor-secure-storage-plugin>

### Updates 

* 1.1.3 - Updated dependencies
* 1.1.2 - Updated README with Android import fixes
* 1.1.1 - Changed fingerprint plugin to Finterprint AIO
* 1.1.0 - Updated Ionic to v5 and Angular to v9
* 1.0.1 - Fix an error on iOS
* 1.0.0 - Initial project

### Credits
Sergio Suárez - <https://www.sergiosuarezdev.com>
