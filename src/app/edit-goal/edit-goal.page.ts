import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit-goal',
  templateUrl: './edit-goal.page.html',
  styleUrls: ['./edit-goal.page.scss'],
})
export class EditGoalPage implements OnInit {

  constructor(private navParams: NavParams,
    private modalController: ModalController) { }

  // Goal's details
  goal: string = '';
  desc: string = '';
  deadline: string = '';

  //For EDIT/SAVE button
  edit: boolean = true;
  editButton: string = 'EDIT';

  // Get data from Goal Page
  ngOnInit() {
    this.goal = this.navParams.get('goal');
    this.desc = this.navParams.get('desc');
    this.deadline = this.navParams.get('deadline');
  }

  // Save edited goal and close Edit Goal Page
  closeEditGoal() {
    if (this.editButton == "EDIT") {
      this.modalController.dismiss({
      goal: this.goal,
      desc: this.desc,
      deadline: this.deadline
      });
    }
    else {this.modalController.dismiss();}
  }

  // Enable edit function if EDIT button is clicked OR
  // Save edited goal and disable edit function
  editGoal() {
    if (this.edit) {
      this.edit = false;
      this.editButton = "SAVE";
    }
    else {
      this.edit = true;
      this.editButton = "EDIT";
    }
  }

}
