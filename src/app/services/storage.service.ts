import { Injectable } from '@angular/core';
import 'capacitor-secure-storage-plugin';
import { Plugins } from '@capacitor/core';
const { SecureStoragePlugin } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public async set(key, value) {
    return await SecureStoragePlugin.set({ key, value })
    .then(value => {
      return true
    })
    .catch(error => {
      return false
    });
  }

  public async get(key) {
    return await SecureStoragePlugin.get({ key })
      .then(data => {
        if (data.value.includes("ée")) return false
        else return data.value
      })
      .catch(error => {
        return error
      });
  }

  public async remove(key) {
    return await SecureStoragePlugin.remove({ key })
    .then(value => {
      return true
    })
    .catch(error => {
      return false
    });
  }
}
