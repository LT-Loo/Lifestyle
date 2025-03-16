import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalendarPageRoutingModule } from './calendar-routing.module';

import { CalendarPage } from './calendar.page';
import { NgCalendarModule } from 'ionic2-calendar';
import { EventPageModule } from '../event/event.module';

import { registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en-AU';
registerLocaleData(localeEn);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarPageRoutingModule,
    NgCalendarModule,
    EventPageModule
  ],
  declarations: [CalendarPage],
  providers: [{provide: LOCALE_ID, useValue:'en-AU'}]
})
export class CalendarPageModule {}
