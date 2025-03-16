import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { StorageService } from '../storage.service';
import { NewDiaryPage } from '../new-diary/new-diary.page';
import { ShowDiaryPage } from '../show-diary/show-diary.page';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.page.html',
  styleUrls: ['./diary.page.scss'],
})
export class DiaryPage implements OnInit {

  constructor(private modalController: ModalController, 
    private storageServe: StorageService) { }

  showDiaries = []; // Diary array

  async ngOnInit() { // Access storage for dairies
    this.showDiaries = await this.storageServe.accessStorage("diaries");
  }

  // Modal page to write and save a new diary
  async writeDiary() {
    const modal = await this.modalController.create({
      component: NewDiaryPage,
      componentProps: {
        month: new Date().getMonth(),
        date: new Date().toISOString(),
        mood: 0,
        diary: "",
        place: "",
        lat: null,
        long: null,
        img: null
      }
    });

    modal.onDidDismiss().then((results) => {
      let newDiary = {
        month: results.data.month,
        date: results.data.date,
        mood: results.data.mood,
        diary: results.data.diary,
        place: results.data.place,
        lat: results.data.lat,
        long: results.data.long,
        img: results.data.img
      }
      this.showDiaries.push(newDiary);
      this.storageServe.saveData("diaries", this.showDiaries); // Update storage
    });

    return modal.present();
  }

  // Modal page to show and edit diary
  async showDiary(i) {
    const modal = await this.modalController.create({
      component: ShowDiaryPage,
      componentProps: {
        month: this.showDiaries[i].month,
        date: this.showDiaries[i].date,
        mood: this.showDiaries[i].mood,
        diary: this.showDiaries[i].diary,
        place: this.showDiaries[i].place,
        lat: this.showDiaries[i].lat,
        long: this.showDiaries[i].long,
        img: this.showDiaries[i].img
      }
    });

    modal.onDidDismiss().then((results) => {
      // Delete diary
      if (results.data.delete) { this.showDiaries.splice(i, 1);}
      //Save edited diary
      else {this.showDiaries[i].diary = results.data.diary;}
      //Update storage
      this.storageServe.saveData("diaries", this.showDiaries);
    });

    return modal.present();
  }

}
