import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

import { DIARIES } from './diary/diaries';
import { GOALS } from './goal/goal-lists';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { }

  // Generate and intitalize storage if necesssary
  async createStorage() {
    await this.storage.create();
    //await this.storage.clear();
    if (await this.storage.get("diaries") == null) {
      await this.storage.set("diaries", DIARIES);
    }
    if (await this.storage.get("goals") == null) {
      await this.storage.set("goals", GOALS);
    }
    if (await this.storage.get("achieved") == null) {
      await this.storage.set("achieved", []);
    }
    if (await this.storage.get("events") == null) {
      await this.storage.set("events", []);
    }
  }

  // Access storage
  async accessStorage(label: string) {
    return await this.storage.get(label);
  }

  // Update storage by saving new/edited data
  async saveData(label: string, data: any) {
    await this.storage.set(label, data);
  }

}
