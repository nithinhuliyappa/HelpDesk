import { Component, OnInit } from '@angular/core';
import { Menu, menuList } from './menu-list';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  get menuList(): Menu[] {
    return menuList;
  }

}
