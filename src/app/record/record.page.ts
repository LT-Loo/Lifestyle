import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StorageService } from '../storage.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-record',
  templateUrl: './record.page.html',
  styleUrls: ['./record.page.scss'],
})
export class RecordPage implements OnInit {

  @ViewChild('goalChart', {static: true}) canvas;
  chart: any;

  constructor(private modalController: ModalController,
    private storageServe: StorageService,) { }

  goalRecord = []; // List of completed goals
  unfinished = [];

  // Get list from Goal Page
  async ngOnInit() {
    // Access storage for completed and uncompleted goal lists
    this.goalRecord = await this.storageServe.accessStorage("achieved");
    this.unfinished = await this.storageServe.accessStorage("goals");

    // Create and display chart
    this.chart = new Chart(this.canvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Completed', 'Uncompleted'],
        datasets: [{
          label: "My Goal Chart",
          data: [this.goalRecord.length, this.unfinished.length],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)'
          ],
          hoverOffset: 7,
          hoverBorderWidth: 2,
          borderWidth: 0,
          cutout: 40
        }]
      },
      options: {
        layout: {padding: {top: 12}},
        plugins: {
          legend: {
            position: 'bottom',
            labels: {padding: 7}
          }
        }
      }
    });
  }

  // Close Record Page without passing anything back
  backToGoal() {
    this.modalController.dismiss();
  }

}
