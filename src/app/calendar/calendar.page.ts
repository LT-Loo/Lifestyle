import { Component, Inject, OnInit, ViewChild, LOCALE_ID } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar';
import { AlertController, ModalController } from '@ionic/angular';

import { StorageService } from '../storage.service';
import { EventPage } from '../event/event.page';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {

  eventSource = []; // Event displayed in calendar
  viewTitle: string;

  calendar = {
    mode: 'month',
    currentDate: new Date(),
  };

  @ViewChild(CalendarComponent) myCal: CalendarComponent;

  // Localise the calendar in local language
  constructor(
    private modalController:ModalController,
    private alertController:AlertController,
    private storageServe: StorageService,
    @Inject(LOCALE_ID) private locale: string) { }

  async ngOnInit() { // Access storage for events
    this.eventSource = await this.storageServe.accessStorage("events");
  }

  next() {this.myCal.slideNext();} //Next calendar slide

  back() {this.myCal.slidePrev();} //Previous calendar slide

  onViewTitleChanged(title) {this.viewTitle = title;} //Change view title

  //Show event's details when calendar event is clicked
  async onEventSelected(event) {
    let start = formatDate(event.startTime, 'dd MMM YYYY', this.locale);
    let end = formatDate(event.endTime, 'dd MMM YYYY', this.locale);
    let dateInfo: string;

    // Determine information to show when event is clicked
    if (event.allDay) {
      if (start == end) {dateInfo = 'Date: ' + start;}
      else {dateInfo = 'From: ' + start + '<br>To: ' + end;}
    }
    else {
      let startT = formatDate(event.start, 'hh:mm a', this.locale);
      let endT = formatDate(event.end, 'hh:mm a', this.locale);
      dateInfo = 'Date: ' + start + '<br>From: ' + startT + "  To: " + endT;
    }

    // Show information when event is clicked
    const alert = await this.alertController.create({
      header: event.title,
      subHeader: event.desc,
      message: dateInfo,
      buttons: [{
        text: 'DELETE', // Delete event
        handler: () => {
          let i = this.eventSource.indexOf(event);
          this.eventSource.splice(i, 1);
          this.myCal.loadEvents();
          this.storageServe.saveData("events", this.eventSource);
        }
      }, 'OK'],
    });
    alert.present();
  }

  // Modal page to add event to calendar
  async addEvent() {
    const modal = await this.modalController.create({
      component: EventPage,
      backdropDismiss: false
    });

    await modal.present();

    modal.onDidDismiss().then((result) => {
      if (result.data && result.data.event) {
        let event = result.data.event; 
        if (event.allDay) { // If event is all day long
          let start = event.startTime;
          event.startTime = new Date(start);
          let end = event.endTime;
          event.endTime = new Date(end);
        }
        else { // If event isn't all day long, combine both date and time into one data
          let startY = new Date(event.startTime).getFullYear();
          let startM = new Date(event.startTime).getMonth() + 1;
          let startD = new Date(event.startTime).getDate();
          let startH = new Date(event.start).getHours();
          let startMin = new Date(event.start).getMinutes();
          let start = startY + ' ' + startM + ' ' + startD + ' ' + startH + ':' + startMin;
          event.startTime = new Date(start); // Start time

          let endY = new Date(event.endTime).getFullYear();
          let endM = new Date(event.endTime).getMonth() + 1;
          let endD = new Date(event.endTime).getDate();
          let endH = new Date(event.end).getHours();
          let endMin = new Date(event.end).getMinutes();
          let end = endY + ' ' + endM + ' ' + endD + ' ' + endH + ':' + endMin;
          event.endTime = new Date(end); // End time
        }

        this.eventSource.push(result.data.event);
        this.myCal.loadEvents();
        this.storageServe.saveData("events", this.eventSource); // Update events in storage
      }
    });
  }

}
