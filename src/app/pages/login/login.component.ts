import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,
              private user: UserService) { }

  ngOnInit() {}

  login() {
    const callback = () => this.router.navigate(['/home']);
    this.user.login('sophiedunlap@quintity.com', '123456', callback);
  }

  register() {
    this.router.navigate(['/register-user']);
  }

}
