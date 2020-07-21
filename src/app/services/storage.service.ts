import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})


export class StorageService {

  constructor() { }

  public async set(key, value) {
    return await Storage.set({ key, value })
      .then(value => {
        return true
      })
      .catch(error => {
        return false
      });
  }

  public async get(key) {
    return await Storage.get({ key })
      .then(data => {
        return JSON.parse(data.value)
      })
      .catch(error => {
        return error
      });
  }

  public async remove(key) {
    return await Storage.remove({ key })
      .then(value => {
        return true
      })
      .catch(error => {
        return false
      });
  }
}
