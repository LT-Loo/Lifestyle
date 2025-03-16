import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-goal',
  templateUrl: './add-goal.page.html',
  styleUrls: ['./add-goal.page.scss'],
})
export class AddGoalPage implements OnInit {

  constructor(private modalController: ModalController) { }

  goal: string = '';
  desc: string = '';
  deadline: string = '';

  ngOnInit() { }

  // Save new goal and close Add Goal Page
  saveNewGoal() {
    this.modalController.dismiss({
      goal: this.goal,
      desc: this.desc,
      deadline: this.deadline
    })
  }

  // Close Add Goal Page withou saving anything
  closeNewGoal() {
    this.modalController.dismiss();
  }

}
