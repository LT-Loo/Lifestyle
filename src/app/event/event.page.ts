import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {

  calendar = {
    mode: 'month',
    currentDate: new Date()
  };
  viewTitle: string;

  event = {
    title: '',
    desc: '',
    startTime: null,
    start: '',
    end: '',
    endTime: '', 
    allDay: true,
    reminder: true
  };

  allday = true;

  ngOnInit() {}

  // If allDay true, enable time selection. Otherwise, disabled.
  selectTime() {
    if (!this.event.allDay) {this.allday = true;}
    else {
      this.allday = false;
      this.event.start = '';
      this.event.end = '';
    }
  }

  constructor(private modalController: ModalController) { }

  // Save event and close Event Page
  saveEvent() {this.modalController.dismiss({event: this.event})}

  // Close Event Page without creating any event
  closeEvent() {this.modalController.dismiss();}

}
