import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,
              private auth: AuthService,
              private toastr: ToastrService) { }

  form: FormGroup;
  loginFailure = new BehaviorSubject(false);

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  login() {
    const email = this.form.get('email').value;
    const password = this.form.get('password').value;
    const callback = () => this.router.navigate(['/home']);
    const errorCallback = () => {
      this.form.reset();
      this.toastr.error('Invalid email/password', 'error');
    };
    this.auth.login(email, password, callback, errorCallback);
  }

  register() {
    this.router.navigate(['/register-user']);
  }

}
