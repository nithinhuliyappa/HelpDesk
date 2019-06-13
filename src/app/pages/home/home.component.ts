import { Component, OnInit } from '@angular/core';
import { Menu, menuList } from './menu-list';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private user: UserService) { }

  ngOnInit() {}

  get menuList(): Menu[] {
    return menuList.filter(item => {
      if (item.role === 'all') {
        return true;
      } else if (item.role === this.user.userProfile.role) {
        return true;
      } else {
        return false;
      }
    });
  }

}
