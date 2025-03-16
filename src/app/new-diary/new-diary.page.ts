import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

import { MappingPage } from '../mapping/mapping.page';

@Component({
  selector: 'app-new-diary',
  templateUrl: './new-diary.page.html',
  styleUrls: ['./new-diary.page.scss'],
})
export class NewDiaryPage implements OnInit {

  constructor(private navParams: NavParams,
    private modalController: ModalController) { }

  month: number = null;
  date: string = '';
  mood: number = null;
  diary: string = '';
  place: string;
  lat: number;
  long: number;
  img: any[];

  ngOnInit() { }

  // Save new diary by passing data back to Diary Page
  saveNewDiary() {
    this.modalController.dismiss({
      month: this.month,
      date: this.date,
      mood: this.mood,
      diary: this.diary,
      place: this.place,
      lat: this.lat,
      long: this.long,
      img: this.img
    });
  }
  
  // Close new diary without saving and passing anything
  closeNewDiary() {this.modalController.dismiss();}

  // Show map page to select location
  async showMap() {
    const modal = await this.modalController.create({
      component: MappingPage,
      componentProps: {place: "", lat: null, long: null}
    });
    
    modal.onDidDismiss().then((results) => {
      this.lat = results.data.lat;
      this.long = results.data.long;
    });

    return modal.present();
  }

  // Select, display and save images
  imageSelected(files) {
    let preview = document.getElementById("preview");
    let image = [];

    for (let i = 0; i < files.length; i++) {
      let reader = new FileReader();
      reader.onload = function(readerEvent) {
        let listItem = document.createElement("li");
        listItem.innerHTML = "<img src = '" + readerEvent.target.result + "' />";
        preview.append(listItem);
        image.push(readerEvent.target.result);
      }
      
      this.img = image;
      reader.readAsDataURL(files[i]);
    }
  }

  // Remove all selected images
  clearImages() {
    document.getElementById("preview").innerHTML = "";
    this.img = null;
  }

}
