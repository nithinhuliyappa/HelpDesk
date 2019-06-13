import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { USER_COLUMNS } from './column.config';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  items: Observable<any[]>;

  constructor(private user: UserService) { }

  ngOnInit() {
    this.items = this.user.getUsers();
  }

  get columns() {
    return USER_COLUMNS;
  }

}
