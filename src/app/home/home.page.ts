import { Component } from '@angular/core';
import { MOTTOS } from './motto-lists';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() {}

  motto = MOTTOS[Math.floor(Math.random() * MOTTOS.length)].motto;

}
