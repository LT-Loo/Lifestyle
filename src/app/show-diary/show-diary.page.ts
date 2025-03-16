import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

import { MappingPage } from '../mapping/mapping.page';

@Component({
  selector: 'app-show-diary',
  templateUrl: './show-diary.page.html',
  styleUrls: ['./show-diary.page.scss'],
})
export class ShowDiaryPage implements OnInit {

  constructor(private navParams: NavParams,
    private modalController: ModalController) { }

  month: number = null;
  date: string = '';
  mood: number = null;
  diary: string = '';
  place: string = '';
  lat: number = null;
  long: number = null;
  img = [];

  // For EDIT/SAVE button
  edit: boolean = true;
  editButton: string = 'EDIT';

  ngOnInit() {
    // Get data from Diary Page
    this.month = this.navParams.get('month');
    this.date = this.navParams.get('date');
    this.mood = this.navParams.get('mood');
    this.diary = this.navParams.get('diary');
    this.place = this.navParams.get('place');
    this.lat = this.navParams.get('lat');
    this.long = this.navParams.get('long');
    this.img = this.navParams.get('img');

    if (this.place == "") {this.place = "No place.";}

    // Display images
    let preview = document.getElementById("preview");
    for (let i = 0; i < this.img.length; i++) {
      let listItem = document.createElement("li");
      listItem.innerHTML = "<img src = '" + this.img[i] + "' />";
      preview.append(listItem);
    }
  }

  // Save edited diary and close Show Diary Page
  saveEditedDiary() {
    if (this.editButton == "EDIT") {
      this.modalController.dismiss({diary: this.diary});
    }
    else {this.modalController.dismiss();} 
  }

  // Delete diary
  deleteDiary() {
    if (confirm("Delete this diary?")) {
      this.modalController.dismiss({delete: true});
    }
  }

  // Enable edit function if EDIT button is clicked OR
  // Save edit diary and disable edit function
  editDiary() {
    if (this.edit) {
      this.edit = false;
      this.editButton = "SAVE";
    }
    else {
      this.edit = true;
      this.editButton = "EDIT";
    }
  }

  // Open map to show location saved in this diary
  async openMap() {
    const modal = await this.modalController.create({
      component: MappingPage,
      componentProps: {place: this.place, lat: this.lat, long: this.long}
    });

    modal.onDidDismiss().then((results) => {
      this.place = results.data.place;
      this.lat = results.data.lat;
      this.long = results.data.long;
    });
    
    return modal.present();
  }

}
