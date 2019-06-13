import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,
              private auth: AuthService) { }

              form: FormGroup;
  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });
  }

  login() {
    const email = this.form.get('email').value;
    const password = this.form.get('password').value;
    const callback = () => this.router.navigate(['/home']);
    this.auth.login(email, password, callback);
  }

  register() {
    this.router.navigate(['/register-user']);
  }

}
