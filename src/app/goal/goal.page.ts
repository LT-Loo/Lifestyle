import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { StorageService } from '../storage.service';
import { GoalRecord } from './goal-struct';

import { EditGoalPage } from '../edit-goal/edit-goal.page';
import { AddGoalPage } from '../add-goal/add-goal.page';
import { RecordPage } from '../record/record.page';

@Component({
  selector: 'app-goal',
  templateUrl: './goal.page.html',
  styleUrls: ['./goal.page.scss'],
})
export class GoalPage implements OnInit {

  goals = [];

  /*goal: string;
  desc: string;
  deadline: string;*/

  goalRecord: GoalRecord [] = []; // Store accomplished goals

  constructor(private modalController: ModalController,
    private storageServe: StorageService) { }

  // Get goals from storage and sort them according to deadline in ascending order
  async ngOnInit() {
    this.goals = await this.storageServe.accessStorage("goals");
    this.goals = this.goals.sort((a, b) => {
      if (new Date(b.deadline) < new Date(a.deadline)) return 1;
      if (new Date(b.deadline) > new Date(a.deadline)) return -1;
      return 0;
    });
  }

  // Modal page to add new goal
  async addGoal() {
    const modal = await this.modalController.create({
      component: AddGoalPage,
    });

    modal.onDidDismiss().then((results) => {
      /*this.goal = results.data.goal;
      this.desc = results.data.desc;
      this.deadline = results.data.deadline;*/
      let newGoal = {
        goal: results.data.goal,
        desc: results.data.desc,
        deadline: results.data.deadline
      }
      this.goals.push(newGoal); // Add new goal into goal list and sort them in order
      this.goals = this.goals.sort((a, b) => {
        if (new Date(b.deadline) < new Date(a.deadline)) return 1;
        if (new Date(b.deadline) > new Date(a.deadline)) return -1;
        return 0;
      });
      this.storageServe.saveData("goals", this.goals); // Update storage
    });

    return modal.present();
  }

  // Modal goal to edit and show selected goal
  async showGoal(i) {
    const modal = await this.modalController.create({
      component: EditGoalPage,
      componentProps: {
        goal: this.goals[i].goal,
        desc: this.goals[i].desc,
        deadline: this.goals[i].deadline
      }
    });

    modal.onDidDismiss().then((results) => {
     /* this.goal = results.data.goal;
      this.desc = results.data.desc;
      this.deadline = results.data.deadline;*/
      let editedGoal = {
        goal: results.data.goal,
        desc: results.data.desc,
        deadline: results.data.deadline
      }
      this.goals[i] = editedGoal; // Update goal list with edited goal
      this.storageServe.saveData("goals", this.goals); // Update goals in storage
    });

    return modal.present();
  }

  // Modal page to show accomplished goals' list
  async goalHistory() {
    const modal = await this.modalController.create({
      component: RecordPage,
      componentProps: {record: this.goalRecord}
    });

    modal.onDidDismiss();

    return modal.present();
  }

  // Delete goal
  deleteGoal(i) {
    if (confirm("Delete this goal?")) {
      this.goals.splice(i, 1);
      this.storageServe.saveData("goals", this.goals); // Update goal list in storage
    }
  }

  // Add completed goal to goalRecord and delete goal
  goalDone(i) {
    let doneDate = new Date();
    let message: string;
    
    // Determine message shown when goal is completed depends on date
    if (doneDate > new Date(this.goals[i].deadline)) {
      message = "Congratulations! You've accomplished your goal!\nTry to complete your goal before the deadline next time!";}
    else {message = "Congratulations! You've accomplished your goal before the deadline!\nKeep it up!";}
 
    // Show message and ask for confirmation
    if(confirm(message)) {
      let doneGoal = {
        goal: this.goals[i].goal,
        desc: this.goals[i].desc,
        finishDate: doneDate.toISOString()
      }
      this.goalRecord.push(doneGoal);
      this.goals.splice(i, 1);
      this.storageServe.saveData("achieved", this.goalRecord); // Update achieved goals in storage
      this.storageServe.saveData("goals", this.goals); // Update goal list in storage
    }
  }
    
}
