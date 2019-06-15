import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,
              private auth: AuthService) { }

  ngOnInit() {}

  login() {
    const callback = () => this.router.navigate(['/home']);
    this.auth.login('admin_john@gmail.com', 'admin@1234', callback);
  }

  register() {
    this.router.navigate(['/register-user']);
  }

}
