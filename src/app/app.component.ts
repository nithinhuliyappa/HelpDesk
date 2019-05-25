import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  constructor(private router: Router) { }

  showHeader() {
    if (this.router.url === '/login' ||
        this.router.url === '/register-user') {
      return false;
    } else {
      return true;
    }
  }
}
