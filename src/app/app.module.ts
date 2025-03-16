import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { EventPageModule } from './event/event.module';
import { NewDiaryPageModule } from './new-diary/new-diary.module';
import { ShowDiaryPageModule } from './show-diary/show-diary.module';
import { EditGoalPageModule } from './edit-goal/edit-goal.module';
import { AddGoalPageModule } from './add-goal/add-goal.module';
import { RecordPageModule } from './record/record.module';
import { MappingPageModule } from './mapping/mapping.module';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        EventPageModule,
        NewDiaryPageModule,
        ShowDiaryPageModule,
        EditGoalPageModule,
        AddGoalPageModule,
        RecordPageModule,
        MappingPageModule,
        IonicStorageModule.forRoot()
    ],
    providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
    bootstrap: [AppComponent]
})
export class AppModule {}
